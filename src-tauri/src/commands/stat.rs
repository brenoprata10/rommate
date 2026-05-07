use tauri::AppHandle;

use crate::{enums::error::Error, models::stat::ServerStat, services::stat::ServerStatService};

#[tauri::command]
pub async fn command_get_stats(app_handle: AppHandle) -> Result<ServerStat, Error>{
	ServerStatService::get_stats(&app_handle).await
}