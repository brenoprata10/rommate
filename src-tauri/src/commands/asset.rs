use tauri::AppHandle;

use crate::{enums::error::Error, services::romm_asset::RommAsset};

#[tauri::command]
pub async fn command_get_asset(app_handle: AppHandle, url: String) -> Result<Vec<u8>, Error> {
    RommAsset::get_asset(&app_handle, url).await
}
