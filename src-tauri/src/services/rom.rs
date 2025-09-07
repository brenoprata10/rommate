use tauri::AppHandle;

use crate::{enums::error::Error, models::rom::Rom, romm::romm_http::RommHttp};

pub async fn get_roms(app_handle: &AppHandle) -> Result<Vec<Rom>, Error> {
    let response = RommHttp::get(app_handle, "/api/roms")?.send().await?;

    let roms = response.json::<Vec<Rom>>().await?;

    Ok(roms)
}
