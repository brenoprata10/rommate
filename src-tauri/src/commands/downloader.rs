use serde::Serialize;
use tauri::{ipc::Channel, AppHandle};

use crate::{enums::error::Error, services::rom::get_rom_by_id, store::get_store_value};

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
    println!("{file_url}");
    println!("{content_length}");

    on_event.send(DownloadEvent::Started { rom_id }).unwrap();

    for chunk_length in [15, 150, 35, 500, 300] {
        on_event
            .send(DownloadEvent::Progress {
                rom_id,
                chunk_length,
            })
            .unwrap();
    }

    on_event.send(DownloadEvent::Finished { rom_id }).unwrap();

    Ok(())
}
