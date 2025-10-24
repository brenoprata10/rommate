use chrono::{DateTime, Utc};

use crate::services::retroarch::RetroarchCore;

#[derive(Default)]
pub struct InstalledGame {
    path: String,
    cloud_synced: bool,
    selected_core: Option<RetroarchCore>,
    pre_launch_script: Option<String>,
    post_launch_script: Option<String>,
    after_close_script: Option<String>,
    time_played: Option<u16>,
    last_played: Option<DateTime<Utc>>,
}

impl InstalledGame {
    pub fn new(path: String) -> Self {
        InstalledGame {
            path,
            ..Default::default()
        }
    }
}
