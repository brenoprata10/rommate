use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct ScreenScrapperMetadata {
    ss_score: Option<String>,
    first_release_date: Option<i64>,
    alternative_names: Option<Vec<String>>,
    companies: Option<Vec<String>>,
    franchises: Option<Vec<String>>,
    game_modes: Option<Vec<String>>,
    genres: Option<Vec<String>>,
}
