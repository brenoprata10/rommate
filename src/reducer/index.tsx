export type TCommonState = {
	focusedRomId?: number
}

export const INITIAL_STATE: TCommonState = {}

export enum ActionEnum {
	SET_FOCUSED_ROM = 'SET_FOCUSED_ROM'
}

export type Action = {
	type: ActionEnum.SET_FOCUSED_ROM
	payload: {romId: number}
}

export const reducer = (state: TCommonState, action: Action): TCommonState => {
	switch (action.type) {
		case ActionEnum.SET_FOCUSED_ROM:
			return {...state, focusedRomId: action.payload.romId}

		default:
			throw new Error('Action not defined.')
	}
}
