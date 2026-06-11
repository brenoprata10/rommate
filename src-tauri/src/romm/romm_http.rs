use reqwest::{self, Method, RequestBuilder, multipart::Form};
use tauri::AppHandle;

use crate::{enums::error::Error, store::get_store_value};

pub struct RommHttp {}

impl RommHttp {
    pub fn request(
        app_handle: &AppHandle,
        url: &str,
        method: reqwest::Method,
    ) -> Result<RequestBuilder, Error> {
        let stored_url = match get_store_value(app_handle, "romm_url") {
            Ok(Some(stored_url)) => Ok(stored_url),
            Ok(None) | Err(_) => Err(Error::RommUrlNotSet()),
        }?;
        let romm_url = stored_url.as_str().unwrap();

        let romm_session = get_store_value(app_handle, "romm_session")?
            .ok_or(Error::InvalidCredentials())?;
        let romm_csrftoken = get_store_value(app_handle, "romm_csrftoken")?
            .ok_or(Error::InvalidCredentials())?;

        let client = reqwest::Client::builder().build()?;

        let mut request = client.request(method, format!("{}{}", romm_url, url));
        
        let cookie_value = format!(
            "romm_session={}; romm_csrftoken={}", 
            romm_session.as_str().unwrap(),
            romm_csrftoken.as_str().unwrap()
        );
        request = request.header("Cookie", cookie_value);
        request = request.header("x-csrftoken", romm_csrftoken.as_str().unwrap());

        //pretty_print_request(&request);

        Ok(request)
    }
    
    pub fn request_multipart(app_handle: &AppHandle, url: &str, method: reqwest::Method, form: Form) -> Result<RequestBuilder, Error> {
        let boundary = form.boundary();
        let request = RommHttp::request(app_handle, url, method)?
            .header(
                "Content-Type", 
                format!(
                    "multipart/form-data; boundary={}",
                    boundary
                )
            )
            .multipart(form);
        
        Ok(request)
    }

    pub fn get(app_handle: &AppHandle, url: &str) -> Result<RequestBuilder, Error> {
        RommHttp::request(app_handle, url, reqwest::Method::GET)
    }
    
    pub fn post_multipart(app_handle: &AppHandle, url: &str, form: Form) -> Result<RequestBuilder, Error> {
        RommHttp::request_multipart(app_handle, url, reqwest::Method::POST, form)
    }
}

fn pretty_print_request(builder: &RequestBuilder) {
    // Clone the request to avoid consuming the builder
    let request = builder
        .try_clone()
        .ok_or("Failed to clone request")
        .unwrap()
        .build()
        .unwrap();

    // Extract components
    let method = request.method();
    let url = request.url();
    let headers = request.headers();
    let body = request
        .body()
        .and_then(|b| b.as_bytes())
        .unwrap_or(b"")
        .to_vec();

    // Format the output
    println!("=== HTTP Request ===");
    println!("Method: {}", method);
    println!("URL: {}", url);
    println!("Headers:");
    for (name, value) in headers.iter() {
        println!(
            "  {}: {}",
            name,
            value.to_str().unwrap_or("<invalid header value>")
        );
    }
    println!("Body: {}", String::from_utf8_lossy(&body));
    println!("===================");
}
