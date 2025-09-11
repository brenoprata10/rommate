use crate::{
    enums::error::Error,
    models::user::User,
    services::user::{get_logged_in_user, get_users},
};
use tauri::AppHandle;

#[tauri::command]
pub async fn command_get_users(app_handle: AppHandle) -> Result<Vec<User>, Error> {
    get_users(&app_handle).await
}

#[tauri::command]
pub async fn command_get_logged_in_user(app_handle: AppHandle) -> Result<User, Error> {
    get_logged_in_user(&app_handle).await
}
