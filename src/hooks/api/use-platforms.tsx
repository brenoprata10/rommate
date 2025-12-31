import QueryKey from '@/models/enums/QueryKey'
import {getPlatforms} from '@/utils/http/platform'
import {useQuery} from '@tanstack/react-query'
import {toast} from 'sonner'

export default function usePlatforms() {
	return useQuery({
		queryKey: [QueryKey.PLATFORMS],
		queryFn: async () => {
			const response = await getPlatforms()
			if (!response.success) {
				toast.error(response.error)
				throw Error(response.error)
			}

			return response.data
		}
	})
}
