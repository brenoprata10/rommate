use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[serde(rename_all = "lowercase")]
pub enum UserRole {
    Viewer,
    Editor,
    Admin,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct User {
    id: i32,
    username: String,
    email: String,
    enabled: bool,
    role: UserRole,
    avatar_path: Option<String>,
    ra_username: Option<String>,
    ra_progression: Option<RAProgression>,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
    last_login: DateTime<Utc>,
    last_active: DateTime<Utc>,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all(serialize = "camelCase"))]
struct RAProgression {
    total: i16,
    results: Vec<RAResults>,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all(serialize = "camelCase"))]
struct RAResults {
    rom_ra_id: i32,
    max_possible: i16,
    num_awarded: i16,
    num_awarded_hardcore: i16,
    most_recent_awarded_date: DateTime<Utc>,
    earned_achievements: Vec<EarnedAchievements>,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all(serialize = "camelCase"))]
struct EarnedAchievements {
    id: String,
    date: String,
}
