use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct Collection {
    name: String,
    description: String,
    rom_ids: Vec<i32>,
    rom_count: i32,
    path_cover_small: String,
    path_cover_large: String,
    path_covers_small: Vec<String>,
    path_covers_large: Vec<String>,
    is_public: bool,
    is_favorite: bool,
    is_virtual: bool,
    is_smart: bool,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
    id: i32,
    url_cover: String,
    user_id: i32,
}
