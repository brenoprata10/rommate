import {useCallback} from 'react'
import useStore from './useStore'
import {useNavigate} from 'react-router'

const ROMM_SESSION_KEY = 'romm_session'

export default function useRommSession() {
	const {get, deleteKey} = useStore()
	const navigate = useNavigate()

	const isAuthenticated = useCallback(async () => {
		const rommSession = await get<string>(ROMM_SESSION_KEY)
		return Boolean(rommSession)
	}, [get])

	const logout = useCallback(async () => {
		deleteKey(ROMM_SESSION_KEY)
		navigate('/login')
	}, [deleteKey, navigate])

	return {isAuthenticated, logout}
}
