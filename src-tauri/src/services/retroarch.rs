use std::fs::{File, create_dir_all};
use std::io::{Write};

use serde::{Deserialize, Serialize};
use tauri::AppHandle;
use tauri_plugin_shell::ShellExt;

use crate::services::file::FileService;
use crate::{dtos::save_sync::SaveSyncKind, enums::error::Error, services::{downloader::DownloaderService, rom::RomService, rom_save::RomSaveService}};

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[serde(rename_all = "lowercase")]
pub enum RetroarchCore {
    BsnesHdBeta,
    Bsnes,
    Citra,
    Dolphin,
    GenesisPlusGx,
    GenesisPlusGxWide,
    Pcsx,
    Melonds,
    Melondsds,
    Mgba,
    Mupen64plusNext,
    ParallelN64,
    Ppsspp,
    Snes9x,
    Vitaquake2Rogue,
    Vitaquake2Xatrix,
    Vitaquake2Zaero,
    Vitaquake2,
    Vitaquake3,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[serde(rename_all = "lowercase")]
pub enum RetroarchRunner {
    FlatpakLinux,
    NativeLinux,
    NativeWindows,
    NativeMacOs,
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct RetroarchService {
    config_path: &'static str,
    cores_path: &'static str,
    core_filename: &'static str,
    state_path: &'static str,
    save_path: &'static str,
    core: RetroarchCore,
    runner: RetroarchRunner,
    rom_path: String,
    rom_id: i32,
    rommate_config_path: String,
    rom_platform_path: String
}

impl RetroarchService {
    pub fn new(runner: RetroarchRunner, core: RetroarchCore, rom_path: String, rom_id: i32, rom_platform_path: String) -> Self {
        let rommate_config_path = format!(
            "{}/rommate-config.cfg", 
            DownloaderService::get_config_path().expect("Config path must be available")
        );
        
        match runner {
            RetroarchRunner::FlatpakLinux => RetroarchService {
                config_path: "$HOME/.var/app/org.libretro.RetroArch/config/retroarch",
                cores_path: "/cores",
                state_path: "/states",
                save_path: "/saves",
                rom_path,
                rommate_config_path,
                rom_id,
                runner,
                rom_platform_path,
                core_filename: match core {
                    RetroarchCore::BsnesHdBeta => "bsnes_hd_beta_libretro.so",
                    RetroarchCore::Bsnes => "bsnes_libretro.so",
                    RetroarchCore::Citra => "citra_libretro.so",
                    RetroarchCore::Dolphin => "dolphin_libretro.so",
                    RetroarchCore::GenesisPlusGx => "genesis_plus_gx_libretro.so",
                    RetroarchCore::GenesisPlusGxWide => "genesis_plus_gx_wide_libretro.so",
                    RetroarchCore::Pcsx => "pcsx_rearmed_libretro.so",
                    RetroarchCore::Melonds => "melonds_libretro.so",
                    RetroarchCore::Melondsds => "melondsds_libretro.so",
                    RetroarchCore::Mgba => "mgba_libretro.so",
                    RetroarchCore::Mupen64plusNext => "mupen64plus_next_libretro.so",
                    RetroarchCore::ParallelN64 => "parallel_n64_libretro.so",
                    RetroarchCore::Ppsspp => "ppsspp_libretro.so",
                    RetroarchCore::Snes9x => "snes9x_libretro.so",
                    RetroarchCore::Vitaquake2Rogue => "vitaquake2-rogue_libretro.so",
                    RetroarchCore::Vitaquake2Xatrix => "vitaquake2-xatrix_libretro.so",
                    RetroarchCore::Vitaquake2Zaero => "vitaquake2-zaero_libretro.so",
                    RetroarchCore::Vitaquake2 => "vitaquake2_libretro.so",
                    RetroarchCore::Vitaquake3 => "vitaquake3_libretro.so",
                },
                core,
            },
            RetroarchRunner::NativeLinux => RetroarchService {
                config_path: "$HOME/.config/retroarch",
                cores_path: "/cores",
                state_path: "/states",
                save_path: "/saves",
                rom_path,
                rommate_config_path,
                rom_id,
                runner,
                rom_platform_path,
                core_filename: match core {
                    RetroarchCore::BsnesHdBeta => "bsnes_hd_beta_libretro.so",
                    RetroarchCore::Bsnes => "bsnes_libretro.so",
                    RetroarchCore::Citra => "citra_libretro.so",
                    RetroarchCore::Dolphin => "dolphin_libretro.so",
                    RetroarchCore::GenesisPlusGx => "genesis_plus_gx_libretro.so",
                    RetroarchCore::GenesisPlusGxWide => "genesis_plus_gx_wide_libretro.so",
                    RetroarchCore::Pcsx => "pcsx_rearmed_libretro.so",
                    RetroarchCore::Melonds => "melonds_libretro.so",
                    RetroarchCore::Melondsds => "melondsds_libretro.so",
                    RetroarchCore::Mgba => "mgba_libretro.so",
                    RetroarchCore::Mupen64plusNext => "mupen64plus_next_libretro.so",
                    RetroarchCore::ParallelN64 => "parallel_n64_libretro.so",
                    RetroarchCore::Ppsspp => "ppsspp_libretro.so",
                    RetroarchCore::Snes9x => "snes9x_libretro.so",
                    RetroarchCore::Vitaquake2Rogue => "vitaquake2-rogue_libretro.so",
                    RetroarchCore::Vitaquake2Xatrix => "vitaquake2-xatrix_libretro.so",
                    RetroarchCore::Vitaquake2Zaero => "vitaquake2-zaero_libretro.so",
                    RetroarchCore::Vitaquake2 => "vitaquake2_libretro.so",
                    RetroarchCore::Vitaquake3 => "vitaquake3_libretro.so",
                },
                core,
            },
            RetroarchRunner::NativeWindows => RetroarchService {
                config_path: "C:\\RetroArch-Win64",
                cores_path: "\\cores",
                state_path: "\\states",
                save_path: "\\saves",
                rom_path,
                rommate_config_path,
                rom_id,
                runner,
                rom_platform_path,
                core_filename: match core {
                    RetroarchCore::BsnesHdBeta => "bsnes_hd_beta_libretro.dll",
                    RetroarchCore::Bsnes => "bsnes_libretro.dll",
                    RetroarchCore::Citra => "citra_libretro.dll",
                    RetroarchCore::Dolphin => "dolphin_libretro.dll",
                    RetroarchCore::GenesisPlusGx => "genesis_plus_gx_libretro.dll",
                    RetroarchCore::GenesisPlusGxWide => "genesis_plus_gx_wide_libretro.dll",
                    RetroarchCore::Pcsx => "pcsx_rearmed_libretro.dll",
                    RetroarchCore::Melonds => "melonds_libretro.dll",
                    RetroarchCore::Melondsds => "melondsds_libretro.dll",
                    RetroarchCore::Mgba => "mgba_libretro.dll",
                    RetroarchCore::Mupen64plusNext => "mupen64plus_next_libretro.dll",
                    RetroarchCore::ParallelN64 => "parallel_n64_libretro.dll",
                    RetroarchCore::Ppsspp => "ppsspp_libretro.dll",
                    RetroarchCore::Snes9x => "snes9x_libretro.dll",
                    RetroarchCore::Vitaquake2Rogue => "vitaquake2-rogue_libretro.dll",
                    RetroarchCore::Vitaquake2Xatrix => "vitaquake2-xatrix_libretro.dll",
                    RetroarchCore::Vitaquake2Zaero => "vitaquake2-zaero_libretro.dll",
                    RetroarchCore::Vitaquake2 => "vitaquake2_libretro.dll",
                    RetroarchCore::Vitaquake3 => "vitaquake3_libretro.dll",
                },
                core,
            },
            RetroarchRunner::NativeMacOs => RetroarchService {
                config_path: "$HOME/Library/Application Support/RetroArch",
                cores_path: "/cores",
                state_path: "/states",
                save_path: "/saves",
                rom_path,
                rom_id,
                rommate_config_path,
                runner,
                rom_platform_path,
                core_filename: match core {
                    RetroarchCore::BsnesHdBeta => "bsnes_hd_beta_libretro.dylib",
                    RetroarchCore::Bsnes => "bsnes_libretro.dylib",
                    RetroarchCore::Citra => "citra_libretro.dylib",
                    RetroarchCore::Dolphin => "dolphin_libretro.dylib",
                    RetroarchCore::GenesisPlusGx => "genesis_plus_gx_libretro.dylib",
                    RetroarchCore::GenesisPlusGxWide => "genesis_plus_gx_wide_libretro.dylib",
                    RetroarchCore::Pcsx => "pcsx_rearmed_libretro.dylib",
                    RetroarchCore::Melonds => "melonds_libretro.dylib",
                    RetroarchCore::Melondsds => "melondsds_libretro.dylib",
                    RetroarchCore::Mgba => "mgba_libretro.dylib",
                    RetroarchCore::Mupen64plusNext => "mupen64plus_next_libretro.dylib",
                    RetroarchCore::ParallelN64 => "parallel_n64_libretro.dylib",
                    RetroarchCore::Ppsspp => "ppsspp_libretro.dylib",
                    RetroarchCore::Snes9x => "snes9x_libretro.dylib",
                    RetroarchCore::Vitaquake2Rogue => "vitaquake2-rogue_libretro.dylib",
                    RetroarchCore::Vitaquake2Xatrix => "vitaquake2-xatrix_libretro.dylib",
                    RetroarchCore::Vitaquake2Zaero => "vitaquake2-zaero_libretro.dylib",
                    RetroarchCore::Vitaquake2 => "vitaquake2_libretro.dylib",
                    RetroarchCore::Vitaquake3 => "vitaquake3_libretro.dylib",
                },
                core,
            },
        }
    }
    
