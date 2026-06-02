use std::future::Future;

use tauri::AppHandle;
use rand::{prelude::IndexedRandom, rng, RngExt, seq::SliceRandom};

use crate::{enums::{error::Error, suggestion_section_kind::SuggestionSectionKind}, models::{rom::Rom, suggestion_section::SuggestionSection}, services::{platform::PlatformService, rom::{RomPagination, RomPayload, RomService}}};

pub struct SuggestionSectionService {
}

impl SuggestionSectionService {
	const LIMIT : u32 = 20;
	
	pub async fn get_sections(app_handle: &AppHandle) -> Result<Vec<SuggestionSection>, Error> {
		let favorite_section = Self::get_favorite_section(app_handle).await?;
		let verified_section = Self::get_verified_section(app_handle).await?;
		let retroachievements_section = Self::get_retroachievements_section(app_handle).await?;
		let platform_section = Self::get_platform_section(app_handle).await?;
		
		let sections: Vec<SuggestionSection> = vec![
			favorite_section,
			verified_section, 
			retroachievements_section,
			platform_section
		].into_iter().filter(|section| !section.items.is_empty()).collect();
		
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
	
	pub async fn get_retroachievements_section(app_handle: &AppHandle) -> Result<SuggestionSection, Error> {
		let retroachievements_roms = Self::get_section_items(
			|pagination| RomService::get_retroachievement_roms(app_handle, pagination)
		).await?;
		
		Ok(SuggestionSection { 
			items: retroachievements_roms,
			title: "Retroachievements Supported".to_string(),
			kind: SuggestionSectionKind::Retroachievements 
		})
	}
	
	pub async fn get_platform_section(app_handle: &AppHandle) -> Result<SuggestionSection, Error> {
		let platforms = PlatformService::get_platforms(app_handle).await?;
		let default_platform = platforms.first().ok_or(
			Error::NotFound("Platforms are unavailable.".to_string())
		)?;
		let platform = platforms.choose(&mut rand::rng()).unwrap_or(default_platform);
		
		let platform_roms = Self::get_section_items(
			|pagination| RomService::get_roms_by_platform_id(app_handle, platform.id.to_string(), pagination)
		).await?;
		
		Ok(
			SuggestionSection {
				items: platform_roms,
				title: format!("{}", platform.name),
				kind: SuggestionSectionKind::Platform {
					slug: platform.slug.clone(),
					is_unidentified: platform.is_unidentified
				 },
			}
		)
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
		
		let mut roms = roms_payload.items;
		let mut rng = rng();
		
		// Randomize order output
		roms.shuffle(&mut rng);
		
		Ok(roms)
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