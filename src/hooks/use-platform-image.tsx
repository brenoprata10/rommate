import usePlatforms from './api/use-platforms'
import useServerUrl from './use-server-url'
import {getPlatformImage} from '@/utils/platform-image'

export default function usePlatformImage({slug}: {slug?: string}) {
	const {data: platforms} = usePlatforms()
	const platform = platforms?.find((platform) => platform.slug === slug)
	const serverUrl = useServerUrl()

	if (!serverUrl || !slug) {
		return null
	}

	return getPlatformImage({slug, serverUrl, isUnidentified: platform?.isUnidentified})
}
