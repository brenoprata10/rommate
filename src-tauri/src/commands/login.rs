use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct LoginPayload {
    username: String,
    password: String,
    #[serde(rename = "serverURL")]
    server_url: String,
}

#[tauri::command]
pub fn login(payload: LoginPayload) -> LoginPayload {
    payload
}
