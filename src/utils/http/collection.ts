import {Collection} from '@/models/collection'
import {TauriCommandKey, TauriCommandPayload, tauriInvoke} from '.'

export const getCollections = async (): Promise<TauriCommandPayload<Collection[]>> => {
	return tauriInvoke(TauriCommandKey.GET_COLLECTIONS)
}
