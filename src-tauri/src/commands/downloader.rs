use std::{fs::create_dir_all, time::Instant};
use tokio::fs::File;

use serde::Serialize;
use tauri::{ipc::Channel, AppHandle};

use crate::{
    enums::error::Error, romm::romm_http::RommHttp, services::rom::get_rom_by_id,
    store::get_store_value,
};

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
    let server_url = match get_store_value(&app_handle, "romm_url") {
        Ok(Some(stored_url)) => Ok(stored_url),
        Ok(None) | Err(_) => Err(Error::RommUrlNotSet()),
    }?;
    let file_url = format!(
        "{}/api/roms/{}/content/{}",
        server_url.as_str().expect("server_url must be a string"),
        rom.id,
        rom.fs_name
    );
    let home_dir_path = match dirs::home_dir() {
        Some(path) => Ok(path),
        None => Err(Error::InternalServer(
            "Could not retrieve home folder.".to_string(),
        )),
    }?;

    println!("{file_url}");
    println!("{content_length}");

    let file_directory = format!(
        "{}/Rommate/Downloads",
        home_dir_path
            .to_str()
            .expect("Failed to parse home dir to string.")
    );
    let file_path = format!("{}/{}", file_directory, rom.fs_name);

    println!("{file_path}");

    // Create directory path if it does not exist
    create_dir_all(&file_directory)?;
    let mut file = File::create(file_path).await?;

    let response = RommHttp::get(&app_handle, &file_url)?.send().await?;
    let mut stream = response.bytes_stream();
    let mut downloaded = 0u64;
    let start_time = Instant::now();

    on_event.send(DownloadEvent::Started { rom_id }).unwrap();

    /*while let Some(chunk) = stream.next().await {
        let chunk = chunk?;
        file.write_all(&chunk).await?;

        downloaded += chunk.len() as u64;

        // Print progress every 1MB
        if downloaded % (1024 * 1024) == 0 || downloaded == total_size {
            let elapsed = start_time.elapsed().as_secs_f64();
            let speed = downloaded as f64 / elapsed / 1024.0 / 1024.0; // MB/s
            let progress = if total_size > 0 {
                (downloaded as f64 / total_size as f64 * 100.0) as u32
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
    }*/

    /*for chunk_length in [15, 150, 35, 500, 300] {
        on_event
            .send(DownloadEvent::Progress {
                rom_id,
                chunk_length,
            })
            .unwrap();
    }*/

    on_event.send(DownloadEvent::Finished { rom_id }).unwrap();

    Ok(())
}

/* Start the actual download
let response = client.get(url).send().await?;

if !response.status().is_success() {
    return Err(format!("HTTP error: {}", response.status()).into());
}

let mut file = File::create("largefile.zip").await?;
let mut stream = response.bytes_stream();
let mut downloaded = 0u64;
let start_time = Instant::now();

while let Some(chunk) = stream.next().await {
    let chunk = chunk?;
    file.write_all(&chunk).await?;

    downloaded += chunk.len() as u64;

    // Print progress every 1MB
    if downloaded % (1024 * 1024) == 0 || downloaded == total_size {
        let elapsed = start_time.elapsed().as_secs_f64();
        let speed = downloaded as f64 / elapsed / 1024.0 / 1024.0; // MB/s
        let progress = if total_size > 0 {
            (downloaded as f64 / total_size as f64 * 100.0) as u32
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
}*/
