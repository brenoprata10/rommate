use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

use crate::services::retroarch::RetroarchCore;

#[derive(Default, Deserialize, Serialize)]
pub struct InstalledGame {
    id: String,
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
    pub fn new(id: &str, path: &str) -> Self {
        InstalledGame {
            id: id.to_string(),
            path: path.to_string(),
            ..Default::default()
        }
    }
}
