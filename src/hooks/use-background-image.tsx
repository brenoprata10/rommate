import useRecentlyPlayed from './api/use-recently-played'
import useServerUrl from './use-server-url'

export default function useBackgroundImage() {
	const {data: roms} = useRecentlyPlayed()
	const serverURL = useServerUrl()

	if (!roms || roms.length === 0) {
		return null
	}

	const rom = roms[0]

	return rom.mergedScreenshots?.[0] ? `${serverURL}/${rom.mergedScreenshots?.[0]}` : null
}
