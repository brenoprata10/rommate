import {TauriCommandKey, TauriCommandPayload, tauriInvoke} from '.'

export const isFileDownloaded = async (
	fileName: string,
	platformSlug: string
): Promise<TauriCommandPayload<boolean>> => {
	return tauriInvoke(TauriCommandKey.IS_FILE_DOWNLOADED, {fileName, platformSlug})
}

export const openDownloadDirectory = async (platformSlug?: string) => {
	return tauriInvoke(TauriCommandKey.OPEN_DOWNLOAD_DIRECTORY, {platformSlug})
}
