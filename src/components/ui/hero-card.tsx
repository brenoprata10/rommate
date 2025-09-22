import {useCallback, useState} from 'react'
import {AnimatePresence, motion} from 'motion/react'
import ContentCard from './content-card'
import {Minimize2} from 'lucide-react'
import clsx from 'clsx'

export default function HeroCard({
	id,
	title,
	className,
	cardClassName,
	disableDialog,
	component,
	dialogComponent
}: {
	id: string
	title: string
	className?: string
	cardClassName?: string
	disableDialog?: boolean
	component: React.ReactNode
	dialogComponent: React.ReactNode
}) {
	const [isZoomed, setIsZoomed] = useState(false)

	const toggleZoom = useCallback(() => {
		if (disableDialog) {
			return
		}
		setIsZoomed(!isZoomed)
	}, [isZoomed, disableDialog])

	return (
		<>
			{!isZoomed ? (
				<motion.div className={className} layoutId={id} onClick={toggleZoom}>
					<ContentCard
						title={title}
						className={clsx([!disableDialog && 'cursor-pointer hover:scale-105 transition', cardClassName])}
					>
						{component}
					</ContentCard>
				</motion.div>
			) : (
				<div>&nbsp;</div>
			)}
			<AnimatePresence>
				{isZoomed && (
					<motion.div
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						className={clsx(['fixed top-0 left-0 w-screen h-screen z-50', className])}
						style={{backgroundColor: 'rgba(0, 0, 0, 0.9)'}}
					>
						<motion.div
							className={clsx(['absolute left-[50vw] top-[20vh] min-w-[40vw] translate-x-[-50%]', cardClassName])}
							layoutId={id}
						>
							<ContentCard
								title={title}
								className='max-h-[60vh] overflow-scroll'
								headerTrailing={
									<Minimize2
										className='cursor-pointer transition-colors text-neutral-400 hover:text-neutral-300'
										onClick={toggleZoom}
									/>
								}
							>
								{dialogComponent}
							</ContentCard>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
