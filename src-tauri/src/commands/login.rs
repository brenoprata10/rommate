use serde::{Serialize, Deserialize};
use serde_json::json;
use tauri::AppHandle;
use crate::{enums::error::Error, romm::romm_http::get_romm_request, store::set_store_value};
use tauri_plugin_http::reqwest;

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

    let client = reqwest::Client::builder()
        .build()?;

    let response = client
        .post(format!("{}/api/login", server_url))
        .basic_auth(username, Some(password))
        .send().await?;

    for cookie in response.cookies() {
        set_store_value(&app_handle, "romm_session", json!({"value": cookie.value()}))?;
    }
    set_store_value(&app_handle, "romm_url", json!({"value": server_url}))?;

    let users = get_romm_request(&app_handle, "/api/users", reqwest::Method::GET)
        ?.send().await?;
    let text = users.text().await.unwrap();

    Ok(())
}
