use tauri::AppHandle;
use rand::{rng, RngExt};

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
		
		let limit: u32 = 20;
		let max_offset = rom_payload.total.saturating_sub(limit);
		
		let random_offset = {
			let mut rng = rng();
			rng.random_range(0..=max_offset as u16)
		};
		let verified_roms_payload = RomService::get_verified_roms(app_handle, RomPagination {
			limit: limit as u16,
			offset: random_offset,
		}).await?;
		
		Ok(SuggestionSection {
			items: verified_roms_payload.items,
			title: "Hasheous Verified".to_string(),
			kind: SuggestionSectionKind::Verified
		})
	}
}