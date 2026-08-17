use axum::{
    body::Bytes,
    extract::{Path, State},
    http::{header, HeaderMap, Method, StatusCode},
    response::IntoResponse,
};

use std::sync::Arc;
use tokio::sync::RwLock;
use url::Url;

#[derive(Clone)]
pub struct ProxyAppState {
    pub target: Arc<RwLock<String>>,
    pub client: reqwest::Client,
}

#[derive(serde::Deserialize)]
pub struct SetTarget {
    target: String,
}

pub async fn set_target(
    State(state): State<ProxyAppState>,
    axum::Json(body): axum::Json<SetTarget>,
) -> impl IntoResponse {
    if !(body.target.starts_with("http://") || body.target.starts_with("https://")) {
        return (StatusCode::BAD_REQUEST, "invalid target");
    }
    *state.target.write().await = body.target.trim_end_matches('/').to_string();
    (StatusCode::OK, "ok")
}

pub async fn get_target(State(state): State<ProxyAppState>) -> impl IntoResponse {
    (StatusCode::OK, state.target.read().await.clone())
}

pub async fn proxy(
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
