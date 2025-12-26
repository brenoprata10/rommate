import GameCover from '@/components/ui/game-cover'
import ScrollableSection from '@/components/ui/scrollable-section'
import useCollections from '@/hooks/api/use-collections'
import useRomsByCollectionId from '@/hooks/api/use-roms-by-collection-id'
import {Collection} from '@/models/collection'
import {getCollectionType} from '@/utils/collection'
import {motion} from 'motion/react'
import React from 'react'

function RomCollections({romId}: {romId: number}) {
	const {data: collections, isLoading, error} = useCollections()
	const romCollections = collections?.filter((collection) => collection.romIds.includes(romId))
	if (!romCollections || isLoading || error) {
		return null
	}

	return romCollections.map((collection) => <RomRelatedCollection key={collection.id} collection={collection} />)
}

const RomRelatedCollection = ({collection}: {collection: Collection}) => {
	const {data, isLoading, error} = useRomsByCollectionId({
		id: collection.id,
		collectionType: getCollectionType(collection)
	})

	if (isLoading || error) {
		return null
	}

	return (
		<motion.div className='col-span-2' initial={{opacity: 0}} animate={{opacity: 1}}>
			<ScrollableSection title={collection.name} padding='px-0' itemsLength={data?.items.length ?? collection.romCount}>
				{data?.items.map((rom) => (
					<GameCover
						key={rom.id}
						id={rom.id}
						src={rom.pathCoverSmall}
						platformSlug={rom.platformSlug}
						width='145px'
						height='193px'
					/>
				))}
			</ScrollableSection>
		</motion.div>
	)
}

export default React.memo(RomCollections)
