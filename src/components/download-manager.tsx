import {CommonContext, CommonDispatchContext} from '@/context'
import {ActionEnum} from '@/reducer'
import {DownloadEvent} from '@/utils/downloader'
import {downloadRom} from '@/utils/http/rom'
import {Channel} from '@tauri-apps/api/core'
import {useContext, useEffect} from 'react'

export default function DownloadManager() {
	const dispatch = useContext(CommonDispatchContext)
	const {ongoingDownloads, pendingDownloads, finishedDownloads} = useContext(CommonContext)

	//console.log({ongoingDownloads, pendingDownloads, finishedDownloads})

	useEffect(() => {
		const startPendingDownloads = async () => {
			if (pendingDownloads.length === 0) {
				return
			}

			const promises = pendingDownloads.map((pendingDownload) => {
				const channel = new Channel<DownloadEvent>()
				channel.onmessage = (message: DownloadEvent) => {
					console.log(message)
					if (message.event === 'started') {
						dispatch({type: ActionEnum.START_DOWNLOAD, payload: {event: message}})
						return
					}

					if (message.event === 'finished') {
						dispatch({type: ActionEnum.FINISH_DOWNLOAD, payload: {event: message}})
						return
					}

					dispatch({type: ActionEnum.UPDATE_DOWNLOAD, payload: {event: message}})
				}
				return downloadRom(pendingDownload.romId, channel)
			})

			Promise.all(promises).catch((error) => console.error(error))
		}

		startPendingDownloads()
	}, [pendingDownloads, dispatch])

	return null
}
