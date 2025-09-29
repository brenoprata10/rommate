use std::fs::exists;

use tauri::AppHandle;
use tauri_plugin_opener::OpenerExt;

use crate::enums::error::Error;

use super::downloader::Downloader;

pub async fn is_file_downloaded(file_name: String) -> Result<bool, Error> {
    let download_directory = Downloader::get_download_path()?;
    let is_downloaded = exists(format!("{download_directory}/{file_name}"))?;

    Ok(is_downloaded)
}

pub fn open_directory(app_handle: &AppHandle, path: String) -> Result<(), Error> {
    app_handle.opener().open_path(path, None::<&str>)?;
    Ok(())
}

pub fn open_download_directory(app_handle: &AppHandle) -> Result<(), Error> {
    let download_path = Downloader::get_download_path()?;

    open_directory(app_handle, download_path)?;
    Ok(())
}
