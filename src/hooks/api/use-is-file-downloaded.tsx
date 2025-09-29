import QueryKey from '@/models/enums/QueryKey'
import {isFileDownloaded} from '@/utils/http/file'
import {useQuery} from '@tanstack/react-query'

export default function useIsFileDownloaded(fileName: string) {
	return useQuery({
		queryKey: [QueryKey.IS_FILE_DOWNLOADED, fileName],
		queryFn: async () => {
			const response = await isFileDownloaded(fileName)
			if (!response.success) {
				throw Error(response.error)
			}

			return response.data
		}
	})
}
