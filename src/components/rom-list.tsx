import {Rom} from '@/models/rom'
import {v4 as uuidv4} from 'uuid'
import Background from './ui/background'
import GameCover from './ui/game-cover'
import Heading from './ui/heading'
import {useCallback, useEffect, useRef} from 'react'
import useFocusedGame from '@/hooks/use-focused-game'
import SkeletonGameCover from './ui/skeleton-game-cover'
import {motion} from 'motion/react'

const SKELETON_COUNTER = 6

export default function RomList({
	roms,
	title,
	hasNextPage,
	imageUrl,
	loadMore
}: {
	roms: Rom[]
	title: string
	hasNextPage?: boolean
	imageUrl?: string
	loadMore: () => void
}) {
	const {focusedRomId, setFocusedGame} = useFocusedGame()
	const ref = useRef(null)
	const isFocusedGameWithinRoms = roms.some((rom) => rom.id === focusedRomId)
	const firstRomId = roms[0].id

	useEffect(() => {
		const element = ref.current
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					loadMore()
				}
			},
			{threshold: 0.2}
		)

		if (element) {
			observer.observe(element)
		}

		return () => {
			if (element) {
				observer.unobserve(element)
			}
		}
	}, [loadMore])

	const handleHover = useCallback(
		(romId: number) => {
			setFocusedGame(romId)
		},
		[setFocusedGame]
	)

	return (
		<Background romId={isFocusedGameWithinRoms && focusedRomId ? focusedRomId : firstRomId}>
			<div className='z-10 py-12 gap-9 flex flex-col px-header'>
				<Heading variant={'h1'} className='flex gap-4 items-center'>
					{imageUrl && <img src={imageUrl} className='aspect-square max-w-15' />}
					<motion.span initial={{opacity: 0, translateX: -20}} animate={{opacity: 1, translateX: 0}}>
						{title}
					</motion.span>
				</Heading>
				<div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8 relative'>
					{roms.map((rom) => (
						<GameCover
							key={rom.id}
							id={rom.id}
							width='350'
							height='340'
							src={rom.pathCoverLarge}
							onHover={() => handleHover(rom.id)}
						/>
					))}
					{hasNextPage && (
						<>
							<div ref={ref} className='absolute bottom-[45rem]'>
								&nbsp;
							</div>
							{Array(SKELETON_COUNTER)
								.fill(null)
								.map(() => (
									<SkeletonGameCover key={uuidv4()} />
								))}
						</>
					)}
				</div>
			</div>
		</Background>
	)
}
