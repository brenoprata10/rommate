import Background from '@/components/ui/background'
import GameCover from '@/components/ui/game-cover'
import Heading from '@/components/ui/heading'
import useCollections from '@/hooks/api/use-collections'
import useRomsByCollectionId from '@/hooks/api/use-roms-by-collection-id'
import useFocusedGame from '@/hooks/use-focused-game'
import {getCollectionType} from '@/utils/collection'
import {useCallback} from 'react'
import {useParams} from 'react-router'

export default function Collection() {
	const {focusedRomId, setFocusedGame} = useFocusedGame()
	const params = useParams()
	const collectionId = params.id
	const {data: collections, isLoading, error} = useCollections()
	const collection = collections?.find((fetchedCollection) => fetchedCollection.id === collectionId)
	const {
		data: roms,
		isLoading: isLoadingRoms,
		error: romsError
	} = useRomsByCollectionId({id: collectionId, collectionType: collection ? getCollectionType(collection) : undefined})

	const handleHover = useCallback(
		(romId: number) => {
			setFocusedGame(romId)
		},
		[setFocusedGame]
	)

	if (isLoading || error || isLoadingRoms || romsError) {
		return null
	}

	return (
		<Background romId={focusedRomId ?? roms?.items?.[0].id}>
			<div className='z-10 py-12 gap-9 flex flex-col px-header'>
				<Heading variant={'h1'} className='flex gap-2'>
					<span>{collection?.name}</span>
				</Heading>
				<div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8'>
					{roms?.items.map((rom) => (
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
