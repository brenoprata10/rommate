import QueryKey from '@/models/enums/QueryKey'
import {getRomsByPlatformId} from '@/utils/http/rom'
import {useQuery} from '@tanstack/react-query'

export default function useRomsByPlatformId({
	id,
	limit = 50,
	offset = 0
}: {
	id?: number | string
	limit?: number
	offset?: number
}) {
	return useQuery({
		queryKey: [QueryKey.ROM_BY_PLATFORM_ID, id],
		queryFn: async () => {
			if (!id) {
				return null
			}
			const response = await getRomsByPlatformId(id, {limit, offset})
			if (!response.success) {
				throw Error(response.error)
			}

			return response.data
		}
	})
}
