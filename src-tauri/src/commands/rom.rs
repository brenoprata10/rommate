use tauri::AppHandle;

use crate::{enums::error::Error, models::rom::Rom, services::rom::get_roms};

#[tauri::command]
pub async fn command_get_roms(app_handle: AppHandle) -> Result<Vec<Rom>, Error> {
    get_roms(&app_handle).await
}
