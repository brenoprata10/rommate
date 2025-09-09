use crate::{enums::error::Error, store::set_store_value};
use reqwest::{self, StatusCode};
use serde::{Deserialize, Serialize};
use serde_json::json;
use tauri::AppHandle;

#[derive(Serialize, Deserialize, Debug)]
pub struct LoginPayload {
    username: String,
    password: String,
    #[serde(rename = "serverURL")]
    server_url: String,
}

#[tauri::command]
pub async fn login(app_handle: AppHandle, payload: LoginPayload) -> Result<(), Error> {
    let LoginPayload {
        username,
        password,
        server_url,
    } = payload;

    let client = reqwest::Client::builder().build()?;

    let response = client
        .post(format!("{}/api/login", server_url))
        .basic_auth(username, Some(password))
        .send()
        .await?;

    match response.status() {
        StatusCode::OK => {
            for cookie in response.cookies() {
                if cookie.name() == "romm_session" {
                    set_store_value(&app_handle, "romm_session", json!(cookie.value()))?;
                }
            }
            set_store_value(&app_handle, "romm_url", json!(server_url))?;
            Ok(())
        }
        StatusCode::UNAUTHORIZED => Err(Error::InvalidCredentials()),
        StatusCode::NOT_FOUND => Err(Error::NotFound("Server URL not found.".to_string())),
        StatusCode::INTERNAL_SERVER_ERROR => Err(Error::InternalServer(response.text().await?)),
        _ => Err(Error::InternalServer(
            "Could not fetch credentials.".to_string(),
        )),
    }
}
