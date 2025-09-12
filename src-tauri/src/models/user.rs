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
    avatar_path: String,
    ra_username: String,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
    last_login: DateTime<Utc>,
    last_active: DateTime<Utc>,
}
