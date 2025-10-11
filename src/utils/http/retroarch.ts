import {TauriCommandKey, TauriCommandPayload, tauriInvoke} from '.'

export const playRetroarch = async (params: {romId: number}): Promise<TauriCommandPayload<null>> => {
	return tauriInvoke(TauriCommandKey.PLAY_RETROARCH_GAME, params)
}
