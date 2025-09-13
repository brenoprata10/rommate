import {invoke} from '@tauri-apps/api/core'

export type TauriCommandPayload<T> =
	| {
			success: true
			data: T
	  }
	| {success: false; error: string}

export enum TauriCommandKey {
	GET_ROMS = 'command_get_roms',
	GET_RECENTLY_PLAYED = 'command_get_recently_played',
	GET_RECENTLY_ADDED = 'command_get_recently_added',
	GET_LOGGED_IN_USER = 'command_get_logged_in_user'
}

export const tauriInvoke = async <T>(command: TauriCommandKey): Promise<TauriCommandPayload<T>> => {
	try {
		const data = (await invoke(command)) as T
		return {success: true, data}
	} catch (error) {
		const parsedError = error as {kind?: string; message: string}
		if (parsedError.kind) {
			return {success: false, error: `${parsedError.kind} - ${parsedError.message}`}
		}
		return {success: false, error: `Failed: ${JSON.stringify({parsedError})}`}
	}
}
