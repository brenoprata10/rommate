use tauri::AppHandle;

use crate::{
    enums::error::Error, models::collection::Collection, services::collection::get_collections,
};

#[tauri::command]
pub async fn command_get_collections(app_handle: AppHandle) -> Result<Vec<Collection>, Error> {
    get_collections(&app_handle).await
}
