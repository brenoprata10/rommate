import {TauriCommandKey, tauriInvoke} from '.'

export const cancelDownload = async (id: string) => {
	return tauriInvoke(TauriCommandKey.CANCEL_DOWNLOAD, {id})
}
