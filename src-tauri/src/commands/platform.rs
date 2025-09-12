use tauri::AppHandle;

use crate::{enums::error::Error, models::platform::Platform, services::platform::get_platforms};

#[tauri::command]
pub async fn command_get_platforms(app_handle: AppHandle) -> Result<Vec<Platform>, Error> {
    get_platforms(&app_handle).await
}
