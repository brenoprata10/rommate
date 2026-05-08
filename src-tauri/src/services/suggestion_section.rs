use tauri::AppHandle;

use crate::{enums::{error::Error, suggestion_section_kind::SuggestionSectionKind}, models::suggestion_section::SuggestionSection, services::rom::{RomPagination, RomService}};

pub struct SuggestionSectionService {
}

impl SuggestionSectionService {
	pub async fn get_sections(app_handle: &AppHandle) -> Result<Vec<SuggestionSection>, Error> {
		Ok(vec![SuggestionSectionService::get_verified_section(&app_handle).await?])
	}
	
	pub async fn get_verified_section(app_handle: &AppHandle) -> Result<SuggestionSection, Error> {
		let rom_payload = RomService::get_verified_roms(app_handle, RomPagination {
			limit: 1,
			offset: 0,
		}).await?;
		
		let limit = 20;
		let max_offset = total - limit;
		let items = RomService::get_verified_roms(app_handle, RomPagination {
			limit,
			offset: rand::thread_rng().gen_range(0..=max_offset),
		});
		
		println!("{}", rom_payload.total);
		
		Ok(SuggestionSection {
			items: vec![],
			title: "Test".to_string(),
			kind: SuggestionSectionKind::Verified
		})
	}
}