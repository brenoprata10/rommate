use tauri::AppHandle;

use crate::{enums::error::Error, models::suggestion_section::SuggestionSection, services::suggestion_section::SuggestionSectionService};

#[tauri::command]
pub async fn command_get_sections(
	app_handle: AppHandle,
) -> Result<Vec<SuggestionSection>, Error> {
	SuggestionSectionService::get_sections(&app_handle).await
}