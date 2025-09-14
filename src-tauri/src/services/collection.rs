use tauri::AppHandle;

use crate::{enums::error::Error, models::collection::Collection, romm::romm_http::RommHttp};

pub async fn get_collections(app_handle: &AppHandle) -> Result<Vec<Collection>, Error> {
    let response = RommHttp::get(app_handle, "/api/collections")?
        .send()
        .await?;

    let collections = response.json::<Vec<Collection>>().await?;

    Ok(collections)
}
