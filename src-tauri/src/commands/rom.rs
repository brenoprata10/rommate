use tauri::AppHandle;

use crate::{
    enums::error::Error,
    models::rom::Rom,
    services::rom::{get_recently_added, get_recently_played, get_rom_by_id, get_roms, RomPayload},
};

#[tauri::command]
pub async fn command_get_roms(app_handle: AppHandle) -> Result<RomPayload, Error> {
    get_roms(&app_handle).await
}

#[tauri::command]
pub async fn command_get_recently_played(app_handle: AppHandle) -> Result<RomPayload, Error> {
    get_recently_played(&app_handle).await
}

#[tauri::command]
pub async fn command_get_recently_added(app_handle: AppHandle) -> Result<RomPayload, Error> {
    get_recently_added(&app_handle).await
}

#[tauri::command]
pub async fn command_get_rom_by_id(app_handle: AppHandle, id: i32) -> Result<Rom, Error> {
    get_rom_by_id(&app_handle, id).await
}
