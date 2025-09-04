use tauri::AppHandle;
use tauri_plugin_http::reqwest;

use crate::{store::get_store_value, enums::error::Error};

pub fn getRommRequest(app_handle: AppHandle, method: reqwest::Method) -> Result<(), Error> {
    let romm_url = get_store_value(app_handle, "romm_url")
        ?.unwrap_or(
            Err("Romm URL is not set.".to_string())?
        );
    let romm_session = get_store_value(app_handle, "romm_session")?;
    let client = reqwest::Client::builder()
        .build()?;

    let request = client.request(method, format!("{}", romm_url));

    if let Some(romm_token) = romm_session {
        request.header("Authorization", romm_token.to_string());
    }

    request
}
