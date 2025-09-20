use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct RetroAchievementsMetadata {
    first_release_date: Option<i64>,
    genres: Option<Vec<String>>,
    companies: Option<Vec<String>>,
    achievements: Option<Vec<RetroAchievement>>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
struct RetroAchievement {
    ra_id: i64,
    title: String,
    description: String,
    points: i16,
    num_awarded: i32,
    num_awarded_hardcore: i32,
    badge_id: String,
    badge_url_lock: String,
    badge_url: String,
    badge_path: String,
    badge_path_lock: String,
    display_order: i16,
    r#type: Option<String>,
}
