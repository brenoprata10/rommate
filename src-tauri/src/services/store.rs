use crate::{enums::error::Error, models::installed_game::InstalledGame};
use serde_json::{from_value, json, Value};
use tauri::AppHandle;
use tauri_plugin_store::StoreExt;

const STORE_PATH: &str = "store.json";
const INSLALLED_GAMES_KEY: &str = "installed_games";

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

    pub fn add_installed_game(&self, game: InstalledGame) -> Result<(), Error> {
        let store = self.app_handle.store(STORE_PATH)?;
        let mut installed_games = match store.get(INSLALLED_GAMES_KEY) {
            Some(installed_games) => from_value::<Vec<InstalledGame>>(installed_games)?,
            None => vec![],
        };

        installed_games.push(game);

        store.set(INSLALLED_GAMES_KEY, json!(installed_games));

        Ok(())
    }
}
