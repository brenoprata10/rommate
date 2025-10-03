use crate::{
    enums::error::Error,
    services::file::{is_file_downloaded, open_download_directory},
};

#[tauri::command]
pub async fn command_is_file_downloaded(file_name: String) -> Result<bool, Error> {
    is_file_downloaded(file_name).await
}

#[tauri::command]
pub async fn command_open_download_directory() -> Result<(), Error> {
    open_download_directory()
}