    async fn create_config_file(&self) -> Result<(), Error> {
        // Create directories path if it does not exist
        create_dir_all(DownloaderService::get_config_path()?)?;
        
        let mut file = File::create(&self.rommate_config_path)?;
        
        let platform_path = &self.rom_platform_path;
        let save_download_path = DownloaderService::get_rom_save_dir(platform_path)?;
        let state_download_path = DownloaderService::get_rom_state_dir(platform_path)?;
        
        file.write_all(
            format!("
                savefile_directory = \"{save_download_path}\"
                savestate_directory = \"{state_download_path}\"
                sort_savefiles_enable = \"false\"
                sort_savestates_enable = \"false\"
                savestate_thumbnail_enable = \"true\"
                savestate_auto_save = \"true\"
                autosave_interval = \"0\"
                video_screenshot_show_message = \"false\"
            ").as_bytes()
        )?;
        
        Ok(())
    }
    
    pub async fn upload_local_save_file(&self, app_handle: &AppHandle) -> Result<(), Error> {
        let rom = RomService::get_rom_by_id(app_handle, self.rom_id).await?;
        
        let local_save_file = FileService::open_by_stem(
            &rom.fs_name_no_ext,
            &DownloaderService::get_rom_save_dir(&self.rom_platform_path)?
        ).await?;
        
        let local_save_screenshot = FileService::open_by_stem(
            &rom.fs_name_no_ext,
            &DownloaderService::get_rom_state_dir(&self.rom_platform_path)?
        ).await.ok();
        
        RomSaveService::upload_save_file(
            app_handle, 
            self.rom_id, 
            local_save_file, 
            local_save_screenshot,
        ).await?;
        
        println!("uploaded successfully");
        
        Ok(())
    }

    pub async fn play(&self, app_handle: &AppHandle) -> Result<(), Error> {
        self.create_config_file().await?;
        
        create_dir_all(DownloaderService::get_rom_save_dir(&self.rom_platform_path)?)?;
        create_dir_all(DownloaderService::get_rom_state_dir(&self.rom_platform_path)?)?;
        
        match RomSaveService::check_save_sync(app_handle, self.rom_id).await?.kind {
            SaveSyncKind::MissingLocalFile => RomSaveService::download_most_recent_save_file(app_handle, self.rom_id).await?,
            _ => ()
        };
        
        let download_dir = DownloaderService::get_roms_download_path()?;
        let shell = app_handle.shell();
        let command = match self.runner {
            RetroarchRunner::FlatpakLinux => Ok(shell.command("flatpak").args([
                "run",
                "org.libretro.RetroArch",
                "--fullscreen",
                "--appendconfig",
                &self.rommate_config_path,
                "-L",
                self.core_filename,
                format!("{download_dir}{}", self.rom_path).as_str(),
            ])),
            RetroarchRunner::NativeWindows => Ok(shell
                .command(format!("{}\\retroarch.exe", self.config_path))
                .args([
                    "--fullscreen",
                    "--appendconfig",
                    &self.rommate_config_path,
                    "-L",
                    self.core_filename,
                    format!("{download_dir}{}", self.rom_path.replace("/", "\\")).as_str(),
                ])),
            RetroarchRunner::NativeMacOs => Ok(shell
                .command("/Applications/RetroArch.app/Contents/MacOS/RetroArch")
                .args([
                    "--fullscreen",
                    "--appendconfig",
                    &self.rommate_config_path,
                    "-L",
                    self.core_filename,
                    format!("{download_dir}{}", self.rom_path).as_str(),
                ])),
            _ => Err(Error::InternalServer("Runner not supported.".to_string())),
        }?;

        let output = match command.output().await {
            Ok(output) => Ok(output),
            Err(e) => Err(Error::InternalServer(e.to_string())),
        }?;

        println!(
            "{:?} - {:?}",
            String::from_utf8(output.stdout),
            String::from_utf8(output.stderr)
        );
        
        println!("Trying to upload save...");
        self.upload_local_save_file(app_handle).await?;

        Ok(())
    }
}
