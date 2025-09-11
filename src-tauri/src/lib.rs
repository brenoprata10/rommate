use commands::login::login;
use commands::rom::command_get_roms;
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
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
