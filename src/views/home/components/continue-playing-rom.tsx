import {DownloadStatus} from '@/components/download-manager'
import {Button} from '@/components/ui/button'
import GameCover from '@/components/ui/game-cover'
import Heading from '@/components/ui/heading'
import {Progress} from '@/components/ui/progress'
import useDownloader from '@/hooks/use-downloader'
import {Rom} from '@/models/rom'
import {cancelDownload} from '@/utils/http/downloader'
import clsx from 'clsx'
import {Ban, PlayIcon} from 'lucide-react'
import {motion} from 'motion/react'
import React, {useCallback, useMemo} from 'react'

function ContinuePlayingRom({
	rom,
	className,
	hideTitle,
	onHover
}: {
	rom: Rom
	className?: string
	hideTitle?: boolean
	onHover?: (romId: number) => void
}) {
	const romURL = `/rom/${rom.id}`
	const {downloadRom, getRomDownload} = useDownloader()
	const romDownload = useMemo(() => getRomDownload(rom.id), [rom.id, getRomDownload])
	const isDownloadFinished = romDownload?.event === 'cancelled' || romDownload?.event === 'finished'

	const handleHover = useCallback(() => {
		onHover?.(rom.id)
	}, [onHover, rom.id])

	const startRomDownload = useCallback(() => {
		downloadRom(rom.id)
	}, [rom, downloadRom])

	const cancelRomDownload = useCallback(() => {
		if (!romDownload?.id) {
			return
		}
		cancelDownload(romDownload.id)
	}, [romDownload])

	const getProgress = useCallback(() => {
		if (romDownload?.event === 'finished') {
			return 100
		}

		return romDownload?.event === 'progress' ? romDownload.progress : 0
	}, [romDownload])

	return (
		<div className={clsx(['grid grid-cols-[14.8rem_16.812rem] max-w-[31.688rem] w-full', className])}>
			<GameCover src={rom.pathCoverLarge} id={rom.id} width='237' height='316' onHover={handleHover} />
			<div className='flex flex-col pt-[1.375rem] px-[1.375rem] justify-between'>
				{hideTitle ? (
					<div>&nbsp;</div>
				) : (
					<a href={romURL}>
						<Heading variant={rom.name.length > 21 ? 'h3' : 'h2'} className='text-neutral-200'>
							{rom.name}
						</Heading>
					</a>
				)}
				{romDownload && !isDownloadFinished ? (
					<motion.div
						className='flex flex-col gap-1 mb-2'
						initial={{opacity: 0, height: 0}}
						animate={{opacity: 1, height: 'auto'}}
					>
						<Heading variant={'h5'}>Downloading...</Heading>
						<div className='flex gap-2'>
							<div className='flex gap-2 w-full flex-col'>
								<div
									className={clsx([
										'w-full flex gap-2 text-sm text-neutral-400 items-end',
										romDownload.event === 'progress' ? 'justify-between' : 'justify-end'
									])}
								>
									<DownloadStatus download={romDownload} romSizeBytes={rom.fsSizeBytes} />
								</div>
								<Progress className={clsx(['flex w-full max-h-[0.25rem]'])} value={getProgress()} />
							</div>
							<Button variant={'destructive'} onClick={cancelRomDownload}>
								<Ban />
							</Button>
						</div>
					</motion.div>
				) : (
					<Button
						onClick={startRomDownload}
						className={`
						bg-neutral-900
						text-white 
						border 
						border-neutral-700
						hover:bg-neutral-800
						cursor-pointer
					`}
					>
						<PlayIcon /> Install
					</Button>
				)}
			</div>
		</div>
	)
}

export default React.memo(ContinuePlayingRom)
