use tauri::AppHandle;

use crate::{
    enums::error::Error,
    models::{collection::RomCollection, rom::Rom},
    services::rom::{RomPagination, RomPayload, RomService},
};

#[tauri::command]
pub async fn command_get_roms(
    app_handle: AppHandle,
    pagination: RomPagination,
    search_term: Option<String>,
) -> Result<RomPayload, Error> {
    RomService::get_roms(&app_handle, pagination, search_term).await
}

#[tauri::command]
pub async fn command_get_recently_played(app_handle: AppHandle) -> Result<RomPayload, Error> {
    RomService::get_recently_played(&app_handle).await
}

#[tauri::command]
pub async fn command_get_recently_added(app_handle: AppHandle) -> Result<RomPayload, Error> {
    RomService::get_recently_added(&app_handle).await
}

#[tauri::command]
pub async fn command_get_rom_by_id(app_handle: AppHandle, id: i32) -> Result<Rom, Error> {
    RomService::get_rom_by_id(&app_handle, id).await
}

#[tauri::command]
pub async fn command_get_roms_by_collection_id(
    app_handle: AppHandle,
    id: String,
    collection_type: RomCollection,
    pagination: RomPagination,
) -> Result<RomPayload, Error> {
    RomService::get_roms_by_collection_id(&app_handle, id, collection_type, pagination).await
}

#[tauri::command]
pub async fn command_get_roms_by_platform_id(
    app_handle: AppHandle,
    id: String,
    pagination: RomPagination,
) -> Result<RomPayload, Error> {
    RomService::get_roms_by_platform_id(&app_handle, id, pagination).await
}
