import {load} from '@tauri-apps/plugin-store'
import {useCallback} from 'react'

const STORE_PATH = 'store.json'

export default function useStore() {
	const get = useCallback(async <T>(key: string): Promise<T | undefined> => {
		const store = await load(STORE_PATH)
		return store.get<T>(key)
	}, [])

	const set = useCallback(async (key: string, value: string) => {
		const store = await load(STORE_PATH)
		store.set(key, value)
	}, [])

	const deleteKey = useCallback(async (key: string) => {
		const store = await load(STORE_PATH)
		store.delete(key)
	}, [])

	return {get, set, deleteKey}
}
