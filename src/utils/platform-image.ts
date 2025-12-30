import {Platform} from '@/models/platform'

export const getPlatformImage = ({slug, serverUrl}: {serverUrl: string} & Pick<Platform, 'slug'>) => {
	return `${serverUrl}/assets/platforms/${slug}.ico`
}
