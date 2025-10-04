import {TauriCommandKey, TauriCommandPayload, tauriInvoke} from '.'

export const restartApp = async (): Promise<TauriCommandPayload<null>> => {
	return tauriInvoke(TauriCommandKey.RESTART_APP)
}
