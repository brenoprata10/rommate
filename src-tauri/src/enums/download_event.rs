use serde::Serialize;

#[derive(Clone, Serialize)]
#[serde(
    rename_all = "camelCase",
    rename_all_fields = "camelCase",
    tag = "event"
)]
pub enum DownloadEvent {
    Started {
        id: String,
    },
    Progress {
        id: String,
        downloaded: f64,
        progress: u32,
        speed: f64,
    },
    Finished {
        id: String,
    },
    Cancelled {
        id: String,
    },
}
