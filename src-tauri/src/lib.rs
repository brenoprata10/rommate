use std::collections::HashMap;
use std::sync::Mutex;

use commands::asset::command_get_asset;
use commands::collection::command_get_collections;
use commands::downloader::{command_cancel_download, command_download_rom};
use commands::file::{command_is_file_downloaded, command_open_download_directory};
use commands::login::login;
use commands::platform::command_get_platforms;
use commands::process::command_restart_app;
use commands::retroarch::command_play_retroarch_game;
use commands::rom::{
    command_download_save_file, command_get_recently_added, command_get_recently_played,
    command_get_rom_by_id, command_get_roms, command_get_roms_by_collection_id,
    command_get_roms_by_platform_id,
};
use commands::user::{command_get_logged_in_user, command_get_users};
use tokio_util::sync::CancellationToken;

mod commands;
mod enums;
mod models;
mod romm;
mod services;
mod store;

pub struct AppState {
    pub downloads: HashMap<String, CancellationToken>,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_notification::init())
        .manage(Mutex::new(AppState {
            downloads: HashMap::<String, CancellationToken>::new(),
        }))
        .plugin(tauri_plugin_store::Builder::new().build())
        .invoke_handler(tauri::generate_handler![
            login,
            command_get_users,
            command_get_logged_in_user,
            command_get_roms,
            command_get_recently_played,
            command_get_recently_added,
            command_get_platforms,
            command_get_rom_by_id,
            command_get_collections,
            command_get_asset,
            command_get_roms_by_collection_id,
            command_get_roms_by_platform_id,
            command_download_rom,
            command_cancel_download,
            command_is_file_downloaded,
            command_open_download_directory,
            command_restart_app,
            command_play_retroarch_game,
            command_download_save_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
