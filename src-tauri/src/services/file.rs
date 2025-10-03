use std::{env, fs::exists, process::Command};

use tauri::AppHandle;

use crate::enums::error::Error;

use super::downloader::Downloader;

pub async fn is_file_downloaded(file_name: String) -> Result<bool, Error> {
    let download_directory = Downloader::get_download_path()?;
    let is_downloaded = exists(format!("{download_directory}/{file_name}"))?;

    Ok(is_downloaded)
}

pub fn open_directory(path: String) -> Result<(), Error> {
    let os = env::consts::OS;

    match os {
        "windows" => {
            Command::new("explorer")
                .arg(path.replace("/", "\\"))
                .spawn()?;
        }
        "macos" => {
            Command::new("open").arg(path).spawn()?;
        }
        "linux" => {
            Command::new("xdg-open").arg(path).spawn()?;
        }
        _ => {
            return Err(Error::RommUrlNotSet());
        }
    }
    Ok(())
}

pub fn open_download_directory(app_handle: &AppHandle) -> Result<(), Error> {
    let download_path = Downloader::get_download_path()?;

    open_directory(download_path)?;
    Ok(())
}
