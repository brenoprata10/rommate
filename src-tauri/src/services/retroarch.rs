use tokio::{fs::File, io::AsyncReadExt};

use serde::{Deserialize, Serialize};
use tauri::AppHandle;
use tauri_plugin_shell::ShellExt;

use crate::{enums::error::Error, romm::romm_http::RommHttp, services::{downloader::DownloaderService, file::FileService, rom_save::RomSaveService}};

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[serde(rename_all = "lowercase")]
pub enum RetroarchCore {
    BsnesHdBeta,
    Bsnes,
    Citra,
    Dolphin,
    GenesisPlusGx,
    GenesisPlusGxWide,
    MednafenPsxHw,
    Melonds,
    Melondsds,
    Mgba,
    Mupen64plusNext,
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
    rom_id: i32
}

impl RetroarchService {
    pub fn new(runner: RetroarchRunner, core: RetroarchCore, rom_path: String, rom_id: i32) -> Self {
        match runner {
            RetroarchRunner::FlatpakLinux => RetroarchService {
                config_path: "$HOME/.var/app/org.libretro.RetroArch/config/retroarch",
                cores_path: "/cores",
                state_path: "/states",
                save_path: "/saves",
                rom_path,
                rom_id,
                runner,
                core_filename: match core {
                    RetroarchCore::BsnesHdBeta => "bsnes_hd_beta_libretro.so",
                    RetroarchCore::Bsnes => "bsnes_libretro.so",
                    RetroarchCore::Citra => "citra_libretro.so",
                    RetroarchCore::Dolphin => "dolphin_libretro.so",
                    RetroarchCore::GenesisPlusGx => "genesis_plus_gx_libretro.so",
                    RetroarchCore::GenesisPlusGxWide => "genesis_plus_gx_wide_libretro.so",
                    RetroarchCore::MednafenPsxHw => "mednafen_psx_hw_libretro.so",
                    RetroarchCore::Melonds => "melonds_libretro.so",
                    RetroarchCore::Melondsds => "melondsds_libretro.so",
                    RetroarchCore::Mgba => "mgba_libretro.so",
                    RetroarchCore::Mupen64plusNext => "mupen64plus_next_libretro.so",
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
                rom_id,
                runner,
                core_filename: match core {
                    RetroarchCore::BsnesHdBeta => "bsnes_hd_beta_libretro.so",
                    RetroarchCore::Bsnes => "bsnes_libretro.so",
                    RetroarchCore::Citra => "citra_libretro.so",
                    RetroarchCore::Dolphin => "dolphin_libretro.so",
                    RetroarchCore::GenesisPlusGx => "genesis_plus_gx_libretro.so",
                    RetroarchCore::GenesisPlusGxWide => "genesis_plus_gx_wide_libretro.so",
                    RetroarchCore::MednafenPsxHw => "mednafen_psx_hw_libretro.so",
                    RetroarchCore::Melonds => "melonds_libretro.so",
                    RetroarchCore::Melondsds => "melondsds_libretro.so",
                    RetroarchCore::Mgba => "mgba_libretro.so",
                    RetroarchCore::Mupen64plusNext => "mupen64plus_next_libretro.so",
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
                rom_id,
                runner,
                core_filename: match core {
                    RetroarchCore::BsnesHdBeta => "bsnes_hd_beta_libretro.dll",
                    RetroarchCore::Bsnes => "bsnes_libretro.dll",
                    RetroarchCore::Citra => "citra_libretro.dll",
                    RetroarchCore::Dolphin => "dolphin_libretro.dll",
                    RetroarchCore::GenesisPlusGx => "genesis_plus_gx_libretro.dll",
                    RetroarchCore::GenesisPlusGxWide => "genesis_plus_gx_wide_libretro.dll",
                    RetroarchCore::MednafenPsxHw => "mednafen_psx_hw_libretro.dll",
                    RetroarchCore::Melonds => "melonds_libretro.dll",
                    RetroarchCore::Melondsds => "melondsds_libretro.dll",
                    RetroarchCore::Mgba => "mgba_libretro.dll",
                    RetroarchCore::Mupen64plusNext => "mupen64plus_next_libretro.dll",
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
                runner,
                core_filename: match core {
                    RetroarchCore::BsnesHdBeta => "bsnes_hd_beta_libretro.dylib",
                    RetroarchCore::Bsnes => "bsnes_libretro.dylib",
                    RetroarchCore::Citra => "citra_libretro.dylib",
                    RetroarchCore::Dolphin => "dolphin_libretro.dylib",
                    RetroarchCore::GenesisPlusGx => "genesis_plus_gx_libretro.dylib",
                    RetroarchCore::GenesisPlusGxWide => "genesis_plus_gx_wide_libretro.dylib",
                    RetroarchCore::MednafenPsxHw => "mednafen_psx_hw_libretro.dylib",
                    RetroarchCore::Melonds => "melonds_libretro.dylib",
                    RetroarchCore::Melondsds => "melondsds_libretro.dylib",
                    RetroarchCore::Mgba => "mgba_libretro.dylib",
                    RetroarchCore::Mupen64plusNext => "mupen64plus_next_libretro.dylib",
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

    pub async fn play(&self, app_handle: &AppHandle) -> Result<(), Error> {
        //RomService::download_most_recent_save_file(app_handle, self.rom_id).await?;
        
        // Verify if current downloaded files is the same the one on the server
        // 
        // if they are not the same, ask the user what which one he wants to use
        // if choosing local file:
        // - Boot the game normally
        // else:
        // - download and replace local save file
        // Move this to a separate place "sync_save_files"?
        let latest_save = RomSaveService::get_most_recent_rom_save(app_handle, self.rom_id).await?;
        let file_url = format!("/api/saves/{}/content", latest_save.id);
        
        let uploaded_save = DownloaderService::temporary_file(
            RommHttp::get(app_handle, &file_url)?
        ).await?;
        
        // We cannot use srm here
        let mut local_save = File::open(
            format!("{}{}.srm", DownloaderService::get_saves_download_path()?, self.rom_path)
        ).await?;
        
        let mut buf = Vec::new();
        local_save.read_to_end(&mut buf).await?;
        
        
        let are_equal = FileService::is_equal(uploaded_save.into(), local_save).await?;
        
        println!("{}", are_equal);
        
        
        
        let download_dir = DownloaderService::get_roms_download_path()?;
        let shell = app_handle.shell();
        let command = match self.runner {
            RetroarchRunner::FlatpakLinux => Ok(shell.command("flatpak").args([
                "run",
                "org.libretro.RetroArch",
                "--fullscreen",
                "-L",
                self.core_filename,
                format!("{download_dir}{}", self.rom_path).as_str(),
            ])),
            RetroarchRunner::NativeWindows => Ok(shell
                .command(format!("{}\\retroarch.exe", self.config_path))
                .args([
                    "--fullscreen",
                    "-L",
                    self.core_filename,
                    format!("{download_dir}{}", self.rom_path.replace("/", "\\")).as_str(),
                ])),
            RetroarchRunner::NativeMacOs => Ok(shell
                .command("/Applications/RetroArch.app/Contents/MacOS/RetroArch")
                .args([
                    "--fullscreen",
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

        Ok(())
    }
}
