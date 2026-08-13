use axum::{
    body::Bytes,
    extract::{Path, State},
    http::{header, HeaderMap, Method, StatusCode},
    response::IntoResponse,
    routing::{any, post},
    Router,
};

use url::Url;

use std::collections::HashMap;
use std::sync::Mutex;

use commands::asset::command_get_asset;
use commands::collection::command_get_collections;
use commands::downloader::{command_cancel_download, command_download_rom};
use commands::file::{command_is_file_downloaded, command_open_download_directory};
use commands::login::login;
use commands::platform::command_get_platforms;
use commands::process::command_restart_app;
use commands::retroarch::command_play_retroarch_game;
use commands::rom::{
    command_get_recently_added, command_get_recently_played, command_get_rom_by_id,
    command_get_roms, command_get_roms_by_collection_id, command_get_roms_by_platform_id,
};
use commands::rom_save::{
    command_check_save_sync, command_download_most_recent_save_file, command_upload_local_save_file,
};
use commands::stat::command_get_stats;
use commands::suggestion_section::command_get_sections;
use commands::user::{command_get_logged_in_user, command_get_users};
use std::sync::Arc;
use tokio::sync::RwLock;
use tokio_util::sync::CancellationToken;

mod commands;
mod dtos;
mod enums;
mod models;
mod romm;
mod services;
mod store;

#[derive(Clone)]
pub struct ProxyAppState {
    pub target: Arc<RwLock<String>>,
    pub client: reqwest::Client,
}

pub struct AppState {
    pub downloads: HashMap<String, CancellationToken>,
}

#[derive(serde::Deserialize)]
struct SetTarget {
    target: String,
}

async fn set_target(
    State(state): State<ProxyAppState>,
    axum::Json(body): axum::Json<SetTarget>,
) -> impl IntoResponse {
    if !(body.target.starts_with("http://") || body.target.starts_with("https://")) {
        return (StatusCode::BAD_REQUEST, "invalid target");
    }
    *state.target.write().await = body.target.trim_end_matches('/').to_string();
    (StatusCode::OK, "ok")
}

async fn proxy(
    State(state): State<ProxyAppState>,
    method: Method,
    headers: HeaderMap,
    axum::extract::RawQuery(query): axum::extract::RawQuery,
    Path(rest): Path<String>,
    body: Bytes,
) -> impl IntoResponse {
    let base = state.target.read().await.clone();
    let mut url = format!("{}/{}", base.trim_end_matches('/'), rest);
    if let Some(q) = query {
        url.push('?');
        url.push_str(&q);
    }

    // Optional tiny log
    println!("→ {} {}", method, url);

    // Rewrite Origin/Referer to upstream (avoids CSRF 403s on many backends)
    let base_u = Url::parse(&base).ok();
    let upstream_origin = base_u.as_ref().map(|u| {
        let mut o = format!("{}://{}", u.scheme(), u.host_str().unwrap_or_default());
        if let Some(p) = u.port() {
            o.push(':');
            o.push_str(&p.to_string());
        }
        o
    });

    // Build upstream request
    let mut req = state.client.request(method.clone(), &url).body(body);

    // Copy request headers, skipping hop-by-hop and payload-sensitive ones
    for (name, value) in headers.iter() {
        let key = name.as_str().to_ascii_lowercase();
        if [
            "host",
            "connection",
            "keep-alive",
            "proxy-authenticate",
            "proxy-authorization",
            "te",
            "trailer",
            "trailers",
            "transfer-encoding",
            "upgrade",
            "content-length",
            "accept-encoding",
            "expect",
        ]
        .contains(&key.as_str())
        {
            continue;
        }
        if key == "origin" {
            if let Some(o) = &upstream_origin {
                req = req.header("origin", o);
            }
            continue;
        }
        if key == "referer" {
            if let Some(o) = &upstream_origin {
                req = req.header("referer", format!("{}/", o));
            }
            continue;
        }
        req = req.header(name, value);
    }

    let resp = match req.send().await {
        Ok(r) => r,
        Err(e) => return (StatusCode::BAD_GATEWAY, format!("upstream error: {e}")).into_response(),
    };

    let status = resp.status();

    // Build safe response headers (don’t forward length/encoding/hop-by-hop)
    let mut out_headers = HeaderMap::new();
    for (k, v) in resp.headers().iter() {
        let key = k.as_str().to_ascii_lowercase();
        if [
            "content-length",
            "transfer-encoding",
            "content-encoding",
            "connection",
            "keep-alive",
            "proxy-authenticate",
            "proxy-authorization",
            "te",
            "trailer",
            "trailers",
            "upgrade",
        ]
        .contains(&key.as_str())
        {
            continue;
        }
        out_headers.append(k.clone(), v.clone());
    }

    // Optional: if upstream sets Domain in Set-Cookie and you want cookies on localhost,
    // strip Domain=... below. Otherwise, just forward as-is:
    for val in resp.headers().get_all(header::SET_COOKIE).iter() {
        out_headers.append(header::SET_COOKIE, val.clone());
    }

    // Aggregate body; let hyper set the right Content-Length
    let bytes = match resp.bytes().await {
        Ok(b) => b,
        Err(e) => {
            return (StatusCode::BAD_GATEWAY, format!("read body failed: {e}")).into_response()
        }
    };

    (status, out_headers, bytes).into_response()
}
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let proxy_state = ProxyAppState {
        target: Arc::new(RwLock::new("http://home:8081".to_string())),
        client: reqwest::Client::new(),
    };

    tauri::Builder::default()
        .setup(|_app| {
            tauri::async_runtime::spawn(async {
                let proxy_app = Router::new()
                    .route("/set-target", post(set_target))
                    .route("/{*rest}", any(proxy))
                    .with_state(proxy_state);

                let listener = tokio::net::TcpListener::bind("0.0.0.0:5080").await.unwrap();
                let _ = axum::serve(listener, proxy_app).await;
            });
            Ok(())
        })
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_notification::init())
        .manage(Mutex::new(AppState {
            downloads: HashMap::<String, CancellationToken>::new(),
        }))
        .plugin(tauri_plugin_store::Builder::new().build())
        .invoke_handler(tauri::generate_handler![
            login,
            command_get_users,
            command_get_logged_in_user,
            command_get_roms,
            command_get_recently_played,
            command_get_recently_added,
            command_get_platforms,
            command_get_rom_by_id,
            command_get_collections,
            command_get_asset,
            command_get_roms_by_collection_id,
            command_get_roms_by_platform_id,
            command_download_rom,
            command_cancel_download,
            command_is_file_downloaded,
            command_open_download_directory,
            command_restart_app,
            command_play_retroarch_game,
            command_get_stats,
            command_get_sections,
            command_check_save_sync,
            command_download_most_recent_save_file,
            command_upload_local_save_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
