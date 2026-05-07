use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase", deserialize= "UPPERCASE"))]
pub struct ServerStat {
	platforms: u16,
	roms: u32,
	saves: u32,
	states: u32,
	screenshots: u32,
	total_filesize_bytes: u64
}