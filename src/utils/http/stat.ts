import {ServerStat} from '@/models/stat'
import {TauriCommandKey, TauriCommandPayload, tauriInvoke} from '.'

export const getServerStats = async (): Promise<TauriCommandPayload<ServerStat>> => {
	return tauriInvoke(TauriCommandKey.GET_SERVER_STATS)
}
