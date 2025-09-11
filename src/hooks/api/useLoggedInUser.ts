import QueryKey from '@/models/enums/QueryKey'
import {getLoggedInUser} from '@/utils/http/rom'
import {useQuery} from '@tanstack/react-query'

export default function useLoggedInUser() {
	return useQuery({
		queryKey: [QueryKey.CURRENT_USER],
		queryFn: async () => {
			const response = await getLoggedInUser()
			if (!response.success) {
				throw Error(response.error)
			}

			return response.data
		}
	})
}
