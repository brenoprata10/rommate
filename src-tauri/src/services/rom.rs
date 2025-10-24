use serde::{Deserialize, Serialize};
use std::{fs::create_dir_all, sync::Mutex};
use tauri::{ipc::Channel, AppHandle, State};
use tokio_util::sync::CancellationToken;

use crate::{
    enums::{download_event::DownloadEvent, error::Error},
    models::{
        collection::RomCollection,
        rom::{Rom, RomUserSave},
    },
    romm::romm_http::RommHttp,
    services::retroarch::{RetroarchCore, RetroarchRunner, RetroarchService},
    AppState,
};

use super::downloader::DownloaderService;

#[derive(Serialize, Deserialize)]
pub struct RomPayload {
    total: u32,
    limit: u32,
    offset: u32,
    items: Vec<Rom>,
}

#[derive(Serialize, Deserialize)]
pub struct RomPagination {
    limit: u16,
    offset: u16,
}

pub struct RomService {}

impl RomService {
    pub fn get_roms_url_with_pagination(pagination: RomPagination) -> String {
        format!(
            "/api/roms?limit={}&offset={}",
            pagination.limit, pagination.offset
        )
    }

    pub async fn get_roms(
        app_handle: &AppHandle,
        pagination: RomPagination,
        search_term: Option<String>,
    ) -> Result<RomPayload, Error> {
        let mut url = RomService::get_roms_url_with_pagination(pagination);
        if let Some(search_term) = search_term {
            url.push_str(format!("&search_term={search_term}").as_str());
        };
        let response = RommHttp::get(app_handle, url.as_str())?.send().await?;

        let roms = response.json::<RomPayload>().await?;

        Ok(roms)
    }

    pub async fn get_recently_played(app_handle: &AppHandle) -> Result<RomPayload, Error> {
        let response = RommHttp::get(
            app_handle,
            "/api/roms?order_by=last_played&order_dir=desc&limit=15&with_char_index=false",
        )?
        .send()
        .await?;

        let roms = response.json::<RomPayload>().await?;

        Ok(roms)
    }

    pub async fn get_recently_added(app_handle: &AppHandle) -> Result<RomPayload, Error> {
        let response = RommHttp::get(
            app_handle,
            "/api/roms?order_by=id&order_dir=desc&limit=25&with_char_index=false",
        )?
        .send()
        .await?;

        let roms = response.json::<RomPayload>().await?;

        Ok(roms)
    }

    pub async fn get_rom_by_id(app_handle: &AppHandle, id: i32) -> Result<Rom, Error> {
        let response = RommHttp::get(app_handle, &format!("/api/roms/{}", id))?
            .send()
            .await?;

        let rom = response.json::<Rom>().await?;

        Ok(rom)
    }

    pub async fn get_roms_by_collection_id(
        app_handle: &AppHandle,
        id: String,
        collection_type: RomCollection,
        pagination: RomPagination,
    ) -> Result<RomPayload, Error> {
        let collection_param = match collection_type {
            RomCollection::Smart => "smart_collection_id",
            RomCollection::Virtual => "virtual_collection_id",
            RomCollection::Default => "collection_id",
        };

        let url = RomService::get_roms_url_with_pagination(pagination);
        let response = RommHttp::get(app_handle, &format!("{url}&{collection_param}={id}"))?
            .send()
            .await?;

        let roms = response.json::<RomPayload>().await?;

        Ok(roms)
    }

    pub async fn get_roms_by_platform_id(
        app_handle: &AppHandle,
        id: String,
        pagination: RomPagination,
    ) -> Result<RomPayload, Error> {
        let url = RomService::get_roms_url_with_pagination(pagination);
        let response = RommHttp::get(app_handle, &format!("{url}&platform_id={id}"))?
            .send()
            .await?;

        let roms = response.json::<RomPayload>().await?;

        Ok(roms)
    }

    pub async fn get_rom_saves(
        app_handle: &AppHandle,
        rom_id: i32,
        platform_id: u16,
    ) -> Result<Vec<RomUserSave>, Error> {
        let response = RommHttp::get(
            app_handle,
            format!("/api/saves?rom_id={rom_id}&platform_id={platform_id}").as_str(),
        )?
        .send()
        .await?;

        let saves = response.json::<Vec<RomUserSave>>().await?;

        Ok(saves)
    }

    pub async fn download_rom(
        app_handle: &AppHandle,
        state: State<'_, Mutex<AppState>>,
        id: String,
        rom_id: i32,
        on_event: Channel<DownloadEvent>,
    ) -> Result<(), Error> {
        on_event
            .send(DownloadEvent::Waiting { id: id.clone() })
            .unwrap();
        let rom = RomService::get_rom_by_id(app_handle, rom_id).await?;
        let content_length = rom.fs_size_bytes;
        let file_url = format!("/api/roms/{}/content/{}", rom.id, rom.fs_name);
        let file_directory = format!(
            "{}/{}",
            DownloaderService::get_download_path()?,
            rom.platform_fs_slug
        );
        let file_path = format!("{file_directory}/{}", rom.fs_name);

        // Create directory path if it does not exist
        create_dir_all(&file_directory)?;

        let response = RommHttp::get(app_handle, &file_url)?.send().await?;

        let mut app_state = state.lock().unwrap();
        let cancellation_token = CancellationToken::new();
        app_state
            .downloads
            .insert(id.clone(), cancellation_token.clone());

        tauri::async_runtime::spawn(DownloaderService::with_stream(
            id,
            response,
            file_path,
            content_length,
            on_event,
            cancellation_token,
        ));

        Ok(())
    }

    pub async fn download_save_file(
        app_handle: &AppHandle,
        rom_id: i32,
        platform_id: u16,
        runner: RetroarchRunner,
        core: RetroarchCore,
        rom_path: String,
    ) -> Result<(), Error> {
        let saves = RomService::get_rom_saves(app_handle, rom_id, platform_id).await?;
        println!("here");
        if let Some(save) = saves.first() {
            let save_request = RommHttp::get(app_handle, &save.download_path)?;
            let retroarch_service = RetroarchService::new(runner, core, rom_path);
            DownloaderService::file(save_request, &save.file_name, retroarch_service.save_path)
                .await?;
        }
        Ok(())
    }
}
