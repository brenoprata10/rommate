use tauri::AppHandle;
use tauri_plugin_http::reqwest::{self, RequestBuilder};

use crate::{store::get_store_value, enums::error::Error};

pub fn get_romm_request(app_handle: &AppHandle, url: &str, method: reqwest::Method) -> Result<RequestBuilder, Error> {
    let romm_url = get_store_value(app_handle, "romm_url")
        .unwrap_or_else(|_| None)
        .ok_or(Error::RommUrlNotSet())?;
    let romm_session = get_store_value(app_handle, "romm_session")?;
    let client = reqwest::Client::builder()
        .build()?;

    let mut request = client.request(method, format!("{}{}", romm_url, url));

    if let Some(romm_token) = romm_session {
        request = request.header("Authorization", format!("Basic {}", romm_token.to_string()));
    }

    Ok(request)
}
