import {isPermissionGranted, Options, requestPermission, sendNotification} from '@tauri-apps/plugin-notification'
import {useCallback, useEffect, useState} from 'react'

export default function useNotification() {
	const [granted, setGranted] = useState(false)

	const notify = useCallback(
		async (params: Options) => {
			if (!granted) {
				const permission = await requestPermission()
				const newGrantedValue = permission === 'granted'
				if (permission === 'granted') {
					sendNotification(params)
				}
				setGranted(newGrantedValue)
				return
			}
			sendNotification(params)
		},
		[granted]
	)

	useEffect(() => {
		const checkGrantedStatus = async () => {
			const permissionGranted = await isPermissionGranted()
			setGranted(permissionGranted)
		}
		checkGrantedStatus()
	}, [])

	return {notify}
}
