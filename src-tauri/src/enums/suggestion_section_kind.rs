use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(tag = "kind", rename_all = "camelCase")]
pub enum SuggestionSectionKind {
    Verified,
    Favorite,
    Collection,
    Genre,
    Company,
    PlayedRelated,
    FavoriteRelated,
    Platform {
        #[serde(rename = "slug")]
        slug: String,
        #[serde(rename = "isUnidentified")]
        is_unidentified: bool,
    },
    Retroachievements,
}
