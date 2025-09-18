import {TauriCommandKey, TauriCommandPayload, tauriInvoke} from '.'

export const getAsset = async (url: string, type: string): Promise<TauriCommandPayload<string>> => {
	const asset = await tauriInvoke(TauriCommandKey.GET_ASSET, {url})

	console.log(asset)
	if (!asset.success) {
		return asset
	}

	const blob = new Blob([new Uint8Array(asset.data as ArrayBuffer)], {type})
	return {success: true, data: URL.createObjectURL(blob)}
}
