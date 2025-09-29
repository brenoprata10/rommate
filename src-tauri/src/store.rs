use crate::enums::error::Error;
use serde_json::Value;
use tauri::AppHandle;
use tauri_plugin_store::StoreExt;

const STORE_PATH: &str = "store.json";

pub fn get_store_value(app_handle: &AppHandle, key: &str) -> Result<Option<Value>, Error> {
    let store = app_handle.store(STORE_PATH)?;

    let value = store.get(key);

    Ok(value)
}

pub fn set_store_value(app_handle: &AppHandle, key: &str, value: Value) -> Result<(), Error> {
    let store = app_handle.store(STORE_PATH)?;

    store.set(key, value);

    Ok(())
}
