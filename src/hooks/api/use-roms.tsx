import QueryKey from '@/models/enums/QueryKey'
import {toast} from 'sonner'
import {getRoms, PaginatedPayload} from '@/utils/http/rom'
import {useInfiniteQuery} from '@tanstack/react-query'

const INITIAL_OFFSET = 0

export default function useRoms({
	limit = 30,
	offset,
	searchTerm,
	enabled = true
}: {
	limit?: number
	offset: number
	searchTerm?: string
	enabled?: boolean
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
		queryKey: [QueryKey.ROMS, limit?.toString() ?? '', offset.toString(), searchTerm ?? ''],
		queryFn: async () => {
			const response = await getRoms({pagination: {limit, offset}, searchTerm})
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
		},
		enabled
	})
}
