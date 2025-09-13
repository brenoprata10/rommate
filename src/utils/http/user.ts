import {User} from '@/models/user'
import {TauriCommandKey, TauriCommandPayload, tauriInvoke} from '.'

export const getLoggedInUser = async (): Promise<TauriCommandPayload<User>> => {
	return tauriInvoke(TauriCommandKey.GET_LOGGED_IN_USER)
}
