import RomList from '@/components/rom-list'
import useCollections from '@/hooks/api/use-collections'
import useRomsByCollectionIdPaginated from '@/hooks/api/use-roms-by-collection-id-paginated'
import {getCollectionType} from '@/utils/collection'
import {useParams} from 'react-router'

export default function Collection() {
	const {id: collectionId, collectionType} = useParams()
	const {data: collections, isLoading, error} = useCollections()
	const collection = collections?.find(
		(fetchedCollection) =>
			fetchedCollection.id === collectionId && getCollectionType(fetchedCollection) === collectionType
	)
	const {
		data: roms,
		isLoading: isLoadingRoms,
		error: romsError,
		fetchNextPage,
		hasNextPage
	} = useRomsByCollectionIdPaginated({
		id: collectionId,
		collectionType: collection ? getCollectionType(collection) : undefined
	})

	if (isLoading || error || isLoadingRoms || romsError) {
		return null
	}

	const romsList = roms?.pages?.flatMap((payload) => payload.items).flat()

	return (
		<RomList title={collection?.name ?? ''} roms={romsList ?? []} loadMore={fetchNextPage} hasNextPage={hasNextPage} />
	)
}
