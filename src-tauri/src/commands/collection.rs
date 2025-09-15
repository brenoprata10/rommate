use tauri::AppHandle;

use crate::{
    enums::error::Error, models::collection::VirtualCollection,
    services::collection::get_all_collections,
};

#[tauri::command]
pub async fn command_get_collections(
    app_handle: AppHandle,
) -> Result<Vec<VirtualCollection>, Error> {
    get_all_collections(&app_handle).await
}
