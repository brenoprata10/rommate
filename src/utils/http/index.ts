import {invoke, InvokeArgs} from '@tauri-apps/api/core'

export type TauriCommandPayload<T> =
	| {
			success: true
			data: T
	  }
	| {success: false; error: string}

export enum TauriCommandKey {
	GET_ROMS = 'command_get_roms',
	GET_ROMS_BY_ID = 'command_get_rom_by_id',
	GET_ROMS_BY_COLLECTION_ID = 'command_get_roms_by_collection_id',
	GET_ROMS_BY_PLATFORM_ID = 'command_get_roms_by_platform_id',
	GET_RECENTLY_PLAYED = 'command_get_recently_played',
	GET_RECENTLY_ADDED = 'command_get_recently_added',
	GET_LOGGED_IN_USER = 'command_get_logged_in_user',
	GET_PLATFORMS = 'command_get_platforms',
	GET_COLLECTIONS = 'command_get_collections',
	GET_ASSET = 'command_get_asset'
}

export const tauriInvoke = async <T>(
	command: TauriCommandKey,
	params?: InvokeArgs
): Promise<TauriCommandPayload<T>> => {
	try {
		const data = (await invoke(command, params)) as T
		return {success: true, data}
	} catch (error) {
		const parsedError = error as {kind?: string; message: string}
		if (parsedError.kind) {
			return {success: false, error: `${parsedError.kind} - ${parsedError.message}`}
		}
		return {success: false, error: `Failed: ${JSON.stringify({parsedError})}`}
	}
}
