use tauri::AppHandle;
use tokio::{fs::File, io::AsyncReadExt, join};

use crate::{enums::error::Error, models::rom::{Rom, RomUserSave}, romm::romm_http::RommHttp, services::{downloader::DownloaderService, file::FileService, rom::RomService}};

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
	
	/*
	- User Clicks on Play
	- in FE, check if saves are sync
	- if not, show pop up
	- user chooses if he wants local file or cloud file
	- call command based on answer
	- if local file, play the game normally
	- if cloud file, replace local file with cloud file and play game
	*/
	
	pub async fn is_save_synced(app_handle: &AppHandle, rom_id: i32) -> Result<bool, Error> {
		let (rom, latest_save) = join!(
			RomService::get_rom_by_id(app_handle, rom_id),
			RomSaveService::get_most_recent_rom_save(app_handle, rom_id)
		);
		let Rom {
			platform_fs_slug,
			fs_name_no_ext,
			..
		} = rom?;
		
		let latest_save = match latest_save {
			Ok(latest_save) => latest_save,
			// If there are no cloud saves, then there is no need to check any further
			Err(_error) => return Ok(true)
		};
		let file_url = format!("/api/saves/{}/content", latest_save.id);
		let uploaded_save = DownloaderService::temporary_file(
			RommHttp::get(app_handle, &file_url)?
		).await?;
		
		let rom_path = format!("{}/{}.{}", platform_fs_slug, fs_name_no_ext, latest_save.file_extension);
		let mut local_save = File::open(
			format!("{}{}", DownloaderService::get_saves_download_path()?, rom_path)
		).await?;
		let mut buf = Vec::new();
		local_save.read_to_end(&mut buf).await?;
		
		Ok(FileService::is_equal(uploaded_save.into(), local_save).await?)
	}
}