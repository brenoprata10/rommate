export type TCommonState = {
	focusedRomId?: number | null
	isSearchDialogOpened: boolean
}

export const INITIAL_STATE: TCommonState = {isSearchDialogOpened: false}

export enum ActionEnum {
	SET_FOCUSED_ROM = 'SET_FOCUSED_ROM',
	TOGGLE_SEARCH_DIALOG = 'TOGGLE_SEARCH_DIALOG'
}

export type Action =
	| {
			type: ActionEnum.SET_FOCUSED_ROM
			payload: {romId: number | null}
	  }
	| {type: ActionEnum.TOGGLE_SEARCH_DIALOG}

export const reducer = (state: TCommonState, action: Action): TCommonState => {
	switch (action.type) {
		case ActionEnum.SET_FOCUSED_ROM:
			return {...state, focusedRomId: action.payload.romId}
		case ActionEnum.TOGGLE_SEARCH_DIALOG:
			return {...state, isSearchDialogOpened: !state.isSearchDialogOpened}
		default:
			throw new Error('Action not defined.')
	}
}
