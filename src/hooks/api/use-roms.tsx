import QueryKey from '@/models/enums/QueryKey'
import {getRoms} from '@/utils/http/rom'
import {useQuery} from '@tanstack/react-query'

export default function useRoms({
	limit = 30,
	offset,
	searchTerm
}: {
	limit?: number
	offset: number
	searchTerm?: string
}) {
	return useQuery({
		queryKey: [QueryKey.ROMS, limit, offset, searchTerm],
		queryFn: async () => {
			const response = await getRoms({pagination: {limit, offset}, searchTerm})
			if (!response.success) {
				throw Error(response.error)
			}

			return response.data.items
		}
	})
}
