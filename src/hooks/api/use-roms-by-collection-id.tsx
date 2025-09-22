import {RomCollection} from '@/models/collection'
import QueryKey from '@/models/enums/QueryKey'
import {getRomsByCollectionId} from '@/utils/http/rom'
import {useQuery} from '@tanstack/react-query'

export default function useRomsByCollectionId({
	id,
	collectionType
}: {
	id?: number | string
	collectionType: RomCollection
}) {
	return useQuery({
		queryKey: [QueryKey.ROM_BY_COLLECTION_ID, id, collectionType],
		queryFn: async () => {
			if (!id) {
				return null
			}
			const response = await getRomsByCollectionId(id, collectionType)
			if (!response.success) {
				throw Error(response.error)
			}

			return response.data
		}
	})
}
