use commands::asset::command_get_asset;
use commands::collection::command_get_collections;
use commands::downloader::command_download_rom;
use commands::login::login;
use commands::platform::command_get_platforms;
use commands::rom::{
    command_get_recently_added, command_get_recently_played, command_get_rom_by_id,
    command_get_roms, command_get_roms_by_collection_id, command_get_roms_by_platform_id,
};
use commands::user::{command_get_logged_in_user, command_get_users};

mod commands;
mod enums;
mod models;
mod romm;
mod services;
mod store;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
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
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
