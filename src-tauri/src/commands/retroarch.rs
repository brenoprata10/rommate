use tauri::AppHandle;

use crate::{
    enums::error::Error,
    services::retroarch::{RetroarchCore, RetroarchService, RetroarchRunner},
};

#[tauri::command]
pub async fn command_play_retroarch_game(
    app_handle: AppHandle,
    runner: RetroarchRunner,
    core: RetroarchCore,
    rom_path: String,
) -> Result<(), Error> {
    let config = RetroarchService::new(runner, core, rom_path);
    config.play(&app_handle).await
}
