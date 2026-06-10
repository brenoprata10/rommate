import {SaveSync} from '@/models/rom-save'
import {TauriCommandKey, TauriCommandPayload, tauriInvoke} from '.'

export const checkSaveSync = async (romId: number): Promise<TauriCommandPayload<SaveSync>> => {
	return tauriInvoke(TauriCommandKey.CHECK_SAVE_SYNC, {romId})
}
