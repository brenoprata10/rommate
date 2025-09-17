import {Button} from '@/components/ui/button'
import GameCover from '@/components/ui/game-cover'
import Heading from '@/components/ui/heading'
import {Rom} from '@/models/rom'
import clsx from 'clsx'
import {PlayIcon} from 'lucide-react'
import {motion} from 'motion/react'
import {useCallback} from 'react'

export default function ContinuePlayingRom({
	rom,
	className,
	onHover
}: {
	rom: Rom
	className?: string
	onHover: (romId: number) => void
}) {
	const romURL = `/rom/${rom.id}`

	const handleHover = useCallback(() => {
		onHover(rom.id)
	}, [onHover, rom.id])

	return (
		<motion.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			className={clsx(['grid grid-cols-[14.8rem_16.812rem] max-w-[31.688rem] w-full', className])}
		>
			<GameCover src={rom.pathCoverLarge} id={rom.id} width='237' height='316' onHover={handleHover} />
			<div className='flex flex-col pt-[1.375rem] px-[1.375rem] justify-between'>
				<a href={romURL}>
					<Heading variant={rom.name.length > 21 ? 'h3' : 'h2'} className='text-neutral-200'>
						{rom.name}
					</Heading>
				</a>
				<Button
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
