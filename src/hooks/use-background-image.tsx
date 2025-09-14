import useRecentlyPlayed from './api/use-recently-played'
import useRom from './api/use-rom'
import useServerUrl from './use-server-url'

export default function useBackgroundImage() {
	const {data: roms} = useRecentlyPlayed()
	const {data: rom} = useRom({id: roms?.[0].id})
	const serverURL = useServerUrl()

	if (!rom) {
		return null
	}

	return rom.mergedScreenshots?.[0] ? `${serverURL}/${rom.mergedScreenshots?.[0]}` : null
}
