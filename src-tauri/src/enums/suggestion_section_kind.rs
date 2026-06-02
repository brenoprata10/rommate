use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub enum SuggestionSectionKind {
	Verified,
	Favorite,
	Platform {
		slug: String,
		is_unidentified: bool
	},
	Retroachievements,
	FileSize {
		size: u32
	},
}