import {motion} from 'motion/react'

export default function Background({
	children,
	backgroundImageUrl
}: {
	children: React.ReactNode
	backgroundImageUrl: string | null
}) {
	return (
		<div
			className='
				after:absolute
				after:w-screen
				after:h-screen
				after:bg-black
				after:opacity-80
				after:top-0
				after:left-0
				after:z-[-1]
			'
		>
			{backgroundImageUrl && (
				<motion.div
					initial={{opacity: 0, filter: 'blur(10px)', translateX: 10}}
					animate={{opacity: 1, filter: 'blur(0)', translateX: 0}}
					className='absolute w-screen h-screen top-0 left-0 bg-no-repeat bg-center bg-cover z-[-1]'
					style={{
						backgroundImage: `url("${backgroundImageUrl}")`
					}}
				/>
			)}
			{children}
		</div>
	)
}
