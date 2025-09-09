import useRommSession from '@/hooks/useRommSession'
import {invoke} from '@tauri-apps/api/core'
import {useCallback, useEffect} from 'react'
import {useNavigate} from 'react-router'

export default function Home() {
	const {isAuthenticated, logout} = useRommSession()
	const navigate = useNavigate()

	useEffect(() => {
		const checkAuthentication = async () => {
			const isLoggedIn = await isAuthenticated()
			if (!isLoggedIn) {
				navigate('/login')
			}
		}

		checkAuthentication()
	}, [navigate, isAuthenticated])

	useEffect(() => {
		const loadRoms = async () => {
			const responseRoms = await invoke('command_get_roms').catch((e) => console.error(e))
			console.log(JSON.stringify(responseRoms))
		}

		loadRoms()
	}, [])

	const handleLogout = useCallback(() => {
		logout().catch((e) => console.error(e))
	}, [logout])

	return (
		<div>
			home <button onClick={handleLogout}>logout</button>
		</div>
	)
}
