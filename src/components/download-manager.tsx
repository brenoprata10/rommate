import {CommonContext, CommonDispatchContext} from '@/context'
import {AnimatePresence, motion} from 'motion/react'
import {ActionEnum} from '@/reducer'
import {DownloadEvent, DownloadRomEvent} from '@/utils/downloader'
import {downloadRom} from '@/utils/http/rom'
import {Channel} from '@tauri-apps/api/core'
import {useCallback, useContext, useEffect, useMemo} from 'react'
import {Link} from 'react-router'
import GameCover from './ui/game-cover'
import useRom from '@/hooks/api/use-rom'
import {Progress} from './ui/progress'
import {useSidebar} from './ui/sidebar'
import clsx from 'clsx'
import bytes from 'bytes'
import {Button} from './ui/button'

const ONE_GB_IN_BYTES = 1073741824

export default function DownloadManager() {
	const dispatch = useContext(CommonDispatchContext)
	const {state} = useSidebar()
	const {downloads} = useContext(CommonContext)
	const completedDownloads = downloads
		.filter((download) => ['finished', 'cancelled'].includes(download.event))
		.reverse()
	const ongoingDownloads = downloads.filter((download) => ['progress', 'started'].includes(download.event))
	const pendingDownloads = useMemo(() => downloads.filter((download) => download.event === 'pending'), [downloads])

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
	const isStarted = event.event === 'started'
	const isProgress = event.event === 'progress'
	const isFinished = event.event === 'finished'
	const isCancelled = event.event === 'cancelled'

	const getProgress = useCallback(() => {
		if (isFinished) {
			return 100
		}

		return isProgress ? event.progress : 0
	}, [isFinished, event, isProgress])

	const getStatusLabel = useCallback(() => {
		if (isProgress) {
			return (
				<>
					<span>
						{event.downloaded >= ONE_GB_IN_BYTES
							? bytes(event.downloaded, {unit: 'GB'})
							: bytes(Math.trunc(event.downloaded), {decimalPlaces: 0})}
						/{rom?.fsSizeBytes && bytes(rom?.fsSizeBytes)}
					</span>

					<span>{Math.trunc(event.speed)}MB/s</span>
				</>
			)
		}
		return (
			<motion.span
				initial={{opacity: 0, translateY: 10}}
				animate={{opacity: 1, translateY: 0}}
				className='justify-self-end'
			>
				{isFinished && 'Finished'}
				{isStarted && 'Waiting'}
				{isCancelled && 'Cancelled'}
			</motion.span>
		)
	}, [event, isFinished, isStarted, isProgress, isCancelled, rom?.fsSizeBytes])

	if (!rom || isLoading || error) {
		return null
	}

	const progressBar = <Progress className={clsx(['flex w-full max-h-[0.25rem]'])} value={getProgress()} />
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
							{getStatusLabel()}
						</div>
						{progressBar}
					</>
				</div>
			</Link>
		</motion.div>
	)
}
