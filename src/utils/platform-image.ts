import {Platform} from '@/models/platform'

export const getPlatformImage = ({slug, serverUrl}: {serverUrl: string} & Pick<Platform, 'slug'>) => {
	if (slug === 'win') {
		return `${serverUrl}/assets/platforms/win.ico`
	}
	return `${serverUrl}/assets/platforms/${slug}.svg`
}
