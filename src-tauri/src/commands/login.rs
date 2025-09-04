use serde::{Serialize, Deserialize};
use crate::enums::error::Error;
use tauri_plugin_http::reqwest;

#[derive(Serialize, Deserialize, Debug)]
pub struct LoginPayload {
    username: String,
    password: String,
    #[serde(rename = "serverURL")]
    server_url: String,
}

#[tauri::command]
pub async fn login(payload: LoginPayload) -> Result<(), Error> {
    let LoginPayload {
        username,
        password,
        server_url,
    } = payload;

    let client = reqwest::Client::builder()
        .cookie_store(true)
        .build()?;

    let response = client
        .post(format!("{}/api/login", server_url))
        .basic_auth(username, Some(password))
        .send().await?;

    // Print cookies received
    println!("Cookies received:");
    for cookie in response.cookies() {
        println!("{} = {}", cookie.name(), cookie.value());
    }

    Ok(())
}
