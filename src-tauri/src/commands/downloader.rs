use serde::Serialize;
use tauri::{ipc::Channel, AppHandle};

#[derive(Clone, Serialize)]
#[serde(
    rename_all = "camelCase",
    rename_all_fields = "camelCase",
    tag = "event",
    content = "data"
)]
pub enum DownloadEvent<'a> {
    Started {
        url: &'a str,
        download_id: usize,
        content_length: usize,
    },
    Progress {
        download_id: usize,
        chunk_length: usize,
    },
    Finished {
        download_id: usize,
    },
}

#[tauri::command]
pub fn download(app: AppHandle, url: String, on_event: Channel<DownloadEvent>) {
    let content_length = 1000;
    let download_id = 1;

    on_event
        .send(DownloadEvent::Started {
            url: &url,
            download_id,
            content_length,
        })
        .unwrap();

    for chunk_length in [15, 150, 35, 500, 300] {
        on_event
            .send(DownloadEvent::Progress {
                download_id,
                chunk_length,
            })
            .unwrap();
    }

    on_event
        .send(DownloadEvent::Finished { download_id })
        .unwrap();
}
