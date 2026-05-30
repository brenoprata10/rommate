import {Scrapper} from '@/models/enums/scrapper'
import useServerUrl from './use-server-url'

const CONFIG: Record<Scrapper, {logoUrl: string}> = {
	[Scrapper.HASHEOUS]: {logoUrl: '/assets/scrappers/hasheous.png'},
	[Scrapper.RETROACHIEVEMENTS]: {logoUrl: '/assets/scrappers/ra.png'}
}

export default function useScrapper(scrapper: Scrapper) {
	const serverUrl = useServerUrl()
	const scrapperConfig = CONFIG[scrapper]

	return {...scrapperConfig, logoUrl: `${serverUrl}${scrapperConfig.logoUrl}`}
}
