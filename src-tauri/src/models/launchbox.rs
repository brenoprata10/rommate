use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct LaunchBoxMetadata {
    first_release_date: Option<i64>,
    max_players: Option<i16>,
    release_type: Option<String>,
    cooperative: Option<bool>,
    youtube_video_id: Option<String>,
    community_rating: Option<i8>,
    wikipedia_url: Option<String>,
    esrb: Option<String>,
    genres: Option<Vec<String>>,
    companies: Option<Vec<String>>,
    images: Option<Vec<LaunchBoxImage>>,
}

#[derive(Serialize, Deserialize)]
struct LaunchBoxImage {
    url: String,
    r#type: String,
    region: String,
}
