use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "lowercase")]
pub enum RomCollection {
    Virtual,
    Smart,
    Default,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct UserCollection {
    name: String,
    description: Option<String>,
    rom_ids: Vec<i32>,
    rom_count: i32,
    path_cover_small: Option<String>,
    path_cover_large: Option<String>,
    path_covers_small: Vec<String>,
    path_covers_large: Vec<String>,
    is_public: bool,
    is_favorite: bool,
    is_virtual: bool,
    is_smart: bool,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
    id: i32,
    url_cover: Option<String>,
    user_id: i32,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct VirtualCollection {
    pub name: String,
    description: Option<String>,
    rom_ids: Vec<i32>,
    rom_count: i32,
    path_cover_small: Option<String>,
    path_cover_large: Option<String>,
    path_covers_small: Vec<String>,
    path_covers_large: Vec<String>,
    is_public: bool,
    is_favorite: bool,
    is_virtual: bool,
    is_smart: bool,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
    id: String,
    url_cover: Option<String>,
    r#type: Option<String>,
}

impl VirtualCollection {
    pub fn from_user_collection(collection: UserCollection) -> Self {
        VirtualCollection {
            name: collection.name,
            description: collection.description,
            rom_ids: collection.rom_ids,
            rom_count: collection.rom_count,
            path_cover_small: collection.path_cover_small,
            path_cover_large: collection.path_cover_large,
            path_covers_small: collection.path_covers_small,
            path_covers_large: collection.path_covers_large,
            is_public: collection.is_public,
            is_favorite: collection.is_favorite,
            is_virtual: collection.is_virtual,
            is_smart: collection.is_smart,
            created_at: collection.created_at,
            updated_at: collection.updated_at,
            id: collection.id.to_string(),
            url_cover: collection.url_cover,
            r#type: Some("user-collection".to_string()),
        }
    }
}
