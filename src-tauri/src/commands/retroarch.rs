use tauri::AppHandle;

use crate::{enums::error::Error, services::retroarch::RetroarchPlayerConfig};

#[tauri::command]
pub async fn command_play_retroarch_game(app_handle: AppHandle) -> Result<String, Error> {
    RetroarchPlayerConfig::play(&app_handle, "".to_string()).await
}
