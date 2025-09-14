import {Platform} from '@/models/platform'
import {TauriCommandKey, TauriCommandPayload, tauriInvoke} from '.'

export const getPlatforms = async (): Promise<TauriCommandPayload<Platform>> => {
	return tauriInvoke(TauriCommandKey.GET_PLATFORMS)
}
