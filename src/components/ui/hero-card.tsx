import {useCallback, useState} from 'react'
import {AnimatePresence, motion} from 'motion/react'
import ContentCard from './content-card'

export default function HeroCard({
	id,
	title,
	component,
	dialogComponent
}: {
	id: string
	title: string
	component: React.ReactNode
	dialogComponent: React.ReactNode
}) {
	const [isZoomed, setIsZoomed] = useState(false)

	const toggleZoom = useCallback(() => setIsZoomed(!isZoomed), [isZoomed])

	return (
		<>
			{!isZoomed && (
				<motion.div layoutId={id} onClick={toggleZoom}>
					<ContentCard title={title}>{component}</ContentCard>
				</motion.div>
			)}
			<AnimatePresence>
				{isZoomed && (
					<motion.div
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						className='fixed top-0 left-0 w-screen h-screen z-50'
						style={{backgroundColor: 'rgba(0, 0, 0, 0.9)'}}
					>
						<motion.div
							className='absolute left-[50vw] top-[20vh] min-w-[40vw] translate-x-[-50%]'
							exit={{maxWidth: 223}}
							layoutId={id}
							onClick={toggleZoom}
						>
							<ContentCard title={title} className='max-h-[60vh] overflow-scroll'>
								{dialogComponent}
							</ContentCard>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
