import {CommonDispatchContext} from '@/context'
import {AnimatePresence, motion} from 'motion/react'
import {ActionEnum} from '@/reducer'
import {DownloadEvent, DownloadRomEvent} from '@/utils/downloader'
import {downloadRom} from '@/utils/http/rom'
import {Channel} from '@tauri-apps/api/core'
import {useCallback, useContext, useEffect} from 'react'
import {Link} from 'react-router'
import GameCover from './ui/game-cover'
import useRom from '@/hooks/api/use-rom'
import {Progress} from './ui/progress'
import {useSidebar} from './ui/sidebar'
import clsx from 'clsx'
import bytes from 'bytes'
import {Button} from './ui/button'
import useDownloader from '@/hooks/use-downloader'

const ONE_GB_IN_BYTES = 1073741824

export default function DownloadManager() {
	const dispatch = useContext(CommonDispatchContext)
	const {state} = useSidebar()
	const {pendingDownloads, ongoingDownloads, completedDownloads} = useDownloader()

	useEffect(() => {
		const startPendingDownloads = async () => {
			if (pendingDownloads.length === 0) {
				return
			}

			const promises = pendingDownloads.map((pendingDownload) => {
				const channel = new Channel<DownloadEvent>()
				channel.onmessage = (message: DownloadEvent) => {
					dispatch({type: ActionEnum.UPDATE_ROM_DOWNLOAD, payload: {event: {...message, romId: pendingDownload.romId}}})
				}
				return downloadRom(pendingDownload.id, pendingDownload.romId, channel)
			})

			Promise.all(promises).catch((error) => console.error(error))
		}

		startPendingDownloads()
	}, [pendingDownloads, dispatch])

	const clearFinishedDownloads = useCallback(() => {
		dispatch({type: ActionEnum.CLEAR_FINISHED_DOWNLOADS})
	}, [dispatch])

	return (
		<div className='max-h-[30vh] scrollbar-hidden overflow-hidden overflow-y-auto gap-2 flex flex-col'>
			{completedDownloads.length > 0 && state === 'expanded' && (
				<motion.div
					initial={{opacity: 0, height: 0}}
					animate={{opacity: 1, height: 'auto'}}
					className='flex justify-end'
				>
					<Button className='text-xs py-1 px-2 cursor-pointer' variant={'outline'} onClick={clearFinishedDownloads}>
						Clear Finished
					</Button>
				</motion.div>
			)}
			<AnimatePresence>
				{[...ongoingDownloads, ...completedDownloads].map((download) => (
					<DownloadCard key={download.id} event={download} collapsed={state === 'collapsed'} />
				))}
			</AnimatePresence>
		</div>
	)
}

const DownloadCard = ({event, collapsed}: {event: DownloadRomEvent; collapsed?: boolean}) => {
	const {data: rom, isLoading, error} = useRom({id: event.romId})
	const isProgress = event.event === 'progress'
	const isFinished = event.event === 'finished'

	const getProgress = useCallback(() => {
		if (isFinished) {
			return 100
		}

		return isProgress ? event.progress : 0
	}, [isFinished, event, isProgress])

	if (!rom || isLoading || error) {
		return null
	}

	const progressBar = <Progress className={clsx(['w-full h-[0.25rem]'])} value={getProgress()} />
	const gameCover = <GameCover id={event.romId} src={rom.pathCoverSmall} width={'60'} height={'80'} />
	const wrapperAnimations = {
		initial: {opacity: 0, height: 0},
		animate: {opacity: 1, height: 'auto'},
		exit: {opacity: 0, height: 0}
	}
	const romURL = `/rom/${event.romId}`

	if (collapsed) {
		return (
			<motion.div {...wrapperAnimations}>
				<Link className='flex gap-2 w-full flex-col py-3' to={romURL}>
					<div className='max-w-[1.938rem]'>{gameCover}</div>
					<div className='flex flex-col gap-2 grow'>{progressBar}</div>
				</Link>
			</motion.div>
		)
	}

	return (
		<motion.div {...wrapperAnimations} className='transition-colors hover:bg-neutral-800 rounded-md'>
			<Link className='flex gap-2 w-full p-2 item-start' to={romURL}>
				<div className='max-w-[2.925rem] min-w-[2.938rem]'>{gameCover}</div>
				<div className='flex flex-col gap-2 grow'>
					<motion.span
						initial={{opacity: 0, translateY: 10}}
						animate={{opacity: 1, translateY: 0}}
						className='font-medium text-sm max-w-[8.75rem] overflow-hidden text-ellipsis whitespace-nowrap'
					>
						{rom.name}
					</motion.span>

					<>
						<div
							className={clsx([
								'w-full flex gap-1 text-xs text-neutral-400',
								event.event === 'progress' ? 'justify-between' : 'justify-end'
							])}
						>
							<DownloadStatus download={event} romSizeBytes={rom.fsSizeBytes} />
						</div>
						{progressBar}
					</>
				</div>
			</Link>
		</motion.div>
	)
}

export const DownloadStatus = ({download, romSizeBytes}: {download: DownloadRomEvent; romSizeBytes: number}) => {
	const isProgress = download.event === 'progress'

	if (isProgress) {
		return (
			<>
				<span>
					{download.downloaded >= ONE_GB_IN_BYTES
						? bytes(download.downloaded, {unit: 'GB'})
						: bytes(Math.trunc(download.downloaded), {decimalPlaces: 0})}
					/{bytes(romSizeBytes)}
				</span>

				<span>{Math.trunc(download.speed)}MB/s</span>
			</>
		)
	}
	return (
		<motion.span
			initial={{opacity: 0, translateY: 10}}
			animate={{opacity: 1, translateY: 0}}
			className='justify-self-end capitalize'
		>
			{download.event}
		</motion.span>
	)
}
