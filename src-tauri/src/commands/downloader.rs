use std::sync::Mutex;

use tauri::{ipc::Channel, AppHandle, State};

use crate::{
    enums::{download_event::DownloadEvent, error::Error},
    services::{downloader::cancel_download, rom::download_rom},
    AppState,
};

#[tauri::command]
pub async fn command_download_rom(
    app_handle: AppHandle,
    state: State<'_, Mutex<AppState>>,
    id: String,
    rom_id: i32,
    on_event: Channel<DownloadEvent>,
) -> Result<(), Error> {
    download_rom(&app_handle, state, id, rom_id, on_event).await
}

#[tauri::command]
pub async fn command_cancel_download(
    state: State<'_, Mutex<AppState>>,
    id: String,
) -> Result<(), Error> {
    cancel_download(state, id).await
}
