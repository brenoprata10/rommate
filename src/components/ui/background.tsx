import useBackgroundImage from '@/hooks/use-background-image'
import {motion} from 'motion/react'

export default function Background({children, romId}: {children: React.ReactNode; romId?: number}) {
	const romBackgroundImage = useBackgroundImage({romId})
	const backgroundImageUrl = romBackgroundImage ?? '../default_bg.webp'

	return (
		<div
			className='
				after:fixed
				after:w-screen
				after:h-screen
				after:bg-black
				after:opacity-80
				after:top-0
				after:left-0
				after:z-[-1]
				w-full
			'
		>
			<motion.div
				key={backgroundImageUrl}
				initial={{opacity: 0, filter: 'blur(10px)', translateX: 10}}
				animate={{opacity: 1, filter: 'blur(0)', translateX: 0}}
				className='fixed w-screen h-screen top-0 left-0 bg-no-repeat bg-center bg-cover z-[-1]'
				style={{
					backgroundImage: `url("${backgroundImageUrl}")`
				}}
			/>
			{children}
		</div>
	)
}
