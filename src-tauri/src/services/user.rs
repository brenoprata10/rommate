use serde::{Serialize, Deserialize};
use tauri::AppHandle;
use crate::{enums::error::Error, romm::romm_http::get_romm_request};
use tauri_plugin_http::reqwest;

#[derive(Debug, Deserialize, Serialize)]
pub struct User {
    id: i32,
    username: String,
}

pub async fn get_users(app_handle: &AppHandle) -> Result<Vec<User>, Error> {
    let response = get_romm_request(&app_handle, "/api/users", reqwest::Method::GET)
        ?.send().await?;

    let url = response.url().clone();
    for (name, value) in response.headers() {

        println!("Header: {} - {}",name, value.to_str().unwrap());
    }

    let status = response.status();
    let body = response.text().await?;

    println!("URL: {}", url);
    println!("Status: {}", status);
    println!("Response body: {}", body);

    let users: Vec<User> = serde_json::from_str(&body)?;

    Ok(users)
}
