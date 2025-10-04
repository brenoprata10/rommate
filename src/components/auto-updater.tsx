import {useState} from 'react'
import {useMount} from 'react-use'
import {check} from '@tauri-apps/plugin-updater'
import Background from './ui/background'
import Heading from './ui/heading'
import {restartApp} from '@/utils/http/process'
import bytes from 'bytes'
import {Progress} from './ui/progress'
import {motion} from 'motion/react'

type AutoUpdaterPayload = {
	status: AutoUpdaterMessage
	progressBarValue?: number
	text?: string
}

enum AutoUpdaterMessage {
	CHECKING_UPDATE = 'Checking for update...',
	UPDATE_AVAILABLE = 'Update available...',
	UPDATE_NOT_AVAILABLE = 'Update not available...',
	ERROR = 'Error in auto-updater',
	DOWNLOAD_IN_PROGRESS = 'Downloading update',
	UPDATE_DOWNLOADED = 'Update downloaded. Installing...',
	UPDATE_INSTALLED = 'Update Installed'
}

export default function AutoUpdater() {
	const [updateStatus, setUpdateStatus] = useState<AutoUpdaterPayload>({status: AutoUpdaterMessage.CHECKING_UPDATE})

	useMount(async () => {
		try {
			const update = await check()
			if (update) {
				console.log(`found update ${update.version} from ${update.date} with notes ${update.body}`)
				let downloaded = 0
				let contentLength = 0
				// alternatively we could also call update.download() and update.install() separately
				await update.downloadAndInstall((event) => {
					switch (event.event) {
						case 'Started':
							contentLength = event.data.contentLength ?? 0
							setUpdateStatus({status: AutoUpdaterMessage.UPDATE_AVAILABLE})
							break
						case 'Progress':
							downloaded += event.data.chunkLength
							setUpdateStatus({
								progressBarValue: (downloaded * 100) / contentLength,
								status: AutoUpdaterMessage.DOWNLOAD_IN_PROGRESS,
								text: `${bytes(downloaded)} / ${bytes(contentLength)}`
							})
							break
						case 'Finished':
							setUpdateStatus({status: AutoUpdaterMessage.UPDATE_DOWNLOADED})
							console.log('download finished')
							break
					}
				})

				setUpdateStatus({status: AutoUpdaterMessage.UPDATE_INSTALLED})
				await restartApp()
			}
		} catch (error) {
			console.log(`Failed to download update: ${error}`)
		}
	})

	return (
		<Background>
			<motion.div
				initial={{opacity: 0, translateX: -20}}
				animate={{opacity: 1, translateX: 0}}
				className='text-primary flex flex-col items-center justify-center h-[100vh] gap-6'
			>
				<Heading variant={'h2'}>{updateStatus.status}</Heading>
				{updateStatus.status === AutoUpdaterMessage.DOWNLOAD_IN_PROGRESS && (
					<motion.div
						initial={{opacity: 0, translateY: -20}}
						animate={{opacity: 1, translateY: 0}}
						className='w-full max-w-[56.25rem] flex flex-col gap-2'
					>
						<Progress />
						<Heading variant={'h5'} className='text-neutral-400 self-end'>
							{updateStatus.text}
						</Heading>
					</motion.div>
				)}
			</motion.div>
		</Background>
	)
}
