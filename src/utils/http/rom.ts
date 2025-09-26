import {Rom} from '@/models/rom'
import {TauriCommandKey, TauriCommandPayload, tauriInvoke} from '.'
import {RomCollection} from '@/models/collection'
import {Channel} from '@tauri-apps/api/core'
import {DownloadEvent} from '@/utils/downloader'

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

export const getRomsByCollectionId = async (
	id: number | string,
	collectionType: RomCollection
): Promise<TauriCommandPayload<{items: Rom[]}>> => {
	return tauriInvoke(TauriCommandKey.GET_ROMS_BY_COLLECTION_ID, {id: id.toString(), collectionType})
}

export const getRomsByPlatformId = async (id: number | string): Promise<TauriCommandPayload<{items: Rom[]}>> => {
	return tauriInvoke(TauriCommandKey.GET_ROMS_BY_PLATFORM_ID, {id: id.toString()})
}

export const downloadRom = async (romId: number, channel: Channel<DownloadEvent>) => {
	return tauriInvoke(TauriCommandKey.DOWNLOAD_ROM, {romId, onEvent: channel})
}
