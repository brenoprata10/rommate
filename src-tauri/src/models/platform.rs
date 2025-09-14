use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct Platform {
    id: i32,
    slug: String,
    fs_slug: String,
    rom_count: i32,
    name: String,
    igdb_slug: Option<String>,
    moby_slug: Option<String>,
    custom_name: Option<String>,
    igdb_id: Option<i64>,
    sgdb_id: Option<i64>,
    moby_id: Option<i64>,
    launchbox_id: Option<i64>,
    ss_id: Option<i32>,
    ra_id: Option<i32>,
    hasheous_id: Option<i64>,
    tgdb_id: Option<i64>,
    category: Option<String>,
    generation: Option<i8>,
    family_name: Option<String>,
    family_slug: Option<String>,
    url: Option<String>,
    url_logo: Option<String>,
    aspect_ratio: String,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
    fs_size_bytes: i64,
    is_unidentified: bool,
    is_identified: bool,
    missing_from_fs: bool,
    display_name: String,
}
