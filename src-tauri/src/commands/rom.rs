use tauri::AppHandle;

use crate::{
    enums::error::Error,
    models::{collection::RomCollection, rom::Rom},
    services::rom::{
        get_recently_added, get_recently_played, get_rom_by_id, get_roms,
        get_roms_by_collection_id, RomPayload,
    },
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

#[tauri::command]
pub async fn command_get_roms_by_collection_id(
    app_handle: AppHandle,
    id: i32,
    collection_type: RomCollection,
) -> Result<RomPayload, Error> {
    println!("asd");
    println!("{id}");
    let asd = format!("{:?}", collection_type);
    println!("{asd}");
    get_roms_by_collection_id(&app_handle, id, collection_type).await
}
