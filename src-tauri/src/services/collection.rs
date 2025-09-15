use std::cmp::Ordering;

use tauri::AppHandle;
use tokio::join;

use crate::{
    enums::error::Error,
    models::collection::{UserCollection, VirtualCollection},
    romm::romm_http::RommHttp,
};

pub async fn get_all_collections(app_handle: &AppHandle) -> Result<Vec<VirtualCollection>, Error> {
    let (collections, smart_collections, virtual_collections) = join![
        get_collections(app_handle),
        get_collections_smart(app_handle),
        get_collections_virtual(app_handle),
    ];

    let mut all_collections = Vec::new();

    all_collections.extend(
        collections?
            .into_iter()
            .map(VirtualCollection::from_user_collection),
    );
    all_collections.extend(
        smart_collections?
            .into_iter()
            .map(VirtualCollection::from_user_collection),
    );
    all_collections.extend(virtual_collections?);
    all_collections.sort_by(|collection_a, collection_b| collection_a.name.cmp(&collection_b.name));

    Ok(all_collections)
}

pub async fn get_collections(app_handle: &AppHandle) -> Result<Vec<UserCollection>, Error> {
    let response = RommHttp::get(app_handle, "/api/collections")?
        .send()
        .await?;

    let collections = response.json::<Vec<UserCollection>>().await?;

    Ok(collections)
}

pub async fn get_collections_smart(app_handle: &AppHandle) -> Result<Vec<UserCollection>, Error> {
    let response = RommHttp::get(app_handle, "/api/collections/smart")?
        .send()
        .await?;

    let collections = response.json::<Vec<UserCollection>>().await?;

    Ok(collections)
}

pub async fn get_collections_virtual(
    app_handle: &AppHandle,
) -> Result<Vec<VirtualCollection>, Error> {
    let response = RommHttp::get(app_handle, "/api/collections/virtual?type=collection")?
        .send()
        .await?;

    let collections = response.json::<Vec<VirtualCollection>>().await?;

    Ok(collections)
}
