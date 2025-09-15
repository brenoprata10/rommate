import QueryKey from '@/models/enums/QueryKey'
import {getCollections} from '@/utils/http/collection'
import {useQuery} from '@tanstack/react-query'

export default function useCollections() {
	return useQuery({
		queryKey: [QueryKey.COLLECTIONS],
		queryFn: async () => {
			const response = await getCollections()
			if (!response.success) {
				throw Error(response.error)
			}

			return response.data
		}
	})
}
