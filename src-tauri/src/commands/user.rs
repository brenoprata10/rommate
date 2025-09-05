use tauri::AppHandle;
use crate::{enums::error::Error, services::user::{get_users, User}};

#[tauri::command]
pub async fn command_get_users(app_handle: AppHandle) -> Result<Vec<User>, Error> {
    Ok(get_users(&app_handle).await?)
}
