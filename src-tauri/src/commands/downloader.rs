use futures_util::StreamExt;
use std::{fs::create_dir_all, time::Instant};
use tokio::{fs::File, io::AsyncWriteExt};

use serde::Serialize;
use tauri::{ipc::Channel, AppHandle};

use crate::{enums::error::Error, romm::romm_http::RommHttp, services::rom::get_rom_by_id};

#[derive(Clone, Serialize)]
#[serde(
    rename_all = "camelCase",
    rename_all_fields = "camelCase",
    tag = "event",
    content = "data"
)]
pub enum DownloadEvent {
    Started { rom_id: i32 },
    Progress { rom_id: i32, chunk_length: i32 },
    Finished { rom_id: i32 },
}

#[tauri::command]
pub async fn download(
    app_handle: AppHandle,
    rom_id: i32,
    on_event: Channel<DownloadEvent>,
) -> Result<(), Error> {
    let rom = get_rom_by_id(&app_handle, rom_id).await?;
    let content_length = rom.fs_size_bytes;
    let file_url = format!("/api/roms/{}/content/{}", rom.id, rom.fs_name);
    let home_dir_path = match dirs::home_dir() {
        Some(path) => Ok(path),
        None => Err(Error::InternalServer(
            "Could not retrieve home folder.".to_string(),
        )),
    }?;

    let file_directory = format!(
        "{}/Rommate/Downloads",
        home_dir_path
            .to_str()
            .expect("Failed to parse home dir to string.")
    );
    let file_path = format!("{}/{}", file_directory, rom.fs_name);

    // Create directory path if it does not exist
    create_dir_all(&file_directory)?;
    let mut file = File::create(file_path).await?;

    let response = RommHttp::get(&app_handle, &file_url)?.send().await?;
    let mut stream = response.bytes_stream();
    let mut downloaded: usize = 0;

    let start_time = Instant::now();
    let mut last_reported_mb: usize = 0;
    let mb_size = 1024usize * 1024;

    on_event.send(DownloadEvent::Started { rom_id }).unwrap();

    while let Some(chunk) = stream.next().await {
        let chunk = chunk?;
        file.write_all(&chunk).await?;

        downloaded += chunk.len();

        let current_mb = downloaded / mb_size;
        if current_mb > last_reported_mb || downloaded == content_length as usize {
            last_reported_mb = current_mb;

            let elapsed = start_time.elapsed().as_secs_f64();
            let speed = if elapsed > 0.0 {
                downloaded as f64 / elapsed / 1024.0 / 1024.0 // MB/s
            } else {
                0.0
            };
            let progress = if content_length > 0 {
                (downloaded as f64 / content_length as f64 * 100.0) as u32
            } else {
                0
            };

            println!(
                "Downloaded: {:.1} MB | Progress: {}% | Speed: {:.1} MB/s",
                downloaded as f64 / 1024.0 / 1024.0,
                progress,
                speed
            );
        }
    }

    on_event.send(DownloadEvent::Finished { rom_id }).unwrap();

    Ok(())
}
