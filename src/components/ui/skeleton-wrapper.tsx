import {motion} from 'motion/react'

export default function SkeletonWrapper({children}: {children: React.ReactNode}) {
	return (
		<motion.div animate={{scale: 1}} initial={{scale: 0.9}}>
			{children}
		</motion.div>
	)
}
