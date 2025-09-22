import GameCover from '@/components/ui/game-cover'
import ScrollableSection from '@/components/ui/scrollable-section'
import useRomsByCollectionId from '@/hooks/api/use-roms-by-collection-id'
import {Collection, RomCollection} from '@/models/collection'

export default function RomCollections({romCollections}: {romCollections: Collection[]}) {
	console.log(romCollections)
	const {data: collection} = useRomsByCollectionId({id: romCollections[0].id, collectionType: RomCollection.VIRTUAL})
	console.log({collection})

	return romCollections.map((collection) => (
		<ScrollableSection
			key={collection.id}
			className={'col-span-2'}
			title={collection.name}
			padding='px-0'
			itemsLength={collection.romCount}
		>
			{collection.romIds.map((romId) => (
				<GameCover
					key={romId}
					id={romId}
					src={`/assets/romm/resources/roms/${romId}/cover/small.png`}
					width='145px'
					height='193px'
					onHover={() => {}}
				/>
			))}
		</ScrollableSection>
	))
}
