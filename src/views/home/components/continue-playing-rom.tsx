import {Button} from '@/components/ui/button'
import GameCover from '@/components/ui/game-cover'
import Heading from '@/components/ui/heading'
import {CommonDispatchContext} from '@/context'
import {Rom} from '@/models/rom'
import {ActionEnum} from '@/reducer'
import clsx from 'clsx'
import {PlayIcon} from 'lucide-react'
import {motion} from 'motion/react'
import {useCallback, useContext} from 'react'

export default function ContinuePlayingRom({
	rom,
	className,
	hideTitle,
	onHover
}: {
	rom: Rom
	className?: string
	hideTitle?: boolean
	onHover?: (romId: number) => void
}) {
	const romURL = `/rom/${rom.id}`
	const dispatch = useContext(CommonDispatchContext)

	const handleHover = useCallback(() => {
		onHover?.(rom.id)
	}, [onHover, rom.id])

	const downloadRom = useCallback(() => {
		dispatch({
			type: ActionEnum.ADD_DOWNLOAD_TO_QUEUE,
			payload: {romId: rom.id}
		})
	}, [dispatch, rom])

	return (
		<motion.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			className={clsx(['grid grid-cols-[14.8rem_16.812rem] max-w-[31.688rem] w-full', className])}
		>
			<GameCover
				src={rom.pathCoverLarge}
				id={rom.id}
				width='237'
				height='316'
				onHover={onHover ? handleHover : undefined}
			/>
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
				<Button
					onClick={downloadRom}
					className={`
						bg-neutral-900
						text-white 
						border 
						border-neutral-700
						hover:bg-neutral-800
						cursor-pointer
					`}
				>
					<PlayIcon /> Install
				</Button>
			</div>
		</motion.div>
	)
}
