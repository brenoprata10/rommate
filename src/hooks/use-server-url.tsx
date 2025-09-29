import {useContext} from 'react'
import {CommonContext} from '@/context'

export default function useServerUrl() {
	const {serverURL} = useContext(CommonContext)

	return serverURL
}
