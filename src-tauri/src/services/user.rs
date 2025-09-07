use crate::{enums::error::Error, models::user::User, romm::romm_http::RommHttp};
use tauri::AppHandle;

pub async fn get_users(app_handle: &AppHandle) -> Result<Vec<User>, Error> {
    let response = RommHttp::get(app_handle, "/api/users")?.send().await?;

    let users = response.json::<Vec<User>>().await?;

    Ok(users)
}
