import QueryKey from '@/models/enums/QueryKey'
import {getRecentlyAdded} from '@/utils/http/rom'
import {useQuery} from '@tanstack/react-query'

export default function useRecentlyAdded() {
	return useQuery({
		queryKey: [QueryKey.RECENTLY_ADDED],
		queryFn: async () => {
			const response = await getRecentlyAdded()
			if (!response.success) {
				throw Error(response.error)
			}

			return response.data.items
		}
	})
}
