import {CommonContext, CommonDispatchContext} from '@/context'
import {ActionEnum} from '@/reducer'
import {DownloadEvent} from '@/utils/downloader'
import {Channel, invoke} from '@tauri-apps/api/core'
import {useCallback, useContext, useEffect} from 'react'

export default function DownloadManager() {
	const dispatch = useContext(CommonDispatchContext)
	const {ongoingDownloads, pendingDownloads, finishedDownloads} = useContext(CommonContext)

	console.log({ongoingDownloads, pendingDownloads, finishedDownloads})

	const handleChannelMessage = useCallback(
		(message: DownloadEvent) => {
			console.log({message})
			if (message.event === 'started') {
				dispatch({type: ActionEnum.START_DOWNLOAD, payload: {event: message}})
				return
			}

			if (message.event === 'finished') {
				dispatch({type: ActionEnum.FINISH_DOWNLOAD, payload: {event: message}})
				return
			}

			dispatch({type: ActionEnum.UPDATE_DOWNLOAD, payload: {event: message}})
		},
		[dispatch]
	)

	useEffect(() => {
		const startPendingDownloads = async () => {
			console.log('start pending downloads')
			if (pendingDownloads.length === 0) {
				return
			}

			const promises = pendingDownloads.map((pendingDownload) => {
				console.log('useeffect pending', pendingDownload.romId)
				const onEvent = new Channel<DownloadEvent>()
				onEvent.onmessage = handleChannelMessage
				return invoke('download', {
					romId: pendingDownload.romId,
					onEvent
				})
			})

			await Promise.all(promises)
		}

		startPendingDownloads()
	}, [pendingDownloads, handleChannelMessage])

	return null
}
