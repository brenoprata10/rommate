import {useCallback, useContext} from 'react'
import {CommonContext, CommonDispatchContext} from '@/context'
import {ActionEnum} from '@/reducer'

export default function useSearchDialog() {
	const dispatch = useContext(CommonDispatchContext)
	const isSearchDialogOpened = useContext(CommonContext).isSearchDialogOpened

	const toggleSearchDialog = useCallback(() => {
		dispatch({type: ActionEnum.TOGGLE_SEARCH_DIALOG})
	}, [dispatch])

	return {isSearchDialogOpened, toggleSearchDialog}
}
