#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error(transparent)]
    Io(#[from] std::io::Error),
    #[error("Failed to load store: {0}")]
    StoreError(#[from] tauri_plugin_store::Error),
    #[error("Failed to fetch: {0}")]
    Reqwest(#[from] tauri_plugin_http::reqwest::Error),
    #[error("Failed: {0}")]
    GenericError(#[from] std::string::String),
}

#[derive(serde::Serialize)]
#[serde(tag = "kind", content = "message")]
#[serde(rename_all = "camelCase")]
enum ErrorKind {
    Io(String),
    StoreError(String),
    Reqwest(String),
    GenericError(String)
}

impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        let error_message = self.to_string();
        let error_kind = match self {
            Self::Io(_) => ErrorKind::Io(error_message),
            Self::StoreError(_) => ErrorKind::StoreError(error_message),
            Self::Reqwest(_) => ErrorKind::Reqwest(error_message),
            Self::GenericError(_) => ErrorKind::Reqwest(error_message),
        };
        error_kind.serialize(serializer)
    }
}
