import {RetroarchRunner} from '@/models/enums/retroarch-runner'
import {TauriCommandKey, TauriCommandPayload, tauriInvoke} from '.'
import {RetroarchCore} from '@/models/enums/retroarch-core'

export const playRetroarch = async (params: {
	core: RetroarchCore
	runner: RetroarchRunner
	romPath: string
}): Promise<TauriCommandPayload<null>> => {
	return tauriInvoke(TauriCommandKey.PLAY_RETROARCH_GAME, params)
}
