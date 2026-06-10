use std::{env, fs::{exists}, process::Command};

use sha2::{Sha256, Digest};
use tokio::fs::File;
use tokio::io::{AsyncReadExt};

use crate::enums::error::Error;

use super::downloader::DownloaderService;

pub struct FileService {}

impl FileService {
    pub async fn is_downloaded(file_name: String, platform_slug: String) -> Result<bool, Error> {
        let download_directory = DownloaderService::get_roms_download_path()?;
        let is_downloaded = exists(format!("{download_directory}/{platform_slug}/{file_name}"))?;

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
                return Err(Error::OSUnsupported());
            }
        }
        Ok(())
    }

    pub fn open_download_directory(platform_slug: Option<String>) -> Result<(), Error> {
        let mut download_path = DownloaderService::get_roms_download_path()?;
        if let Some(platform_slug) = platform_slug {
            download_path.push_str(format!("/{platform_slug}").as_str());
        }

        FileService::open_directory(download_path)?;
        Ok(())
    }
    
    pub async fn hash_file(file: &mut File) -> std::io::Result<Vec<u8>> {
        let mut hasher = Sha256::new();
        let mut buf = [0u8; 8192];
    
        loop {
            let n = file.read(&mut buf).await?;
            if n == 0 { break; }
            hasher.update(&buf[..n]);
        }
    
        Ok(hasher.finalize().to_vec())
    }
    
    pub async fn is_equal(first_file: &mut File, second_file: &mut File) -> Result<bool, Error> {
        let first_file_metadata = first_file.metadata().await?;
        let second_file_metadata = second_file.metadata().await?;
        if first_file_metadata.len() != second_file_metadata.len() {
            return Ok(false);
        }
        Ok(Self::hash_file(first_file).await? == Self::hash_file(second_file).await?)
    }
}
