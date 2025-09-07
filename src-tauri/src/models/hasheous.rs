use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct HasheousMetadata {
    tosec_match: bool,
    mame_arcade_match: bool,
    mame_mess_match: bool,
    nointro_match: bool,
    redump_match: bool,
    whdload_match: bool,
    ra_match: bool,
    fbneo_match: bool,
}
