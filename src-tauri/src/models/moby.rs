use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct MobyMetadata {
    moby_score: Option<String>,
    genres: Option<Vec<String>>,
    alternate_titles: Option<Vec<String>>,
    platforms: Option<Vec<MobyPlatform>>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
struct MobyPlatform {
    moby_id: i64,
    name: String,
}
