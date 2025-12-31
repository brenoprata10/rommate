import QueryKey from '@/models/enums/QueryKey'
import {getLoggedInUser} from '@/utils/http/user'
import {useQuery} from '@tanstack/react-query'
import {toast} from 'sonner'

export default function useLoggedInUser() {
	return useQuery({
		queryKey: [QueryKey.CURRENT_USER],
		queryFn: async () => {
			const response = await getLoggedInUser()
			if (!response.success) {
				toast.error(response.error)
				throw Error(response.error)
			}

			return response.data
		}
	})
}
