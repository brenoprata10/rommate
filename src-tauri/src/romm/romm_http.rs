use tauri::AppHandle;
use tauri_plugin_http::reqwest::{self, RequestBuilder};

use crate::{store::get_store_value, enums::error::Error};

pub fn get_romm_request(app_handle: &AppHandle, url: &str, method: reqwest::Method) -> Result<RequestBuilder, Error> {
    let stored_url = match get_store_value(app_handle, "romm_url") {
        Ok(Some(stored_url)) => Ok(stored_url),
        Ok(None) | Err(_) => Err(Error::RommUrlNotSet())
    }?;
    let romm_url = stored_url.as_str().unwrap();

    let romm_session = get_store_value(app_handle, "romm_session")?;
    let client = reqwest::Client::builder()
        .build()?;

    let mut request = client.request(method, format!("{}{}", romm_url, url));

    request = if let Some(romm_token) = romm_session {
        request.bearer_auth(romm_token.as_str().unwrap())
    } else {
        request
    };

    Ok(request)
}
