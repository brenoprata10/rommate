import {Rom} from '@/models/rom'
import {TauriCommandKey, TauriCommandPayload, tauriInvoke} from '.'
import {User} from '@/models/user'

export const getRoms = async (): Promise<TauriCommandPayload<Rom[]>> => {
	return tauriInvoke(TauriCommandKey.GET_ROMS)
}

export const getLoggedInUser = async (): Promise<TauriCommandPayload<User>> => {
	return tauriInvoke(TauriCommandKey.GET_LOGGED_IN_USER)
}
