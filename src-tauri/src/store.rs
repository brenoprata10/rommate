use tauri::AppHandle;
use serde_json::Value;
use tauri_plugin_store::StoreExt;
use crate::enums::error::Error;

const STORE_PATH: &str = "store.json";

pub fn get_store_value(app_handle: &AppHandle, key: &str) -> Result<Option<Value>, Error> {
    let store = app_handle.store(STORE_PATH)?;

    let value = store.get(key);

    Ok(value)
}

pub fn set_store_value(app_handle: &AppHandle, key: &str, value: Value) -> Result<(), Error> {
    let store = app_handle.store(STORE_PATH)?;

    store.set(key, value);
    println!("{key}");

    Ok(())
}
