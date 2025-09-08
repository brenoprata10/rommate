use tauri::AppHandle;

use crate::{
    enums::error::Error,
    services::rom::{get_roms, RomPayload},
};

#[tauri::command]
pub async fn command_get_roms(app_handle: AppHandle) -> Result<RomPayload, Error> {
    get_roms(&app_handle).await
}
