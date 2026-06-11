use std::path::PathBuf;
use std::{io::BufReader, os::unix::fs::MetadataExt};

use std::fs::File;
use std::io::Read;
use reqwest::multipart;
use tauri::AppHandle;
use tokio::join;

use crate::{dtos::save_sync::{FileConflictInfo, SaveSync, SaveSyncKind}, enums::error::Error, models::rom::{Rom, RomUserSave}, romm::romm_http::RommHttp, services::{downloader::DownloaderService, file::FileService, rom::RomService}};

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
	
	pub async fn download_most_recent_save_file(app_handle: &AppHandle, rom_id: i32) -> Result<(), Error> {
		let rom = RomService::get_rom_by_id(app_handle, rom_id).await?;
		let latest_save = RomSaveService::get_most_recent_rom_save(app_handle, rom_id).await?;
		let file_name = format!(
			"{}.{}", 
			latest_save.file_name_no_tags, 
			latest_save.file_extension
		);
		let file_url = format!("/api/saves/{}/content", latest_save.id); 
		let directory = DownloaderService::get_rom_save_dir(&rom.platform_fs_slug)?;
		
		DownloaderService::file(
			RommHttp::get(app_handle, &file_url)?, 
			file_name,
			directory
		).await?;
		Ok(())
	}
	
	pub async fn upload_save_file(app_handle: &AppHandle, rom_id: i32, file: File, path: PathBuf) -> Result<(), Error> {
		println!("{:?}", file);
		let url = format!("/api/saves?rom_id={}", rom_id);
		let mut content = Vec::new();
		let mut reader = BufReader::new(file);
		reader.read_to_end(&mut content)?;
		
		let mut form = multipart::Form::new();
		form = form.part("saveFile", multipart::Part::bytes(content)
			.file_name(
				path
					.file_name()
					.map(|name| name.to_string_lossy().into_owned())
					.ok_or(
						Error::NotFound("Could not read save name.".to_string())
					)?
			)
			.mime_str("application/octet-stream")?
		);
		
		let response = RommHttp::post_multipart(app_handle, &url, form)?.send().await?;
		let status = response.status();
		
		if status.is_client_error() || status.is_server_error() {
			let response_text = response.text().await?;
			let error_message = format!("Upload failed with status: {status} - {response_text}");
			println!("{}", error_message);
			return Err(Error::InternalServer(error_message.to_string()))
		};
		
		Ok(())
	}
	
	pub async fn check_save_sync(app_handle: &AppHandle, rom_id: i32) -> Result<SaveSync, Error> {
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
			Err(_error) => return Ok(SaveSync {
				kind: SaveSyncKind::MissingCloudFile
			})
		};
		let file_url = format!("/api/saves/{}/content", latest_save.id);
		let uploaded_save = DownloaderService::temporary_file(
			RommHttp::get(app_handle, &file_url)?
		).await?;
		
		let rom_path = format!(
			"{}/{}.{}", platform_fs_slug, fs_name_no_ext, latest_save.file_extension
		);
		let mut local_save = match File::open(
			format!("{}/{}", DownloaderService::get_saves_download_path()?, rom_path)
		) {
			Ok(local_save) => local_save,
			Err(_error) => return Ok( SaveSync {
				kind: SaveSyncKind::MissingLocalFile
			})
		};
		let mut buf = Vec::new();
		local_save.read_to_end(&mut buf)?;
		
		let uploaded_save_metadata = uploaded_save.metadata()?;
		let local_file_metadata = local_save.metadata()?;
		
		if FileService::is_equal(&mut uploaded_save.into(), &mut local_save.into()).await? {
			return Ok(SaveSync {
				kind: SaveSyncKind::Synced
			})
		}
		
		Ok(SaveSync {
			kind: SaveSyncKind::Conflict { 
				cloud_file: FileConflictInfo {
					creation_date: uploaded_save_metadata.created()?.into(),
					length: uploaded_save_metadata.size()
				}, 
				local_file: FileConflictInfo {
					creation_date: local_file_metadata.created()?.into(),
					length: local_file_metadata.size()
				}
			}
		})
	}
}