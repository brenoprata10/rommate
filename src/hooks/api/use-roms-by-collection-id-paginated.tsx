import {RomCollection} from '@/models/collection'
import {toast} from 'sonner'
import QueryKey from '@/models/enums/QueryKey'
import {getRomsByCollectionId, PaginatedPayload} from '@/utils/http/rom'
import {useInfiniteQuery} from '@tanstack/react-query'

const INITIAL_OFFSET = 0

export default function useRomsByCollectionIdPaginated({
	id,
	collectionType,
	limit = 30
}: {
	id?: number | string
	collectionType?: RomCollection
	limit?: number
}) {
	return useInfiniteQuery<
		PaginatedPayload,
		Error,
		{
			pageParams: number[]

			pages: PaginatedPayload[]
		},
		string[],
		number
	>({
		initialPageParam: INITIAL_OFFSET,
		queryKey: [
			QueryKey.ROM_BY_COLLECTION_ID_PAGINATED,
			id?.toString() ?? '',
			collectionType ?? '',
			limit.toString(),
			INITIAL_OFFSET.toString()
		],
		queryFn: async ({pageParam}) => {
			if (!id || !collectionType) {
				return {total: 0, items: [], limit: 0, offset: 0}
			}
			const response = await getRomsByCollectionId(id, collectionType, {limit, offset: pageParam})
			if (!response.success) {
				toast.error(response.error)
				throw Error(response.error)
			}

			return response.data
		},
		getNextPageParam: (lastPage) => {
			const {offset, limit, total} = lastPage
			const nextOffset = offset + limit
			return nextOffset < total ? nextOffset : null
		}
	})
}
