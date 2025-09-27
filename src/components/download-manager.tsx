import {CommonContext, CommonDispatchContext} from '@/context'
import {motion} from 'motion/react'
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

export default function DownloadManager() {
	const dispatch = useContext(CommonDispatchContext)
	const {state} = useSidebar()
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
					//console.log(message)
					if (message.event === 'started') {
						dispatch({
							type: ActionEnum.START_ROM_DOWNLOAD,
							payload: {event: {...message, romId: pendingDownload.romId}}
						})
						return
					}

					if (message.event === 'finished') {
						dispatch({
							type: ActionEnum.FINISH_ROM_DOWNLOAD,
							payload: {event: {...message, romId: pendingDownload.romId}}
						})
						return
					}

					dispatch({type: ActionEnum.UPDATE_ROM_DOWNLOAD, payload: {event: {...message, romId: pendingDownload.romId}}})
				}
				return downloadRom(pendingDownload.id, pendingDownload.romId, channel)
			})

			Promise.all(promises).catch((error) => console.error(error))
		}

		startPendingDownloads()
	}, [pendingDownloads, dispatch])

	return (
		<div>
			{[...ongoingDownloads, ...finishedDownloads].map((download) => (
				<DownloadCard key={download.id} event={download} collapsed={state === 'collapsed'} />
			))}
			{/*<DownloadCard
				collapsed={state === 'collapsed'}
				event={{
					downloaded: 7.00369930267334,

					event: 'progress',

					id: '0c5d6209-deb5-4f86-ae46-a5b0e309de00',

					progress: 50,

					romId: 1479,

					speed: 46.423689922261765
				}}
			/>*/}
		</div>
	)
}

const DownloadCard = ({event, collapsed}: {event: DownloadRomEvent; collapsed?: boolean}) => {
	const {data: rom, isLoading, error} = useRom({id: event.romId})

	const getProgress = useCallback(() => {
		if (event.event === 'finished') {
			return 100
		}

		return event.event === 'progress' ? event.progress : 0
	}, [event])

	if (!rom || isLoading || error) {
		return null
	}

	console.log({event})

	return (
		<motion.div initial={{opacity: 0, translateX: -20}} animate={{opacity: 1, translateX: 0}}>
			<Link
				className={clsx(['flex gap-2 items-center w-full', collapsed ? 'flex-col py-3' : 'p-2'])}
				to={`/rom/${event.romId}`}
			>
				<GameCover
					id={event.romId}
					src={rom.pathCoverSmall}
					width={collapsed ? '60' : '42'}
					height={collapsed ? '80' : '56'}
				/>
				<div className='flex flex-col gap-1 grow'>
					{!collapsed && <span className='font-medium text-sm'>{rom.name}</span>}

					<>
						{!collapsed && (
							<div
								className={clsx([
									'w-full flex gap-1 text-xs text-neutral-400',
									event.event === 'progress' ? 'justify-between' : 'justify-end'
								])}
							>
								{event.event === 'progress' ? (
									<>
										<span>{bytes(event.downloaded, {unit: 'GB'})}</span>
										<span>{Math.trunc(event.speed)} MB/s</span>
									</>
								) : (
									<motion.span
										initial={{opacity: 0, translateY: 10}}
										animate={{opacity: 1, translateY: 0}}
										className='justify-self-end'
									>
										Finished
									</motion.span>
								)}
							</div>
						)}
						<Progress className={clsx(['flex w-full min-w-[2.2rem] max-h-[0.25rem]'])} value={getProgress()} />
					</>
				</div>
			</Link>
		</motion.div>
	)
}
