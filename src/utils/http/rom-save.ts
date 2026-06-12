import {SaveSync} from '@/models/rom-save'
import {TauriCommandKey, TauriCommandPayload, tauriInvoke} from '.'

export const checkSaveSync = async (romId: number): Promise<TauriCommandPayload<SaveSync>> => {
	return tauriInvoke(TauriCommandKey.CHECK_SAVE_SYNC, {romId})
}

export const downloadMostRecentSaveFile = async (romId: number): Promise<TauriCommandPayload<SaveSync>> => {
	return tauriInvoke(TauriCommandKey.DOWNLOAD_MOST_RECENT_SAVE_FILE, {romId})
}
