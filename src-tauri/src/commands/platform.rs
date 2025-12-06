use tauri::AppHandle;

use crate::{enums::error::Error, models::platform::Platform, services::platform::PlatformService};

#[tauri::command]
pub async fn command_get_platforms(app_handle: AppHandle) -> Result<Vec<Platform>, Error> {
    PlatformService::get_platforms(&app_handle).await
}
