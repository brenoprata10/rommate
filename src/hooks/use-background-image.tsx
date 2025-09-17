import {useEffect, useState} from 'react'
import useRom from './api/use-rom'
import useServerUrl from './use-server-url'

export default function useBackgroundImage({romId}: {romId?: number}) {
	const [currentBackgroundImage, setCurrentBackgroundImage] = useState<string | null>(null)
	const {data: rom} = useRom({id: romId})
	const serverURL = useServerUrl()

	useEffect(() => {
		const newBackgroundImage = rom?.mergedScreenshots?.[0]
		if (!newBackgroundImage) {
			return
		}
		setCurrentBackgroundImage(newBackgroundImage)
	}, [rom?.mergedScreenshots])

	if (!rom || !currentBackgroundImage) {
		return null
	}

	return `${serverURL}/${currentBackgroundImage}`
}
