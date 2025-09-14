import QueryKey from '@/models/enums/QueryKey'
import {getRomById} from '@/utils/http/rom'
import {useQuery} from '@tanstack/react-query'

export default function useRom({id}: {id?: number}) {
	return useQuery({
		queryKey: [QueryKey.ROM_BY_ID, id],
		queryFn: async () => {
			if (!id) {
				return null
			}
			const response = await getRomById(id)
			if (!response.success) {
				throw Error(response.error)
			}

			return response.data
		}
	})
}
