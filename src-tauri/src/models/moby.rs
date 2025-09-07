pub struct MobyMetadata {
    moby_score: String,
    genres: Vec<String>,
    alternate_titles: Vec<String>,
    platforms: Vec<MobyPlatform>,
}

struct MobyPlatform {
    moby_id: i64,
    name: String,
}
