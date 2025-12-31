import {RomCollection} from '@/models/collection'
import {toast} from 'sonner'
import QueryKey from '@/models/enums/QueryKey'
import {getRomsByCollectionId} from '@/utils/http/rom'
import {useQuery} from '@tanstack/react-query'

export default function useRomsByCollectionId({
	id,
	collectionType,
	limit = 50,
	offset = 0
}: {
	id?: number | string
	collectionType?: RomCollection
	limit?: number
	offset?: number
}) {
	return useQuery({
		queryKey: [QueryKey.ROM_BY_COLLECTION_ID, id, collectionType, limit, offset],
		queryFn: async () => {
			if (!id || !collectionType) {
				return null
			}
			const response = await getRomsByCollectionId(id, collectionType, {limit, offset})
			if (!response.success) {
				toast.error(response.error)
				throw Error(response.error)
			}

			return response.data
		}
	})
}
