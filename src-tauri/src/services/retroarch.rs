pub enum RetroarchCore {
    BSNES,
}

pub enum RetroarchRunner {
    LinuxFlatpak,
}

pub struct RetroarchPlayerConfig {
    config_path: &'static str,
    cores_path: &'static str,
    core_filename: &'static str,
    state_path: &'static str,
    save_path: &'static str,
    rom_path: &'static str,
}

impl RetroarchPlayerConfig {
    fn new(config: RetroarchRunner, core: RetroarchCore) -> Self {
        match config {
            RetroarchRunner::LinuxFlatpak => RetroarchPlayerConfig {
                config_path: "$HOME/.var/app/org.libretro.RetroArch/config/retroarch",
                cores_path: "/cores",
                state_path: "/states",
                save_path: "/saves",
                rom_path: "",
                core_filename: match core {
                    RetroarchCore::BSNES => "bsnes_libretro.so",
                },
            },
        }
    }
}
