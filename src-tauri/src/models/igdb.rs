pub struct IgdbMetadata {
    total_rating: String,
    aggregated_rating: String,
    first_release_date: i64,
    youtube_video_id: String,
    genres: Vec<String>,
    franchises: Vec<String>,
    alternative_names: Vec<String>,
    collections: Vec<String>,
    companies: Vec<String>,
    game_modes: Vec<String>,
    platforms: Vec<IgdbPlatform>,
    expansions: Vec<IgdbExpansion>,
    dlcs: Vec<IgdbDlc>,
    remasters: Vec<IgdbRemaster>,
    remakes: Vec<IgdbRemake>,
    expanded_games: Vec<IgdbExpandedGame>,
    ports: Vec<IgdbPort>,
    similar_games: Vec<IgdbSimilarGame>,
}

struct IgdbPlatform {
    igdb_id: i32,
    name: String,
}

struct IgdbExpansion {
    id: i64,
    name: String,
    slug: String,
    r#type: String,
    cover_url: String,
}

struct IgdbDlc {
    id: i64,
    name: String,
    slug: String,
    r#type: String,
    cover_url: String,
}

struct IgdbRemaster {
    id: i64,
    name: String,
    slug: String,
    r#type: String,
    cover_url: String,
}

struct IgdbRemake {
    id: i64,
    name: String,
    slug: String,
    r#type: String,
    cover_url: String,
}

struct IgdbExpandedGame {
    id: i64,
    name: String,
    slug: String,
    r#type: String,
    cover_url: String,
}

struct IgdbPort {
    id: i64,
    name: String,
    slug: String,
    r#type: String,
    cover_url: String,
}
struct IgdbSimilarGame {
    id: i64,
    name: String,
    slug: String,
    r#type: String,
    cover_url: String,
}
