use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

use super::{
    hasheous::HasheousMetadata, igdb::IgdbMetadata, launchbox::LaunchBoxMetadata,
    retroachievements::RetroAchievementsMetadata, screen_scrapper::ScreenScrapperMetadata,
};

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct Rom {
    pub id: i32,
    igdb_id: Option<u64>,
    sgdb_id: Option<u64>,
    moby_id: Option<u64>,
    ss_id: Option<u64>,
    ra_id: Option<u64>,
    launchbox_id: Option<u64>,
    hasheous_id: Option<u64>,
    tgdb_id: Option<u64>,
    platform_id: u16,
    platform_slug: String,
    pub platform_fs_slug: String,
    platform_custom_name: String,
    platform_display_name: String,
    pub fs_name: String,
    fs_name_no_tags: String,
    fs_name_no_ext: String,
    fs_extension: String,
    fs_path: String,
    pub fs_size_bytes: u64,
    name: String,
    slug: Option<String>,
    summary: Option<String>,
    alternative_names: Vec<String>,
    youtube_video_id: Option<String>,
    metadatum: RomMetadatum,
    igdb_metadata: Option<IgdbMetadata>,
    ss_metadata: Option<ScreenScrapperMetadata>,
    launchbox_metadata: Option<LaunchBoxMetadata>,
    hasheous_metadata: Option<HasheousMetadata>,
    path_cover_small: String,
    path_cover_large: String,
    url_cover: Option<String>,
    has_manual: bool,
    path_manual: Option<String>,
    url_manual: Option<String>,
    is_unidentified: bool,
    is_identified: bool,
    revision: String,
    regions: Vec<String>,
    languages: Vec<String>,
    tags: Vec<String>,
    crc_hash: Option<String>,
    md5_hash: Option<String>,
    sha1_hash: Option<String>,
    multi: bool,
    files: Vec<RomFile>,
    full_path: String,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
    missing_from_fs: bool,
    merged_ra_metadata: Option<RetroAchievementsMetadata>,
    merged_screenshots: Option<Vec<String>>,
    siblings: Vec<RomSiblings>,
    rom_user: RomUser,
    user_saves: Option<Vec<RomUserSave>>,
    user_states: Option<Vec<RomUserState>>,
    user_screenshots: Option<Vec<RomUserScreenshot>>,
    user_notes: Option<Vec<RomUserNote>>,
    user_collections: Option<Vec<RomUserCollection>>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
struct RomUserNote {
    user_id: i32,
    username: String,
    note_raw_markdown: String,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
struct RomUserCollection {
    name: String,
    description: Option<String>,
    rom_ids: Option<Vec<u32>>,
    rom_count: Option<u32>,
    path_cover_small: Option<String>,
    path_cover_large: Option<String>,
    path_covers_small: Option<Vec<String>>,
    path_covers_large: Option<Vec<String>>,
    is_public: Option<bool>,
    is_favorite: Option<bool>,
    is_virtual: Option<bool>,
    is_smart: Option<bool>,
    created_at: Option<DateTime<Utc>>,
    updated_at: Option<DateTime<Utc>>,
    id: u16,
    url_cover: Option<String>,
    user_id: Option<i32>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
struct RomUserSave {
    id: u32,
    rom_id: u32,
    user_id: u32,
    file_name: String,
    file_name_no_tags: String,
    file_name_no_ext: String,
    file_extension: String,
    file_path: String,
    file_size_bytes: u64,
    full_path: String,
    download_path: String,
    missing_from_fs: bool,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
    emulator: Option<String>,
    screenshot: Option<RomUserScreenshot>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
struct RomUserScreenshot {
    id: u32,
    rom_id: u32,
    user_id: u32,
    file_name: String,
    file_name_no_tags: String,
    file_name_no_ext: String,
    file_extension: String,
    file_path: String,
    file_size_bytes: u64,
    full_path: String,
    download_path: String,
    missing_from_fs: bool,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
struct RomUserState {
    id: u64,
    rom_id: u64,
    user_id: u64,
    file_name: String,
    file_name_no_tags: String,
    file_name_no_ext: String,
    file_extension: String,
    file_path: String,
    file_size_bytes: u64,
    full_path: String,
    download_path: String,
    missing_from_fs: bool,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
    emulator: String,
    screenshot: RomUserScreenshot,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
struct RomUser {
    id: i32,
    user_id: i32,
    rom_id: i32,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
    last_played: Option<DateTime<Utc>>,
    note_raw_markdown: String,
    note_is_public: bool,
    is_main_sibling: bool,
    backlogged: bool,
    now_playing: bool,
    hidden: bool,
    rating: i8,
    difficulty: u8,
    completion: u8,
    status: Option<RomUserStatus>,
}

#[derive(Debug, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "lowercase")]
enum RomUserStatus {
    Incomplete,
    Finished,
    #[serde(rename = "completed_100")]
    Completed100,
    Retired,
    #[serde(rename = "never_playing")]
    NeverPlaying,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
struct RomSiblings {
    id: u64,
    name: String,
    fs_name_no_tags: String,
    fs_name_no_ext: String,
    sort_comparator: String,
}

#[derive(Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "lowercase")]
enum RomFileCategory {
    Dlc,
    Hack,
    Manual,
    Patch,
    Update,
    Mod,
    Demo,
    Translation,
    Prototype,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
struct RomFile {
    id: u32,
    rom_id: u32,
    file_name: String,
    file_path: String,
    file_size_bytes: u64,
    full_path: String,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
    last_modified: DateTime<Utc>,
    crc_hash: Option<String>,
    md5_hash: Option<String>,
    sha1_hash: Option<String>,
    category: Option<RomFileCategory>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
struct RomMetadatum {
    rom_id: u64,
    genres: Vec<String>,
    franchises: Vec<String>,
    collections: Vec<String>,
    companies: Vec<String>,
    game_modes: Vec<String>,
    age_ratings: Vec<String>,
    first_release_date: Option<u64>,
    average_rating: Option<f32>,
}

#[derive(Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "UPPERCASE")]
pub struct RomStats {
    platforms: u32,
    roms: u64,
    saves: u32,
    states: u32,
    screenshots: u32,
    total_filesize_bytes: u64,
}
