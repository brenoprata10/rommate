import {DownloadStatus} from '@/components/download-manager'
import {platform} from '@tauri-apps/plugin-os'
import {Button} from '@/components/ui/button'
import GameCover from '@/components/ui/game-cover'
import Heading from '@/components/ui/heading'
import {Progress} from '@/components/ui/progress'
import useDownloader from '@/hooks/use-downloader'
import {Rom} from '@/models/rom'
import {cancelDownload} from '@/utils/http/downloader'
import clsx from 'clsx'
import {Ban, FolderOpen, Play, PlayIcon} from 'lucide-react'
import {motion} from 'motion/react'
import React, {ReactNode, useCallback, useEffect, useMemo, useState} from 'react'
import {isFileDownloaded, openDownloadDirectory} from '@/utils/http/file'
import {playRetroarch} from '@/utils/http/retroarch'
import {coreConfig, isPlatformEmulationReady, runnerConfig} from '@/utils/retroarch'
import useCheckSaveSync from '@/hooks/api/use-rom-check-save-sync'
import {SaveSyncKind} from '@/models/rom-save'
import useDownloadMostRecentSaveFile from '@/hooks/api/use-rom-download-most-recent-save-file'
import SaveSyncActions from '@/views/home/components/save-sync-actions'
import useUploadLocalSaveFile from '@/hooks/api/use-rom-upload-local-save-file'

