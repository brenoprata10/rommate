use serde::{Deserialize, Serialize};
use tauri::AppHandle;

use crate::{enums::error::Error, models::rom::Rom, romm::romm_http::RommHttp};

#[derive(Serialize, Deserialize)]
pub struct RomPayload {
    items: Vec<Rom>,
}

pub async fn get_roms(app_handle: &AppHandle) -> Result<RomPayload, Error> {
    let response = RommHttp::get(app_handle, "/api/roms")?.send().await?;

    let roms = response.json::<RomPayload>().await?;

    Ok(roms)
}

pub async fn get_recently_played(app_handle: &AppHandle) -> Result<RomPayload, Error> {
    let response = RommHttp::get(
        app_handle,
        "/api/roms?order_by=last_played&order_dir=desc&limit=15&with_char_index=false",
    )?
    .send()
    .await?;

    let roms = response.json::<RomPayload>().await?;

    Ok(roms)
}

pub async fn get_recently_added(app_handle: &AppHandle) -> Result<RomPayload, Error> {
    let response = RommHttp::get(
        app_handle,
        "/api/roms?order_by=last_played&order_dir=desc&limit=15&with_char_index=false",
    )?
    .send()
    .await?;

    let roms = response.json::<RomPayload>().await?;

    Ok(roms)
}
