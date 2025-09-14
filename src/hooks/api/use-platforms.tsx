import QueryKey from '@/models/enums/QueryKey'
import {getPlatforms} from '@/utils/http/platform'
import {useQuery} from '@tanstack/react-query'

export default function usePlatforms() {
	return useQuery({
		queryKey: [QueryKey.PLATFORMS],
		queryFn: async () => {
			const response = await getPlatforms()
			if (!response.success) {
				throw Error(response.error)
			}

			return response.data
		}
	})
}
