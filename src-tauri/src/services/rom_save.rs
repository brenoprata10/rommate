use tauri::AppHandle;

use crate::{enums::error::Error, models::rom::RomUserSave, romm::romm_http::RommHttp};

pub struct RomSaveService {}

impl RomSaveService {
	pub async fn get_rom_saves(app_handle: &AppHandle, rom_id: i32) -> Result<Vec<RomUserSave>, Error> {
		let response = RommHttp::get(app_handle, &format!("/api/saves?rom_id={}", rom_id))?.send().await?;
		
		let saves = response.json::<Vec<RomUserSave>>().await?;
		
		Ok(saves)
	}
	
	pub async fn get_most_recent_rom_save(app_handle: &AppHandle, rom_id: i32) -> Result<RomUserSave, Error> {
		let mut rom_saves = RomSaveService::get_rom_saves(app_handle, rom_id).await?;
		rom_saves.sort_by_key(|save| save.updated_at);
		
		let latest_save = rom_saves
			.into_iter()
			.last()
			.ok_or(
				Error::NotFound("No saves were returned".to_string())
			)?;	
			
		Ok(latest_save)
	}
}