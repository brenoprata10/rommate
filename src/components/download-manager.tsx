import {CommonContext, CommonDispatchContext} from '@/context'
import {ActionEnum} from '@/reducer'
import {DownloadEvent} from '@/utils/downloader'
import {Channel, invoke} from '@tauri-apps/api/core'
import {useCallback, useContext, useEffect} from 'react'

export default function DownloadManager() {
	const dispatch = useContext(CommonDispatchContext)
	const {ongoingDownloads, pendingDownloads} = useContext(CommonContext)

	console.log({ongoingDownloads, pendingDownloads})

	const handleChannelMessage = useCallback(
		(message: DownloadEvent) => {
			console.log({message})
			if (message.event === 'started') {
				dispatch({type: ActionEnum.START_DOWNLOAD, payload: {event: message}})
			}
		},
		[dispatch]
	)

	useEffect(() => {
		const startPendingDownloads = async () => {
			if (pendingDownloads.length === 0) {
				return
			}

			for (const pendingDownload of pendingDownloads) {
				console.log('useeffect pending')
				const onEvent = new Channel<DownloadEvent>()
				onEvent.onmessage = handleChannelMessage
				await invoke('download', {
					url: pendingDownload.url,
					onEvent
				})
			}
		}

		startPendingDownloads()
	}, [pendingDownloads, handleChannelMessage])

	return null
}
