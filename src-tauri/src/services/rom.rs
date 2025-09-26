use serde::{Deserialize, Serialize};
use std::fs::create_dir_all;
use tauri::{ipc::Channel, AppHandle};
use tokio::fs::File;

use crate::{
    enums::{download_event::DownloadEvent, error::Error},
    models::{collection::RomCollection, rom::Rom},
    romm::romm_http::RommHttp,
};

use super::downloader::Downloader;

#[derive(Serialize, Deserialize)]
pub struct RomPayload {
    items: Vec<Rom>,
}

pub async fn get_roms(app_handle: &AppHandle) -> Result<RomPayload, Error> {
    let response = RommHttp::get(app_handle, "/api/roms?limit=10000")?
        .send()
        .await?;

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
        &format!("/api/roms?limit=10000&{}={}", collection_param, id),
    )?
    .send()
    .await?;

    let roms = response.json::<RomPayload>().await?;

    Ok(roms)
}

pub async fn get_roms_by_platform_id(
    app_handle: &AppHandle,
    id: String,
) -> Result<RomPayload, Error> {
    let response = RommHttp::get(
        app_handle,
        &format!("/api/roms?limit=10000&platform_id={}", id),
    )?
    .send()
    .await?;

    let roms = response.json::<RomPayload>().await?;

    Ok(roms)
}

pub async fn download_rom(
    app_handle: &AppHandle,
    id: String,
    rom_id: i32,
    on_event: Channel<DownloadEvent>,
) -> Result<(), Error> {
    let rom = get_rom_by_id(app_handle, rom_id).await?;
    let content_length = rom.fs_size_bytes;
    let file_url = format!("/api/roms/{}/content/{}", rom.id, rom.fs_name);
    let home_dir_path = match dirs::home_dir() {
        Some(path) => Ok(path),
        None => Err(Error::InternalServer(
            "Could not retrieve home folder.".to_string(),
        )),
    }?;

    let file_directory = format!(
        "{}/Rommate/Downloads",
        home_dir_path
            .to_str()
            .expect("Failed to parse home dir to string.")
    );
    let file_path = format!("{}/{}", file_directory, rom.fs_name);

    // Create directory path if it does not exist
    create_dir_all(&file_directory)?;
    let mut file = File::create(file_path).await?;

    let response = RommHttp::get(app_handle, &file_url)?.send().await?;

    Downloader::track_progress(id, response, &mut file, content_length, &on_event).await?;

    Ok(())
}
