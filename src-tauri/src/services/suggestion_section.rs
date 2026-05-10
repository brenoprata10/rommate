use std::future::Future;

use tauri::AppHandle;
use rand::{rng, RngExt};

use crate::{enums::{error::Error, suggestion_section_kind::SuggestionSectionKind}, models::{rom::Rom, suggestion_section::SuggestionSection}, services::rom::{RomPagination, RomPayload, RomService}};

pub struct SuggestionSectionService {
}

impl SuggestionSectionService {
	const LIMIT : u32 = 20;
	
	pub async fn get_sections(app_handle: &AppHandle) -> Result<Vec<SuggestionSection>, Error> {
		let favorite_section = Self::get_favorite_section(&app_handle).await?;
		let verified_section = Self::get_verified_section(&app_handle).await?;
		
		let sections: Vec<SuggestionSection> = vec![favorite_section, verified_section]
			.into_iter()
			.filter(|section| !section.items.is_empty())
			.collect();
		
		Ok(sections)
	}
	
	pub async fn get_favorite_section(app_handle: &AppHandle) -> Result<SuggestionSection, Error> {
		let favorite_roms = Self::get_section_items(
			|pagination| RomService::get_favorite_roms(app_handle, pagination)
		).await?;
		
		Ok(SuggestionSection {
			items: favorite_roms,
			title: "Favorites".to_string(),
			kind: SuggestionSectionKind::Favorite
		})
	}
	
	pub async fn get_verified_section(app_handle: &AppHandle) -> Result<SuggestionSection, Error> {
		let verified_roms = Self::get_section_items(
			|pagination| RomService::get_verified_roms(&app_handle, pagination)
		).await?;
		
		Ok(SuggestionSection {
			items: verified_roms,
			title: "Hasheous Verified".to_string(),
			kind: SuggestionSectionKind::Verified
		})
	}
	
	pub async fn get_section_items<F, Fut>(get_items: F) -> Result<Vec<Rom>, Error> 
	  where 
	    F: Fn(RomPagination) -> Fut, 
		Fut: Future<Output = Result<RomPayload, Error>>,
	  {
		
		let rom_payload = get_items(RomPagination {
			limit: 1,
			offset: 0,
		}).await?;
		
		let random_offset = Self::get_random_offset(rom_payload.total);
		let roms_payload = get_items(RomPagination {
			limit: Self::LIMIT,
			offset: random_offset,
		}).await?;
		
		Ok(roms_payload.items)
	}
	
	fn get_random_offset(total: u32) -> u32 {
		let max_offset = total.saturating_sub(Self::LIMIT);
		
		let random_offset = {
			let mut rng = rng();
			rng.random_range(0..=max_offset)
		};
		
		random_offset
	}
}