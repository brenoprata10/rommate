pub struct LaunchBoxMetadata {
    first_release_date: i64,
    max_players: i16,
    release_type: String,
    cooperative: bool,
    youtube_video_id: String,
    community_rating: i8,
    wikipedia_url: String,
    esrb: String,
    genres: Vec<String>,
    companies: Vec<String>,
    images: Vec<LaunchBoxImage>,
}

struct LaunchBoxImage {
    url: String,
    r#type: String,
    region: String,
}
