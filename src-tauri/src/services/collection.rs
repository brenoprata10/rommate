use tauri::AppHandle;
use tokio::join;

use crate::{enums::error::Error, models::collection::Collection, romm::romm_http::RommHttp};

pub async fn get_all_collections(app_handle: &AppHandle) -> Result<Vec<Collection>, Error> {
    let (collections, smart_collections, virtual_collections) = join![
        get_collections(app_handle),
        get_collections_smart(app_handle),
        get_collections_virtual(app_handle),
    ];

    let mut all_collections = Vec::new();

    all_collections.extend(collections?);
    all_collections.extend(smart_collections?);
    all_collections.extend(virtual_collections?);

    Ok(all_collections)
}

pub async fn get_collections(app_handle: &AppHandle) -> Result<Vec<Collection>, Error> {
    let response = RommHttp::get(app_handle, "/api/collections")?
        .send()
        .await?;

    let collections = response.json::<Vec<Collection>>().await?;

    Ok(collections)
}

pub async fn get_collections_smart(app_handle: &AppHandle) -> Result<Vec<Collection>, Error> {
    let response = RommHttp::get(app_handle, "/api/collections/smart")?
        .send()
        .await?;

    let collections = response.json::<Vec<Collection>>().await?;

    Ok(collections)
}

pub async fn get_collections_virtual(app_handle: &AppHandle) -> Result<Vec<Collection>, Error> {
    let response = RommHttp::get(app_handle, "/api/collections/virtual")?
        .send()
        .await?;

    let collections = response.json::<Vec<Collection>>().await?;

    Ok(collections)
}
