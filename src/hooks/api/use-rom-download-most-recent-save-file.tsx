import QueryKey from '@/models/enums/QueryKey'
import {toast} from 'sonner'
import {useMutation} from '@tanstack/react-query'
import {downloadMostRecentSaveFile} from '@/utils/http/rom-save'

export default function useDownloadMostRecentSaveFile({romId}: {romId?: number}) {
	return useMutation({
		mutationKey: [QueryKey.ROM_DOWNLOAD_MOST_RECENT_SAVE, romId],
		mutationFn: async () => {
			if (!romId) {
				return null
			}
			const response = await downloadMostRecentSaveFile(romId)
			if (!response.success) {
				toast.error(response.error)
				throw Error(response.error)
			}
		}
	})
}
