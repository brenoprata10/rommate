import useAsset from '@/hooks/api/use-asset'
import {RomUserSave} from '@/models/rom'
import {motion} from 'motion/react'

export default function UserSave({data}: {data: RomUserSave}) {
	const {data: screenshotUrl} = useAsset(`${data.screenshot?.downloadPath}`)

	return (
		<motion.div
			initial={{opacity: 0, translateX: 5}}
			animate={{opacity: 1, translateX: 0}}
			className='bg-neutral-800 border border-neutral-700 rounded-md overflow-hidden flex gap-3 items-center'
		>
			{screenshotUrl && <img className='aspect-video max-h-[16rem]' src={screenshotUrl} />}
			<div className='font-medium text-neutral-200 px-3 py-5'>{data.fileName}</div>
		</motion.div>
	)
}
