use tauri::AppHandle;

use crate::{enums::error::Error, models::stat::ServerStat, romm::romm_http::RommHttp};

pub struct ServerStatService {}

impl ServerStatService {
	pub async fn get_stats(app_handle: &AppHandle) -> Result<ServerStat, Error> {
		let response = RommHttp::get(app_handle, "/api/stats")?.send().await?;
		
		let stats = response.json::<ServerStat>().await?;
		
		Ok(stats)
	}
}