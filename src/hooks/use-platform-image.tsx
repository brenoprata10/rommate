import {Platform} from '@/models/platform'
import useServerUrl from './use-server-url'
import {getPlatformImage} from '@/utils/platform-image'

export default function usePlatformImage({slug}: Pick<Platform, 'slug'>) {
	const serverUrl = useServerUrl()

	if (!serverUrl) {
		return null
	}

	return getPlatformImage({slug, serverUrl})
}
