import {useCallback} from 'react'
import useStore from './use-store'
import {useNavigate} from 'react-router'
import {getLoggedInUser} from '@/utils/http/user'

const ROMM_SESSION_KEY = 'romm_session'

export default function useRommSession() {
	const {get, deleteKey} = useStore()
	const navigate = useNavigate()

	const isAuthenticated = useCallback(async () => {
		const [rommSession, loggedInUser] = await Promise.all([get<string>(ROMM_SESSION_KEY), getLoggedInUser()])

		return Boolean(rommSession) && loggedInUser.success
	}, [get])

	const logout = useCallback(async () => {
		deleteKey(ROMM_SESSION_KEY)
		navigate('/login')
	}, [deleteKey, navigate])

	return {isAuthenticated, logout}
}
