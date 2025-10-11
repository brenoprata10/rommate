use tauri::AppHandle;

use crate::{
    enums::error::Error,
    services::retroarch::{RetroarchCore, RetroarchPlayerConfig, RetroarchRunner},
};

#[tauri::command]
pub async fn command_play_retroarch_game(
    app_handle: AppHandle,
    runner: RetroarchRunner,
    core: RetroarchCore,
    rom_path: String,
) -> Result<String, Error> {
    let config = RetroarchPlayerConfig::new(runner, core, rom_path);
    config.play(&app_handle).await
}
