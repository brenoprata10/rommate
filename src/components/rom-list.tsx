import {Rom} from '@/models/rom'
import Background from './ui/background'
import GameCover from './ui/game-cover'
import Heading from './ui/heading'
import {useCallback} from 'react'
import useFocusedGame from '@/hooks/use-focused-game'

export default function RomList({roms, title}: {roms: Rom[]; title: string}) {
	const {focusedRomId, setFocusedGame} = useFocusedGame()
	const isFocusedGameWithinRoms = roms.some((rom) => rom.id === focusedRomId)
	const firstRomId = roms[0].id

	const handleHover = useCallback(
		(romId: number) => {
			setFocusedGame(romId)
		},
		[setFocusedGame]
	)

	return (
		<Background romId={isFocusedGameWithinRoms && focusedRomId ? focusedRomId : firstRomId}>
			<div className='z-10 py-12 gap-9 flex flex-col px-header'>
				<Heading variant={'h1'} className='flex gap-2'>
					<span>{title}</span>
				</Heading>
				<div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8'>
					{roms.map((rom) => (
						<GameCover
							key={rom.id}
							id={rom.id}
							width='255'
							height='340'
							src={rom.pathCoverLarge}
							onHover={() => handleHover(rom.id)}
						/>
					))}
				</div>
			</div>
		</Background>
	)
}
