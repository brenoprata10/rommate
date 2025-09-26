use std::time::Instant;

pub struct Downloader {}

impl Downloader {
    pub fn get_speed(downloaded: f64, elapsed_instant: Instant) -> f64 {
        let elapsed = elapsed_instant.elapsed().as_secs_f64();
        if elapsed > 0.0 {
            downloaded / elapsed / 1024.0 / 1024.0 // MB/s
        } else {
            0.0
        }
    }

    pub fn get_progress(downloaded: f64, content_length: f64) -> u32 {
        if content_length > 0.0 {
            (downloaded / content_length * 100.0) as u32
        } else {
            0
        }
    }

    pub fn get_downloaded(downloaded: f64) -> f64 {
        downloaded / 1024.0 / 1024.0
    }
}
