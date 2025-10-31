use reqwest::{self, RequestBuilder};
use tauri::AppHandle;

use crate::{enums::error::Error, services::store::StoreService};

pub struct RommHttp {}

impl RommHttp {
    pub fn request(
        app_handle: &AppHandle,
        url: &str,
        method: reqwest::Method,
    ) -> Result<RequestBuilder, Error> {
        let store = StoreService::new(&app_handle);
        let stored_url = match store.get_value("romm_url") {
            Ok(Some(stored_url)) => Ok(stored_url),
            Ok(None) | Err(_) => Err(Error::RommUrlNotSet()),
        }?;
        let romm_url = stored_url.as_str().unwrap();

        let romm_session = store.get_value("romm_session")?;

        let client = reqwest::Client::builder().build()?;

        let mut request = client.request(method, format!("{}{}", romm_url, url));

        request = if let Some(romm_token) = romm_session {
            let header_value = format!("romm_session={}", romm_token.as_str().unwrap());
            request.header("Cookie", header_value)
        } else {
            request
        };

        Ok(request)
    }

    pub fn get(app_handle: &AppHandle, url: &str) -> Result<RequestBuilder, Error> {
        RommHttp::request(app_handle, url, reqwest::Method::GET)
    }
}
