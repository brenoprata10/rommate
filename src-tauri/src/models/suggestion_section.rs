use serde::{Deserialize, Serialize};

use crate::{enums::suggestion_section_kind::SuggestionSectionKind, models::rom::Rom};

#[derive(Deserialize, Serialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct SuggestionSection {
	pub items: Vec<Rom>,
	pub title: String,
	pub kind: SuggestionSectionKind
}