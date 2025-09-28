use std::error::Error as StdError;

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error(transparent)]
    Io(#[from] std::io::Error),
    #[error("Failed to load store: {0}")]
    Store(#[from] tauri_plugin_store::Error),
    #[error("Failed to fetch: {0}")]
    Reqwest(#[from] reqwest::Error),
    #[error("Romm URL is not set")]
    RommUrlNotSet(),
    #[error("Invalid Credentials. Please check your server URL and login credentials")]
    InvalidCredentials(),
    #[error("Internal Server Error: {0}")]
    InternalServer(String),
    #[error("Not Found: {0}")]
    NotFound(String),
    #[error("Cannot parse: {0}")]
    Serde(#[from] serde_json::Error),
    #[error("Download cancelled: {0}")]
    DownloadCancelled(String),
}

#[derive(serde::Serialize)]
#[serde(tag = "kind", content = "message")]
#[serde(rename_all = "camelCase")]
enum ErrorKind {
    Io(String),
    Store(String),
    Reqwest(String),
    RommUrlNotSet,
    InvalidCredentials(String),
    InternalServer(String),
    NotFound(String),
    Serde(String),
    DownloadCancelled(String),
}

/// Helper to build a detailed error message by chaining sources.
fn detailed_message(e: &dyn StdError) -> String {
    let mut msg = e.to_string();
    let mut current = e.source();
    while let Some(source) = current {
        msg.push_str(&format!("- {}", source));
        current = source.source();
    }
    msg
}

impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        let error_message = detailed_message(self);
        let error_kind = match self {
            Self::Io(_) => ErrorKind::Io(error_message),
            Self::Store(_) => ErrorKind::Store(error_message),
            Self::Reqwest(_) => ErrorKind::Reqwest(error_message),
            Self::RommUrlNotSet() => ErrorKind::RommUrlNotSet,
            Self::InvalidCredentials() => ErrorKind::InvalidCredentials(error_message),
            Self::NotFound(_) => ErrorKind::NotFound(error_message),
            Self::InternalServer(_) => ErrorKind::InternalServer(error_message),
            Self::Serde(_) => ErrorKind::Serde(error_message),
            Self::DownloadCancelled(_) => ErrorKind::DownloadCancelled(error_message),
        };
        error_kind.serialize(serializer)
    }
}
