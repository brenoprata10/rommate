use tauri::AppHandle;

use crate::{enums::error::Error, models::rom::RomUserSave, romm::romm_http::RommHttp};

pub struct RomSaveService {}

impl RomSaveService {
	pub async fn get_rom_saves(app_handle: &AppHandle, rom_id: i32) -> Result<Vec<RomUserSave>, Error> {
		let response = RommHttp::get(app_handle, &format!("/api/saves?rom_id={}", rom_id))?.send().await?;
		
		let saves = response.json::<Vec<RomUserSave>>().await?;
		
		Ok(saves)
	}
}