import RomList from '@/components/rom-list'
import useCollections from '@/hooks/api/use-collections'
import useRomsByCollectionId from '@/hooks/api/use-roms-by-collection-id'
import {getCollectionType} from '@/utils/collection'
import {useParams} from 'react-router'

export default function Collection() {
	const params = useParams()
	const collectionId = params.id
	const {data: collections, isLoading, error} = useCollections()
	const collection = collections?.find((fetchedCollection) => fetchedCollection.id === collectionId)
	const {
		data: roms,
		isLoading: isLoadingRoms,
		error: romsError
	} = useRomsByCollectionId({id: collectionId, collectionType: collection ? getCollectionType(collection) : undefined})

	if (isLoading || error || isLoadingRoms || romsError) {
		return null
	}

	return <RomList title={collection?.name ?? ''} roms={roms?.items ?? []} />
}
