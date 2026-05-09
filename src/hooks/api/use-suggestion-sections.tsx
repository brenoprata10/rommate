import QueryKey from '@/models/enums/QueryKey'
import {getSuggestionSections} from '@/utils/http/suggestion_section'
import {useQuery} from '@tanstack/react-query'
import {toast} from 'sonner'

export default function useSuggestionSections() {
	return useQuery({
		queryKey: [QueryKey.SUGGESTION_SECTIONS],
		queryFn: async () => {
			const response = await getSuggestionSections()
			if (!response.success) {
				toast.error(response.error)
				throw Error(response.error)
			}

			return response.data
		}
	})
}
