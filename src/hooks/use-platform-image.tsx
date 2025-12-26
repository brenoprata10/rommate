import useServerUrl from './use-server-url'
import {getPlatformImage} from '@/utils/platform-image'

export default function usePlatformImage({slug}: {slug?: string}) {
	const serverUrl = useServerUrl()

	if (!serverUrl || !slug) {
		return null
	}

	return getPlatformImage({slug, serverUrl})
}
