import QueryKey from '@/models/enums/QueryKey'
import {toast} from 'sonner'
import {useMutation} from '@tanstack/react-query'
import {uploadLocalSaveFile} from '@/utils/http/rom-save'

export default function useUploadLocalSaveFile({romId}: {romId?: number}) {
	return useMutation({
		mutationKey: [QueryKey.ROM_UPLOAD_LOCAL_SAVE, romId],
		mutationFn: async () => {
			if (!romId) {
				return null
			}
			const response = await uploadLocalSaveFile(romId)
			if (!response.success) {
				toast.error(response.error)
				throw Error(response.error)
			}
		}
	})
}
