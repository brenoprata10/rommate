import QueryKey from '@/models/enums/QueryKey'
import {getServerStats} from '@/utils/http/stat'
import {useQuery} from '@tanstack/react-query'
import {toast} from 'sonner'

export default function useServerStats() {
	return useQuery({
		queryKey: [QueryKey.SERVER_STATS],
		queryFn: async () => {
			const response = await getServerStats()
			if (!response.success) {
				toast.error(response.error)
				throw Error(response.error)
			}

			return response.data
		}
	})
}
