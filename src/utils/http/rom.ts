import {Rom} from '@/models/rom'
import {TauriCommandKey, TauriCommandPayload, tauriInvoke} from '.'

export const getRoms = async (): Promise<TauriCommandPayload<{items: Rom[]}>> => {
	return tauriInvoke(TauriCommandKey.GET_ROMS)
}

export const getRecentlyPlayed = async (): Promise<TauriCommandPayload<{items: Rom[]}>> => {
	return tauriInvoke(TauriCommandKey.GET_RECENTLY_PLAYED)
}

export const getRecentlyAdded = async (): Promise<TauriCommandPayload<{items: Rom[]}>> => {
	return tauriInvoke(TauriCommandKey.GET_RECENTLY_ADDED)
}

export const getRomById = async (id: number): Promise<TauriCommandPayload<Rom>> => {
	return tauriInvoke(TauriCommandKey.GET_ROMS_BY_ID, {id})
}
