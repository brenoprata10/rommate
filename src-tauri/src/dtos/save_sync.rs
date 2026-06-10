use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct FileConflictInfo {
	pub creation_date: DateTime<Utc>,
	pub length: u64,
}

#[derive(Serialize, Deserialize)]
#[serde(tag = "kind", rename_all = "camelCase")]
pub enum SaveSyncKind {
	Conflict {
		cloud_file: FileConflictInfo,
		local_file: FileConflictInfo,
	},
	Synced,
	MissingLocalFile,
	MissingCloudFile	
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SaveSync {
	#[serde(flatten)]
	pub kind: SaveSyncKind,
}