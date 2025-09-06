use tauri::AppHandle;
use reqwest::{self, RequestBuilder};

use crate::{store::get_store_value, enums::error::Error};

pub fn get_romm_request(app_handle: &AppHandle, url: &str, method: reqwest::Method) -> Result<RequestBuilder, Error> {
    let stored_url = match get_store_value(app_handle, "romm_url") {
        Ok(Some(stored_url)) => Ok(stored_url),
        Ok(None) | Err(_) => Err(Error::RommUrlNotSet())
    }?;
    let romm_url = stored_url.as_str().unwrap();

    let romm_session = get_store_value(app_handle, "romm_session")?;

    let client = reqwest::Client::builder()
        .build()?;

    let mut request = client.request(method, format!("{}{}", romm_url, url));

    request = if let Some(romm_token) = romm_session {
        let header_value = format!("romm_session={}", romm_token.as_str().unwrap());
        request.header("Cookie", header_value)
    } else {
        request
    };

    pretty_print_request(&request);

    Ok(request)
}

fn pretty_print_request(builder: &RequestBuilder) {
    // Clone the request to avoid consuming the builder
    let request = builder.try_clone().ok_or("Failed to clone request").unwrap().build().unwrap();

    // Extract components
    let method = request.method();
    let url = request.url();
    let headers = request.headers();
    let body = request.body().and_then(|b| b.as_bytes()).unwrap_or(b"").to_vec();

    // Format the output
    println!("=== HTTP Request ===");
    println!("Method: {}", method);
    println!("URL: {}", url);
    println!("Headers:");
    for (name, value) in headers.iter() {
        println!("  {}: {}", name, value.to_str().unwrap_or("<invalid header value>"));
    }
    println!("Body: {}", String::from_utf8_lossy(&body));
    println!("===================");

}
