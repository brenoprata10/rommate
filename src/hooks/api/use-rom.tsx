import QueryKey from '@/models/enums/QueryKey'
import {toast} from 'sonner'
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
				toast.error(response.error)
				throw Error(response.error)
			}

			return response.data
		}
	})
}
