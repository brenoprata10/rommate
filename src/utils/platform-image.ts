import {Platform} from '@/models/platform'

export const getPlatformImage = ({
	slug,
	serverUrl,
	isUnidentified
}: {serverUrl: string; isUnidentified?: boolean} & Pick<Platform, 'slug'>) => {
	return `${serverUrl}/assets/platforms/${isUnidentified ? 'default' : slug}.ico`
}
