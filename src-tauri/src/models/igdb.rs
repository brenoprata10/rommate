use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct IgdbMetadata {
    total_rating: Option<String>,
    aggregated_rating: Option<String>,
    first_release_date: Option<i64>,
    youtube_video_id: Option<String>,
    genres: Option<Vec<String>>,
    franchises: Option<Vec<String>>,
    alternative_names: Option<Vec<String>>,
    collections: Option<Vec<String>>,
    companies: Option<Vec<String>>,
    game_modes: Option<Vec<String>>,
    platforms: Option<Vec<IgdbPlatform>>,
    expansions: Option<Vec<IgdbExpansion>>,
    dlcs: Option<Vec<IgdbDlc>>,
    remasters: Option<Vec<IgdbRemaster>>,
    remakes: Option<Vec<IgdbRemake>>,
    expanded_games: Option<Vec<IgdbExpandedGame>>,
    ports: Option<Vec<IgdbPort>>,
    similar_games: Option<Vec<IgdbSimilarGame>>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
struct IgdbPlatform {
    igdb_id: i32,
    name: String,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
struct IgdbExpansion {
    id: i64,
    name: String,
    slug: String,
    r#type: String,
    cover_url: String,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
struct IgdbDlc {
    id: i64,
    name: String,
    slug: String,
    r#type: String,
    cover_url: String,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
struct IgdbRemaster {
    id: i64,
    name: String,
    slug: String,
    r#type: String,
    cover_url: String,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
struct IgdbRemake {
    id: i64,
    name: String,
    slug: String,
    r#type: String,
    cover_url: String,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
struct IgdbExpandedGame {
    id: i64,
    name: String,
    slug: String,
    r#type: String,
    cover_url: String,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
struct IgdbPort {
    id: i64,
    name: String,
    slug: String,
    r#type: String,
    cover_url: String,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
struct IgdbSimilarGame {
    id: i64,
    name: String,
    slug: String,
    r#type: String,
    cover_url: String,
}
