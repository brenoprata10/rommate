import {useCallback} from 'react'
import useStore from './use-store'
import {useNavigate} from 'react-router'
import {getLoggedInUser} from '@/utils/http/user'

const ROMM_SESSION_KEY = 'romm_session'

export default function useRommSession() {
	const {get, deleteKey} = useStore()
	const navigate = useNavigate()

	const checkAuthentication = useCallback(async () => {
		const [rommSession, loggedInUser] = await Promise.all([get<string>(ROMM_SESSION_KEY), getLoggedInUser()])

		if (!rommSession) {
			throw Error('Could not fetch rommSession token.')
		}

		if (!loggedInUser.success) {
			throw Error(loggedInUser.error)
		}
	}, [get])

	const logout = useCallback(async () => {
		deleteKey(ROMM_SESSION_KEY)
		navigate('/login')
	}, [deleteKey, navigate])

	return {checkAuthentication, logout}
}
