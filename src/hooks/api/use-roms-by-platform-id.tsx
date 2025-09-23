import QueryKey from '@/models/enums/QueryKey'
import {getRomsByPlatformId} from '@/utils/http/rom'
import {useQuery} from '@tanstack/react-query'

export default function useRomsByPlatformId({id}: {id?: number | string}) {
	return useQuery({
		queryKey: [QueryKey.ROM_BY_PLATFORM_ID, id],
		queryFn: async () => {
			if (!id) {
				return null
			}
			const response = await getRomsByPlatformId(id)
			if (!response.success) {
				throw Error(response.error)
			}

			return response.data
		}
	})
}
