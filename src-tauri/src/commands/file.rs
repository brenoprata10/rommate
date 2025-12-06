use crate::{enums::error::Error, services::file::FileService};

#[tauri::command]
pub async fn command_is_file_downloaded(
    file_name: String,
    platform_slug: String,
) -> Result<bool, Error> {
    FileService::is_downloaded(file_name, platform_slug).await
}

#[tauri::command]
pub async fn command_open_download_directory(platform_slug: Option<String>) -> Result<(), Error> {
    FileService::open_download_directory(platform_slug)
}
