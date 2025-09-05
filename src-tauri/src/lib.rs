use commands::login::login;
use commands::user::command_get_users;

mod commands;
mod store;
mod enums;
mod romm;
mod services;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![login, command_get_users])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
