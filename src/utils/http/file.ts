import {TauriCommandKey, TauriCommandPayload, tauriInvoke} from '.'

export const isFileDownloaded = async (fileName: string): Promise<TauriCommandPayload<boolean>> => {
	return tauriInvoke(TauriCommandKey.IS_FILE_DOWNLOADED, {fileName})
}

export const openDownloadDirectory = async () => {
	return tauriInvoke(TauriCommandKey.OPEN_DOWNLOAD_DIRECTORY)
}
