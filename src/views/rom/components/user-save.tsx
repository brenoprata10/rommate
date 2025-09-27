import {Badge} from '@/components/ui/badge'
import useAsset from '@/hooks/api/use-asset'
import {RomUserSave} from '@/models/rom'
import bytes from 'bytes'
import {motion} from 'motion/react'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {formatDistanceToNow} from 'date-fns'

const BADGE_CLASSNAME = 'bg-neutral-700 text-neutral-200 text-xs font-medium'

const DEFAULT_ROMM_LOGO = '/romm_logo.jpg'

function UserSave({data}: {data: RomUserSave}) {
	const {data: screenshotUrl} = useAsset(data.screenshot?.downloadPath)
	const [imageURL, setImageURL] = useState<string | null>(null)
	const lastPlayedDate = useMemo(
		() => formatDistanceToNow(data.updatedAt, {addSuffix: true}).replace('about', ''),
		[data.updatedAt]
	)

	useEffect(() => {
		if (screenshotUrl) {
			setImageURL(screenshotUrl)
			return
		}
		if (!data.screenshot?.downloadPath) {
			setImageURL(DEFAULT_ROMM_LOGO)
		}
	}, [screenshotUrl, data.screenshot?.downloadPath])

	const handleError = useCallback(() => {
		setImageURL(DEFAULT_ROMM_LOGO)
	}, [])

	return (
		<motion.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			className='bg-neutral-800 border border-neutral-700 rounded-md overflow-hidden flex gap-3 items-center'
		>
			<img
				className='aspect-video max-h-[9rem] max-w-[16rem]'
				width={256}
				height={144}
				onError={handleError}
				src={imageURL ?? DEFAULT_ROMM_LOGO}
			/>
			<div className='font-medium text-neutral-200 px-3 py-5 flex flex-col gap-3'>
				{data.fileName}
				<div className='flex gap-3'>
					<Badge className={BADGE_CLASSNAME}>{lastPlayedDate}</Badge>
					<Badge className={BADGE_CLASSNAME}>{bytes(data.fileSizeBytes)}</Badge>
				</div>
			</div>
		</motion.div>
	)
}

export default React.memo(UserSave)
