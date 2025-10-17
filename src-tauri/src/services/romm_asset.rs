use reqwest::StatusCode;
use tauri::AppHandle;

use crate::{enums::error::Error, romm::romm_http::RommHttp};

pub struct RommAsset {}

impl RommAsset {
    pub async fn get_asset(app_handle: &AppHandle, url: String) -> Result<Vec<u8>, Error> {
        let response = RommHttp::get(app_handle, url.as_str())?.send().await?;

        match response.status() {
            StatusCode::OK => Ok(response.bytes().await?.to_vec()),
            StatusCode::UNAUTHORIZED => Err(Error::InvalidCredentials()),
            StatusCode::NOT_FOUND => Err(Error::NotFound("Asset URL not found.".to_string())),
            StatusCode::INTERNAL_SERVER_ERROR => Err(Error::InternalServer(response.text().await?)),
            _ => Err(Error::InternalServer("Could not fetch asset.".to_string())),
        }
    }
}
