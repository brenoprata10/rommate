import QueryKey from '@/models/enums/QueryKey'
import {getRoms} from '@/utils/http/rom'
import {useQuery} from '@tanstack/react-query'

export default function useRoms() {
	return useQuery({
		queryKey: [QueryKey.ROMS],
		queryFn: async () => {
			const response = await getRoms()
			if (!response.success) {
				throw Error(response.error)
			}

			return response.data.items
		}
	})
}
