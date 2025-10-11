import {RommPlatform} from '@/models/enums/platform'
import {RetroarchCore} from '@/models/enums/retroarch-core'

export const EMULATION_READY_PLATFORMS: RommPlatform[] = [RommPlatform.SNES]

export const isPlatformEmulationReady = (platform: RommPlatform) => {
	return EMULATION_READY_PLATFORMS.some((emulationPlatform) => emulationPlatform === platform)
}

export const coreConfig: Record<string, RetroarchCore[]> = {
	[RommPlatform.SNES]: [RetroarchCore.SNES9X, RetroarchCore.BSNES, RetroarchCore.BSNES_HD_BETA]
}
