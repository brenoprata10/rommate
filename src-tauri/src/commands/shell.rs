use tauri::AppHandle;

use crate::services::shell::run_shell;

#[tauri::command]
pub async fn command_run_shell(app_handle: AppHandle) {
    run_shell(&app_handle).await
}
