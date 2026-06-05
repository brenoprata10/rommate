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
    rom_id: i32
) -> Result<(), Error> {
    let config = RetroarchService::new(runner, core, rom_path, rom_id);
    config.play(&app_handle).await
}
