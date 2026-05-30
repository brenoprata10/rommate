use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub enum SuggestionSectionKind {
	Verified,
	Favorite,
	Retroachievements,
	FileSize {
		size: u32
	},
}