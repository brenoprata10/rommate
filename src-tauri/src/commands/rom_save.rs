use tauri::AppHandle;

use crate::{dtos::save_sync::SaveSync, enums::error::Error, services::{retroarch::RetroarchService, rom_save::RomSaveService}};

#[tauri::command]
pub async fn command_check_save_sync(
	app_handle: AppHandle,
	rom_id: i32
) -> Result<SaveSync, Error> {
	RomSaveService::check_save_sync(&app_handle, rom_id).await
}

#[tauri::command]
pub async fn command_download_most_recent_save_file(
	app_handle: AppHandle,
	rom_id: i32
) -> Result<(), Error> {
	RomSaveService::download_most_recent_save_file(&app_handle, rom_id).await
}

#[tauri::command]
pub async fn command_upload_local_save_file(
	app_handle: AppHandle,
	rom_id: i32
) -> Result<(), Error> {
	RetroarchService::upload_local_save_file(&app_handle, rom_id).await
}