import ContentCard from '@/components/ui/content-card'
import {Progress} from '@/components/ui/progress'
import clsx from 'clsx'
import {animate, motion, useMotionValue, useTransform} from 'motion/react'
import React, {useEffect} from 'react'

const IGDB_IMAGE =
	'data:image/png;base64,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'

function Score({igdbScore, ssScore, launchboxScore}: {igdbScore?: number; ssScore?: number; launchboxScore?: number}) {
	return (
		<div className='max-xl:col-span-2'>
			<ContentCard title='Rating' contentClassName='flex flex-col gap-6 justify-center'>
				{igdbScore != null && igdbScore !== 0 && (
					<ScoreProgressBar
						value={igdbScore}
						providerImageURL={IGDB_IMAGE}
						indicatorColor={'!bg-[#9A4EFF]'}
						progressColor='!bg-[#323A45]'
						shouldRoundNumber
					/>
				)}
				{ssScore && (
					<ScoreProgressBar
						value={ssScore}
						providerImageURL={'/screenscrapper_logo.webp'}
						indicatorColor={'!bg-[#D5A900]'}
						progressColor='!bg-[#333333]'
						shouldRoundNumber
					/>
				)}

				{launchboxScore && (
					<ScoreProgressBar
						value={launchboxScore}
						progressBarValue={(launchboxScore * 100) / 5}
						providerImageURL={'/launchbox_logo.webp'}
						indicatorColor={'!bg-[#30BBFE]'}
						progressColor='!bg-[#323A45]'
					/>
				)}
			</ContentCard>
		</div>
	)
}

const ScoreProgressBar = ({
	providerImageURL,
	progressColor,
	indicatorColor,
	value,
	progressBarValue,
	shouldRoundNumber
}: {
	providerImageURL: string
	progressColor: string
	indicatorColor: string
	value: number
	progressBarValue?: number
	shouldRoundNumber?: boolean
}) => {
	const animatedValue = useMotionValue(0)
	const rounded = useTransform(() =>
		shouldRoundNumber ? Math.trunc(animatedValue.get()).toString() : animatedValue.get().toFixed(1)
	)

	const progressBarPercentage = progressBarValue ?? value

	useEffect(() => {
		const controls = animate(animatedValue, value, {duration: 0.5})
		return () => controls.stop()
	}, [animatedValue, value])

	return (
		<div className='flex gap-6 items-center'>
			<img className='aspect-square rounded-md' width={54} height={54} src={providerImageURL} />
			<div className='relative w-full'>
				<Progress value={progressBarPercentage} className={progressColor} indicatorClassName={indicatorColor} />
				<motion.span
					initial={{x: -20}}
					animate={{x: 0}}
					transition={{type: 'tween', duration: 0.5}}
					style={{right: `${100 - (progressBarPercentage || 0) - 5}%`}}
					className={clsx([
						`
							absolute
							flex 
							items-center
							justify-center
							text-white 
							text-2xl
							font-bold 
							rounded-full
							aspect-square
							top-[-1.65rem]
							min-w-[3.875rem]
						`,
						progressColor
					])}
				>
					{rounded}
				</motion.span>
			</div>
		</div>
	)
}

export default React.memo(Score)
