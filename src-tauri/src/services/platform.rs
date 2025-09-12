use tauri::AppHandle;

use crate::{enums::error::Error, models::platform::Platform, romm::romm_http::RommHttp};

pub async fn get_platforms(app_handle: &AppHandle) -> Result<Vec<Platform>, Error> {
    let response = RommHttp::get(app_handle, "/api/platforms")?.send().await?;

    let platforms = response.json::<Vec<Platform>>().await?;

    Ok(platforms)
}
