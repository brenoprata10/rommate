use futures_util::StreamExt;
use reqwest::{RequestBuilder, Response};
use std::{
    fs::{create_dir_all, remove_file},
    io::Write,
    sync::Mutex,
    time::Instant,
};
use tauri::{ipc::Channel, State};
use tokio::{fs::File, io::AsyncWriteExt};
use tokio_util::sync::CancellationToken;
use tempfile::tempfile;

use crate::{
    AppState, enums::{download_event::DownloadEvent, error::Error}
    };

pub struct DownloaderService {}

impl DownloaderService {
    pub async fn file(
        request: RequestBuilder,
        file_name: String,
        directory: String,
    ) -> Result<(), Error> {
        // Create directories path if it does not exist
        create_dir_all(&directory)?;

        let mut file = std::fs::File::create(format!("{directory}/{file_name}"))?;
        let bytes = request.send().await?.bytes().await?;
        file.write_all(&bytes)?;

        Ok(())
    }
    
    pub async fn temporary_file(
        request: RequestBuilder,
    ) -> Result<std::fs::File, Error> {
        let mut file = tempfile()?;
        let bytes = request.send().await?.bytes().await?;
        file.write_all(&bytes)?;
    
        Ok(file)
    }

    pub async fn with_stream(
        id: String,
        response: Response,
        file_path: String,
        content_length: u64,
        on_event: Channel<DownloadEvent>,
        cancellation_token: CancellationToken,
    ) -> Result<(), Error> {
        let mut stream = response.bytes_stream();
        let mut downloaded: usize = 0;

        let start_time = Instant::now();
        let mut last_reported_mb: usize = 0;
        let mb_size = 1024usize * 1024;

        let mut file = File::create(&file_path).await?;

        if cancellation_token.is_cancelled() {
            on_event
                .send(DownloadEvent::Cancelled { id: id.clone() })
                .unwrap();
            return Err(Error::DownloadCancelled(id));
        }

        on_event
            .send(DownloadEvent::Started { id: id.clone() })
            .unwrap();

        while let Some(chunk) = stream.next().await {
            if cancellation_token.is_cancelled() {
                remove_file(&file_path)?;
                on_event
                    .send(DownloadEvent::Cancelled { id: id.clone() })
                    .unwrap();
                return Err(Error::DownloadCancelled(id));
            }
            let chunk = chunk?;
            file.write_all(&chunk).await?;

            downloaded += chunk.len();

            let current_mb = downloaded / mb_size;
            if current_mb > last_reported_mb || downloaded == content_length as usize {
                last_reported_mb = current_mb;

                let speed = DownloaderService::get_speed(downloaded as f64, start_time);
                let progress =
                    DownloaderService::get_progress(downloaded as f64, content_length as f64);

                on_event
                    .send(DownloadEvent::Progress {
                        id: id.clone(),
                        downloaded: downloaded as f64,
                        progress,
                        speed,
                    })
                    .unwrap();
            }
        }

        on_event
            .send(DownloadEvent::Finished { id: id.clone() })
            .unwrap();

        Ok(())
    }

    pub fn get_speed(downloaded: f64, elapsed_instant: Instant) -> f64 {
        let elapsed = elapsed_instant.elapsed().as_secs_f64();
        if elapsed > 0.0 {
            downloaded / elapsed / 1024.0 / 1024.0 // MB/s
        } else {
            0.0
        }
    }

    pub fn get_progress(downloaded: f64, content_length: f64) -> u32 {
        if content_length > 0.0 {
            (downloaded / content_length * 100.0) as u32
        } else {
            0
        }
    }

    pub fn get_download_path() -> Result<String, Error> {
        let home_dir_path = match dirs::home_dir() {
            Some(path) => Ok(path),
            None => Err(Error::InternalServer(
                "Could not retrieve home folder.".to_string(),
            )),
        }?;

        Ok(format!(
            "{}/Rommate",
            home_dir_path
                .to_str()
                .expect("Failed to parse home dir to string.")
        ))
    }
    
    pub fn get_config_path() -> Result<String, Error> {
        let download_path = Self::get_download_path()?;
    
        Ok(format!(
            "{}/config",
            download_path
        ))
    }
    
    pub fn get_saves_download_path() -> Result<String, Error> {
        let download_path = Self::get_download_path()?;
    
        Ok(format!(
            "{}/saves",
            download_path
        ))
    }
    
    pub fn get_rom_save_dir(platform_fs_slug: &str) -> Result<String, Error> {
        Ok(
            format!(
                "{}/{}", 
                DownloaderService::get_saves_download_path()?,
                platform_fs_slug,
            )
        )
    }
    
    pub fn get_state_download_path() -> Result<String, Error> {
        let download_path = Self::get_download_path()?;
    
        Ok(format!(
            "{}/states",
            download_path
        ))
    }
    
    pub fn get_rom_state_dir(platform_fs_slug: &str) -> Result<String, Error> {
        Ok(
            format!(
                "{}/{}", 
                DownloaderService::get_state_download_path()?,
                platform_fs_slug,
            )
        )
    }
    
    pub fn get_roms_download_path() -> Result<String, Error> {
        let download_path = Self::get_download_path()?;
    
        Ok(format!(
            "{}/roms",
            download_path
        ))
    }

    pub async fn cancel_download(
        state: State<'_, Mutex<AppState>>,
        id: String,
    ) -> Result<(), Error> {
        let mut state = state.lock().unwrap();

        if let Some(token) = state.downloads.get(&id) {
            token.cancel();
            state.downloads.remove(&id);
            Ok(())
        } else {
            Err(Error::NotFound("Download ID not found.".to_string()))
        }
    }
}
