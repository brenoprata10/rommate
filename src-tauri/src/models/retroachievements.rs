use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct RetroAchievementsMetadata {
    first_release_date: i64,
    genres: Vec<String>,
    companies: Vec<String>,
    achievements: Vec<RetroAchievement>,
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
    display_order: i16,
    r#type: String,
}
