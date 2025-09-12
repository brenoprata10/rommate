import {useEffect, useState} from 'react'
import useStore from './use-store'

export default function useServerUrl() {
	const {get} = useStore()
	const [serverUrl, setServerUrl] = useState<string | null>(null)

	useEffect(() => {
		const loadServerUrl = async () => {
			const url = await get<string>('romm_url')
			if (!url) {
				return
			}
			setServerUrl(url)
		}

		loadServerUrl()
	}, [get])

	return serverUrl
}
