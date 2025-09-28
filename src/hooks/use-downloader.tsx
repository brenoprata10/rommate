import {CommonContext, CommonDispatchContext} from '@/context'
import {ActionEnum} from '@/reducer'
import {useCallback, useContext, useMemo} from 'react'

export default function useDownloader() {
	const dispatch = useContext(CommonDispatchContext)
	const {downloads} = useContext(CommonContext)
	const completedDownloads = useMemo(
		() => downloads.filter((download) => ['finished', 'cancelled'].includes(download.event)),
		[downloads]
	)
	const ongoingDownloads = useMemo(
		() => downloads.filter((download) => ['progress', 'started'].includes(download.event)),
		[downloads]
	)
	const pendingDownloads = useMemo(() => downloads.filter((download) => download.event === 'pending'), [downloads])

	const downloadRom = useCallback(
		(romId: number) => {
			dispatch({
				type: ActionEnum.ADD_ROM_DOWNLOAD_TO_QUEUE,
				payload: {romId: romId}
			})
		},
		[dispatch]
	)

	const getRomDownload = useCallback(
		(romId: number) => {
			return downloads.find((download) => download.romId === romId)
		},
		[downloads]
	)

	return {downloads, completedDownloads, ongoingDownloads, pendingDownloads, downloadRom, getRomDownload}
}
