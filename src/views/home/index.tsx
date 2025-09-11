import useLoggedInUser from '@/hooks/api/useLoggedInUser'
import useRoms from '@/hooks/api/useRoms'
import useRommSession from '@/hooks/useRommSession'
import {useCallback, useEffect} from 'react'
import {useNavigate} from 'react-router'

export default function Home() {
	const {isAuthenticated, logout} = useRommSession()
	const {data: roms, error} = useRoms()
	const {data: currentUser, error: userError} = useLoggedInUser()
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

	const handleLogout = useCallback(() => {
		logout().catch((e) => console.error(e))
	}, [logout])

	console.log({roms, currentUser, error, userError})

	return (
		<div>
			home <button onClick={handleLogout}>logout</button>
		</div>
	)
}
