use tauri::AppHandle;

use crate::{enums::error::Error, services::asset::get_asset};

#[tauri::command]
pub async fn command_get_asset(app_handle: AppHandle, url: String) -> Result<Vec<u8>, Error> {
    get_asset(&app_handle, url).await
}
