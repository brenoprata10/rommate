use tauri::{ipc::Channel, AppHandle};

use crate::{
    enums::{download_event::DownloadEvent, error::Error},
    services::rom::download_rom,
};

#[tauri::command]
pub async fn command_download_rom(
    app_handle: AppHandle,
    rom_id: i32,
    on_event: Channel<DownloadEvent>,
) -> Result<(), Error> {
    download_rom(&app_handle, rom_id, on_event).await
}
