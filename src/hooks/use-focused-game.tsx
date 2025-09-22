import {useCallback, useContext} from 'react'
import {CommonContext, CommonDispatchContext} from '@/context'
import {debounce} from 'lodash'
import {ActionEnum} from '@/reducer'

export default function useFocusedGame() {
	const dispatch = useContext(CommonDispatchContext)
	const focusedRomId = useContext(CommonContext).focusedRomId

	const setFocusedGame = useCallback(
		debounce(
			(romId: number) => {
				dispatch({type: ActionEnum.SET_FOCUSED_ROM, payload: {romId}})
			},
			500,
			{trailing: true}
		),
		[]
	)

	return {focusedRomId, setFocusedGame}
}
