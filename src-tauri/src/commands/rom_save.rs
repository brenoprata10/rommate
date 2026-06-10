use tauri::AppHandle;

use crate::{dtos::save_sync::SaveSync, enums::error::Error, services::rom_save::RomSaveService};

#[tauri::command]
pub async fn command_check_save_sync(
	app_handle: AppHandle,
	rom_id: i32
) -> Result<SaveSync, Error> {
	RomSaveService::check_save_sync(&app_handle, rom_id).await
}