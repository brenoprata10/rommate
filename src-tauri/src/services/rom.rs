use serde::{Deserialize, Serialize};
use tauri::AppHandle;

use crate::{
    enums::error::Error,
    models::{collection::RomCollection, rom::Rom},
    romm::romm_http::RommHttp,
};

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
        "/api/roms?order_by=id&order_dir=desc&limit=25&with_char_index=false",
    )?
    .send()
    .await?;

    let roms = response.json::<RomPayload>().await?;

    Ok(roms)
}

pub async fn get_rom_by_id(app_handle: &AppHandle, id: i32) -> Result<Rom, Error> {
    let response = RommHttp::get(app_handle, &format!("/api/roms/{}", id))?
        .send()
        .await?;

    let rom = response.json::<Rom>().await?;

    Ok(rom)
}

pub async fn get_roms_by_collection_id(
    app_handle: &AppHandle,
    id: String,
    collection_type: RomCollection,
) -> Result<RomPayload, Error> {
    let collection_param = match collection_type {
        RomCollection::Smart => "smart_collection_id",
        RomCollection::Virtual => "virtual_collection_id",
        RomCollection::Default => "collection_id",
    };

    let response = RommHttp::get(
        app_handle,
        &format!("/api/roms?{}={}", collection_param, id),
    )?
    .send()
    .await?;

    let roms = response.json::<RomPayload>().await?;

    Ok(roms)
}
