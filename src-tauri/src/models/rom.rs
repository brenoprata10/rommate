use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

use super::{
    hasheous::HasheousMetadata, igdb::IgdbMetadata, launchbox::LaunchBoxMetadata,
    moby::MobyMetadata, retroachievements::RetroAchievementsMetadata,
    screen_scrapper::ScreenScrapperMetadata,
};

#[derive(Serialize, Deserialize)]
pub struct Rom {
    id: i32,
    igdb_id: Option<i64>,
    sgdb_id: Option<i64>,
    moby_id: Option<i64>,
    ss_id: Option<i64>,
    ra_id: Option<i64>,
    launchbox_id: Option<i64>,
    hasheous_id: Option<i64>,
    tgdb_id: Option<i64>,
    platform_id: i16,
    platform_slug: String,
    platform_fs_slug: String,
    platform_name: String,
    platform_custom_name: String,
    platform_display_name: String,
    fs_name: String,
    fs_name_no_tags: String,
    fs_name_no_ext: String,
    fs_extension: String,
    fs_path: String,
    fs_size_bytes: i64,
    name: String,
    slug: String,
    summary: String,
    alternative_names: Vec<String>,
    youtube_video_id: Option<String>,
    metadatum: RomMetadatum,
    igdb_metadata: Option<IgdbMetadata>,
    moby_metadata: Option<MobyMetadata>,
    ss_metadata: Option<ScreenScrapperMetadata>,
    launchbox_metadata: Option<LaunchBoxMetadata>,
    hasheous_metadata: Option<HasheousMetadata>,
    path_cover_small: String,
    path_cover_large: String,
    url_cover: String,
    has_manual: bool,
    path_manual: Option<String>,
    url_manual: String,
    is_unidentified: bool,
    is_identified: bool,
    revision: String,
    regions: Vec<String>,
    languages: Vec<String>,
    tags: Vec<String>,
    crc_hash: String,
    md5_hash: String,
    sha1_hash: String,
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
struct RomUserNote {
    user_id: i32,
    username: String,
    note_raw_markdown: String,
}

#[derive(Serialize, Deserialize)]
struct RomUserCollection {
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
    id: i16,
    url_cover: String,
    user_id: i32,
}

#[derive(Serialize, Deserialize)]
struct RomUserSave {
    id: i32,
    rom_id: i32,
    user_id: i32,
    file_name: String,
    file_name_no_tags: String,
    file_name_no_ext: String,
    file_extension: String,
    file_path: String,
    file_size_bytes: i64,
    full_path: String,
    download_path: String,
    missing_from_fs: String,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
    emulator: String,
    screenshot: RomUserScreenshot,
}

#[derive(Serialize, Deserialize)]
struct RomUserScreenshot {
    id: i32,
    rom_id: i32,
    user_id: i32,
    file_name: String,
    file_name_no_tags: String,
    file_name_no_ext: String,
    file_extension: String,
    file_path: String,
    file_size_bytes: i64,
    full_path: String,
    download_path: String,
    missing_from_fs: bool,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
}

#[derive(Serialize, Deserialize)]
struct RomUserState {
    id: i64,
    rom_id: i64,
    user_id: i64,
    file_name: String,
    file_name_no_tags: String,
    file_name_no_ext: String,
    file_extension: String,
    file_path: String,
    file_size_bytes: i64,
    full_path: String,
    download_path: String,
    missing_from_fs: bool,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
    emulator: String,
    screenshot: RomUserScreenshot,
}

#[derive(Serialize, Deserialize)]
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
    difficulty: i8,
    completion: i8,
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
struct RomSiblings {
    id: i64,
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
struct RomFile {
    id: i32,
    rom_id: i32,
    file_name: String,
    file_path: String,
    file_size_bytes: i64,
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
struct RomMetadatum {
    rom_id: i64,
    genres: Vec<String>,
    franchises: Vec<String>,
    collections: Vec<String>,
    companies: Vec<String>,
    game_modes: Vec<String>,
    age_ratings: Vec<String>,
    first_release_date: i64,
    average_rating: f32,
}

#[derive(Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "UPPERCASE")]
pub struct RomStats {
    platforms: i32,
    roms: i64,
    saves: i32,
    states: i32,
    screenshots: i32,
    total_filesize_bytes: i64,
}
