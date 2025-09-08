use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct MobyMetadata {
    moby_score: Option<String>,
    genres: Option<Vec<String>>,
    alternate_titles: Option<Vec<String>>,
    platforms: Option<Vec<MobyPlatform>>,
}

#[derive(Serialize, Deserialize)]
struct MobyPlatform {
    moby_id: i64,
    name: String,
}
