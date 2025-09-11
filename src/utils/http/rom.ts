import {Rom} from '@/models/rom'
import {TauriCommandKey, TauriCommandPayload, tauriInvoke} from '.'

export const getRoms = async (): Promise<TauriCommandPayload<Rom[]>> => {
	return tauriInvoke(TauriCommandKey.GET_ROMS)
}
