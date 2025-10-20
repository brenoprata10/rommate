use tauri::AppHandle;

use crate::{
    enums::error::Error, models::collection::VirtualCollection, services::collection::CollectionService,
};

#[tauri::command]
pub async fn command_get_collections(
    app_handle: AppHandle,
) -> Result<Vec<VirtualCollection>, Error> {
    CollectionService::get_all(&app_handle).await
}
