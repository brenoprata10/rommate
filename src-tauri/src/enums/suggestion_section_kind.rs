use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub enum SuggestionSectionKind {
	Verified,
	FileSize {
		size: u32
	}
}