use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct MobyMetadata {
    moby_score: String,
    genres: Vec<String>,
    alternate_titles: Vec<String>,
    platforms: Vec<MobyPlatform>,
}

#[derive(Serialize, Deserialize)]
struct MobyPlatform {
    moby_id: i64,
    name: String,
}
