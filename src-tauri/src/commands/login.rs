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

#[derive(Debug, Deserialize, Serialize)]
pub struct User {
    id: i32,
    username: String,
}

#[tauri::command]
pub async fn login(app_handle: AppHandle, payload: LoginPayload) -> Result<Vec<User>, Error> {
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
        set_store_value(&app_handle, "romm_session", json!(cookie.value()))?;
    }
    set_store_value(&app_handle, "romm_url", json!(server_url))?;

    let body = get_romm_request(&app_handle, "/api/users", reqwest::Method::GET)
        ?.send().await?.text().await?;


    let users: Vec<User> = serde_json::from_str(&body)?;

    Ok(users)
}
