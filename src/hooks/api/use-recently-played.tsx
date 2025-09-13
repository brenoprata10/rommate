import QueryKey from '@/models/enums/QueryKey'
import {getRecentlyPlayed} from '@/utils/http/rom'
import {useQuery} from '@tanstack/react-query'

export default function useRecentlyPlayed() {
	return useQuery({
		queryKey: [QueryKey.RECENTLY_PLAYED],
		queryFn: async () => {
			const response = await getRecentlyPlayed()
			if (!response.success) {
				throw Error(response.error)
			}

			return response.data.items
		}
	})
}