function ContinuePlayingRom({
	rom,
	className,
	hideTitle,
	onUpdateRom
}: {
	rom: Rom
	className?: string
	hideTitle?: boolean
	onUpdateRom?: () => Promise<void>
}) {
	const romURL = `/rom/${rom.id}`
	const isEmulationReady = isPlatformEmulationReady(rom.platformFsSlug)
	const [isDownloaded, setIsDownloaded] = useState(false)
	const {downloadRom, getRomDownload} = useDownloader()
	const {
		data: saveSyncData,
		refetch: refetchSaveSyncData,
		isRefetching: isRefetchingSaveSyncData
	} = useCheckSaveSync({
		romId: rom.id,
		enabled: isEmulationReady
	})
	const {mutateAsync: downloadMostRecentSaveFile, isPending: isDownloadingSaveFile} = useDownloadMostRecentSaveFile({
		romId: rom.id
	})
	const {mutateAsync: uploadLocalSaveFile, isPending: isUploadingLocalSaveFile} = useUploadLocalSaveFile({
		romId: rom.id
	})
	const romDownload = useMemo(() => getRomDownload(rom.id), [rom.id, getRomDownload])
	const isDownloadFinished = romDownload?.event === 'cancelled' || romDownload?.event === 'finished'
	const romCore = coreConfig[rom.platformFsSlug]?.[0]

	const play = useCallback(async () => {
		const runner = runnerConfig[platform()] ?? null

		if (!runner) {
			return
		}

		if (saveSyncData?.kind === SaveSyncKind.CONFLICT) {
			return
		}
		await playRetroarch({
			core: romCore,
			runner,
			romPath: `/${rom.platformFsSlug}/${rom.fsName}`,
			romId: rom.id,
			platformPath: rom.platformFsSlug
		})
		refetchSaveSyncData()
		onUpdateRom?.()
	}, [rom.platformFsSlug, rom.fsName, rom.id, saveSyncData, romCore, refetchSaveSyncData, onUpdateRom])

	const checkFileDownloaded = useCallback(async () => {
		const downloaded = await isFileDownloaded(rom.fsName, rom.platformFsSlug)
		if (!downloaded.success) {
			return
		}
		setIsDownloaded(downloaded.data)
	}, [rom.fsName, rom.platformFsSlug])

	useEffect(() => {
		if (romDownload?.event === 'finished') {
			setIsDownloaded(true)
			return
		}
		checkFileDownloaded()
	}, [checkFileDownloaded, romDownload?.event])

	const startRomDownload = useCallback(() => {
		downloadRom(rom.id)
	}, [rom, downloadRom])

	const cancelRomDownload = useCallback(async () => {
		if (!romDownload?.id) {
			return
		}
		await cancelDownload(romDownload.id)
		setIsDownloaded(false)
	}, [romDownload])

	const openFolderPath = useCallback(async () => {
		openDownloadDirectory(rom.platformFsSlug)
	}, [rom.platformFsSlug])

	const getProgress = useCallback(() => {
		if (romDownload?.event === 'finished') {
			return 100
		}

		return romDownload?.event === 'progress' ? romDownload.progress : 0
	}, [romDownload])

	const onDownloadCloudFile = useCallback(async () => {
		await downloadMostRecentSaveFile()
		await refetchSaveSyncData()
		onUpdateRom?.()
	}, [downloadMostRecentSaveFile, refetchSaveSyncData, onUpdateRom])

	const onUploadLocalFile = useCallback(async () => {
		await uploadLocalSaveFile()
		await refetchSaveSyncData()
		onUpdateRom?.()
	}, [refetchSaveSyncData, uploadLocalSaveFile, onUpdateRom])

	const getCtaButton = useCallback(() => {
		const isReadyToPlay =
			isDownloaded && isEmulationReady && ['linux', 'windows', 'macos'].some((os) => os === platform())

		if (isReadyToPlay) {
			return (
				<CtaButton disabled={saveSyncData?.kind === SaveSyncKind.CONFLICT} onClick={play}>
					<Play /> Play
				</CtaButton>
			)
		}
		if (isDownloaded) {
			return (
				<CtaButton onClick={openFolderPath}>
					<FolderOpen /> Open file path
				</CtaButton>
			)
		}
		return (
			<CtaButton onClick={startRomDownload}>
				<PlayIcon /> {isEmulationReady ? 'Install' : 'Download'}
			</CtaButton>
		)
	}, [isDownloaded, openFolderPath, play, startRomDownload, isEmulationReady, saveSyncData])

	return (
		<div className={clsx(['grid grid-cols-[14.8rem_16.812rem] max-w-[31.688rem] w-full', className])}>
			<GameCover src={rom.pathCoverLarge} id={rom.id} width='237' height='316' />
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
				<div className='flex flex-col gap-4'>
					{isEmulationReady && (
						<div className='flex flex-col gap-1'>
							<RomDetails title={'Runner'} content={'Retroarch'} />
							<RomDetails title={'Core'} content={romCore} />
							{saveSyncData && saveSyncData.kind !== SaveSyncKind.MISSING_CLOUD_FILE && (
								<RomDetails
									title='Save Sync'
									content={
										<SaveSyncActions
											saveSync={saveSyncData}
											isSyncingSave={isDownloadingSaveFile || isRefetchingSaveSyncData || isUploadingLocalSaveFile}
											onUploadLocalFile={onUploadLocalFile}
											onDownloadCloudFile={onDownloadCloudFile}
										/>
									}
								/>
							)}
						</div>
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
						getCtaButton()
					)}
				</div>
			</div>
		</div>
	)
}

const CtaButton = ({
	disabled,
	onClick,
	children
}: {
	disabled?: boolean
	onClick: () => void
	children: React.ReactNode
}) => {
	return (
		<Button
			disabled={disabled}
			onClick={onClick}
			className={`
				bg-neutral-900
				text-white 
				border 
				border-neutral-700
				hover:bg-neutral-800
				cursor-pointer
			`}
		>
			{children}
		</Button>
	)
}

const RomDetails = ({title, content}: {title: string; content: ReactNode | string}) => {
	return (
		<div className='flex justify-between'>
			<span className='text-neutral-300 font-medium'>{title}</span>
			<span className='text-neutral-400 font-medium'>{content}</span>
		</div>
	)
}

export default React.memo(ContinuePlayingRom)
