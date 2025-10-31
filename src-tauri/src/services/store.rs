use crate::{enums::error::Error, models::installed_game::InstalledGame};
use serde_json::Value;
use tauri::AppHandle;
use tauri_plugin_store::StoreExt;

const STORE_PATH: &str = "store.json";

pub struct StoreService<'a> {
    app_handle: &'a AppHandle,
}

impl<'a> StoreService<'a> {
    pub fn new(app_handle: &'a AppHandle) -> Self {
        StoreService { app_handle }
    }

    pub fn get_value(&self, key: &str) -> Result<Option<Value>, Error> {
        let store = self.app_handle.store(STORE_PATH)?;
        let value = store.get(key);

        Ok(value)
    }

    pub fn set_value(&self, key: &str, value: Value) -> Result<(), Error> {
        let store = self.app_handle.store(STORE_PATH)?;
        store.set(key, value);

        Ok(())
    }

    pub fn add_installed_game(game: InstalledGame) -> Result<(), Error> {
        let store = self.app_handle.store(STORE_PATH)?;
    }
}
