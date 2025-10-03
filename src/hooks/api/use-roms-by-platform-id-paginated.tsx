import QueryKey from '@/models/enums/QueryKey'
import {getRomsByPlatformId, PaginatedPayload} from '@/utils/http/rom'
import {useInfiniteQuery} from '@tanstack/react-query'

const INITIAL_OFFSET = 0

export default function useRomsByPlatformIdPaginated({id, limit = 30}: {id?: number | string; limit?: number}) {
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
			QueryKey.ROM_BY_PLATFORM_ID_PAGINATED,
			id?.toString() ?? '',
			limit.toString(),
			INITIAL_OFFSET.toString()
		],
		queryFn: async ({pageParam}) => {
			if (!id) {
				return {total: 0, items: [], limit: 0, offset: 0}
			}
			const response = await getRomsByPlatformId(id, {limit, offset: pageParam})
			if (!response.success) {
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
