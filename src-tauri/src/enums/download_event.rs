use serde::Serialize;

#[derive(Clone, Serialize)]
#[serde(
    rename_all = "camelCase",
    rename_all_fields = "camelCase",
    tag = "event",
    content = "data"
)]
pub enum DownloadEvent {
    Started {
        rom_id: i32,
    },
    Progress {
        rom_id: i32,
        downloaded: f64,
        progress: u32,
        speed: f64,
    },
    Finished {
        rom_id: i32,
    },
}
