use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct HasheousMetadata {
    tosec_match: Option<bool>,
    mame_arcade_match: Option<bool>,
    mame_mess_match: Option<bool>,
    nointro_match: Option<bool>,
    redump_match: Option<bool>,
    whdload_match: Option<bool>,
    ra_match: Option<bool>,
    fbneo_match: Option<bool>,
}
