use axum::{
    routing::{any, get, post},
    Router,
};

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

use crate::proxy::{get_target, proxy, set_target, ProxyAppState};

mod commands;
mod dtos;
mod enums;
mod models;
mod proxy;
mod romm;
mod services;
mod store;

pub struct AppState {
    pub downloads: HashMap<String, CancellationToken>,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let proxy_state = ProxyAppState {
        target: Arc::new(RwLock::new("".to_string())),
        client: reqwest::Client::new(),
    };

    tauri::Builder::default()
        .setup(|_app| {
            tauri::async_runtime::spawn(async {
                let proxy_app = Router::new()
                    .route("/api/target", post(set_target))
                    .route("/api/target", get(get_target))
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
