use futures_util::StreamExt;
use reqwest::Response;
use std::time::Instant;
use tauri::ipc::Channel;
use tokio::{fs::File, io::AsyncWriteExt};

use crate::enums::{download_event::DownloadEvent, error::Error};

pub struct Downloader {}

impl Downloader {
    pub async fn track_progress(
        id: String,
        response: Response,
        file: &mut File,
        content_length: u64,
        on_event: &Channel<DownloadEvent>,
    ) -> Result<(), Error> {
        let mut stream = response.bytes_stream();
        let mut downloaded: usize = 0;

        let start_time = Instant::now();
        let mut last_reported_mb: usize = 0;
        let mb_size = 1024usize * 1024;

        on_event
            .send(DownloadEvent::Started { id: id.clone() })
            .unwrap();

        while let Some(chunk) = stream.next().await {
            let chunk = chunk?;
            file.write_all(&chunk).await?;

            downloaded += chunk.len();

            let current_mb = downloaded / mb_size;
            if current_mb > last_reported_mb || downloaded == content_length as usize {
                last_reported_mb = current_mb;

                let speed = Downloader::get_speed(downloaded as f64, start_time);
                let progress = Downloader::get_progress(downloaded as f64, content_length as f64);

                on_event
                    .send(DownloadEvent::Progress {
                        id: id.clone(),
                        downloaded: Downloader::get_downloaded(downloaded as f64),
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

    pub fn get_downloaded(downloaded: f64) -> f64 {
        downloaded / 1024.0 / 1024.0
    }
}
