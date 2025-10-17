use tauri::AppHandle;

use crate::{
    enums::error::Error, models::collection::VirtualCollection, services::collection::Collection,
};

#[tauri::command]
pub async fn command_get_collections(
    app_handle: AppHandle,
) -> Result<Vec<VirtualCollection>, Error> {
    Collection::get_all(&app_handle).await
}
