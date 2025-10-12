import {RommPlatform} from '@/models/enums/platform'
import {RetroarchCore} from '@/models/enums/retroarch-core'

export const EMULATION_READY_PLATFORMS: RommPlatform[] = [
	RommPlatform.SNES,
	RommPlatform.GBA,
	RommPlatform.NGC,
	RommPlatform.N64,
	RommPlatform.NDS,
	RommPlatform._3DS,
	RommPlatform.PSP,
	RommPlatform.PS,
	RommPlatform.GENESIS_SLASH_MEGADRIVE
]

export const isPlatformEmulationReady = (platform: RommPlatform) => {
	return EMULATION_READY_PLATFORMS.some((emulationPlatform) => emulationPlatform === platform)
}

export const coreConfig: Record<string, RetroarchCore[]> = {
	[RommPlatform.SNES]: [RetroarchCore.SNES9X, RetroarchCore.BSNES, RetroarchCore.BSNES_HD_BETA],
	[RommPlatform.GBA]: [RetroarchCore.MGBA],
	[RommPlatform.NGC]: [RetroarchCore.DOLPHIN],
	[RommPlatform.GC]: [RetroarchCore.DOLPHIN],
	[RommPlatform.N64]: [RetroarchCore.MUPEN64PLUS_NEXT],
	[RommPlatform.NDS]: [RetroarchCore.MELONDS, RetroarchCore.MELONDSDS],
	[RommPlatform.GENESIS_SLASH_MEGADRIVE]: [RetroarchCore.GENESIS_PLUS_GX, RetroarchCore.GENESIS_PLUS_GX_WIDE],
	[RommPlatform.PSP]: [RetroarchCore.PPSSPP],
	[RommPlatform.PS]: [RetroarchCore.MEDNAFEN_PSX_HW],
	[RommPlatform._3DS]: [RetroarchCore.CITRA]
}
