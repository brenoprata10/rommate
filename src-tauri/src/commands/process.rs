use tauri::AppHandle;

#[tauri::command]
pub fn command_restart_app(app_handle: AppHandle) {
    app_handle.restart()
}
