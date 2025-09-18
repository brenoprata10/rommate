import QueryKey from '@/models/enums/QueryKey'
import {getAsset} from '@/utils/http/asset'
import {useQuery} from '@tanstack/react-query'

export default function useAsset(url?: string) {
	return useQuery({
		queryKey: [QueryKey.ASSET, url],
		queryFn: async () => {
			if (!url) {
				return null
			}
			const response = await getAsset(url, 'image/png')
			if (!response.success) {
				throw Error(response.error)
			}

			return response.data
		}
	})
}
