import QueryKey from '@/models/enums/QueryKey'
import {toast} from 'sonner'
import {useQuery} from '@tanstack/react-query'
import {checkSaveSync} from '@/utils/http/rom-save'

export default function useCheckSaveSync({romId, enabled}: {romId?: number; enabled?: boolean}) {
	return useQuery({
		enabled,
		queryKey: [QueryKey.ROM_CHECK_SAVE_SYNC, romId],
		queryFn: async () => {
			if (!romId) {
				return null
			}
			const response = await checkSaveSync(romId)
			if (!response.success) {
				toast.error(response.error)
				throw Error(response.error)
			}

			return response.data
		}
	})
}
