import {DownloadEvent, DownloadStartPayload} from '@/utils/downloader'

export type TCommonState = {
	focusedRomId?: number | null
	isSearchDialogOpened: boolean
	ongoingDownloads: DownloadEvent[]
	pendingDownloads: DownloadStartPayload[]
	finishedDownloads: DownloadEvent[]
}

export const INITIAL_STATE: TCommonState = {
	isSearchDialogOpened: false,
	ongoingDownloads: [],
	pendingDownloads: [],
	finishedDownloads: []
}

export enum ActionEnum {
	SET_FOCUSED_ROM = 'SET_FOCUSED_ROM',
	TOGGLE_SEARCH_DIALOG = 'TOGGLE_SEARCH_DIALOG',
	ADD_DOWNLOAD_TO_QUEUE = 'ADD_DOWNLOAD_TO_QUEUE',
	START_DOWNLOAD = 'START_DOWNLOAD',
	UPDATE_DOWNLOAD = 'UPDATE_DOWNLOAD',
	FINISH_DOWNLOAD = 'FINISH_DOWNLOAD'
}

export type Action =
	| {
			type: ActionEnum.SET_FOCUSED_ROM
			payload: {romId: number | null}
	  }
	| {type: ActionEnum.TOGGLE_SEARCH_DIALOG}
	| {type: ActionEnum.ADD_DOWNLOAD_TO_QUEUE; payload: DownloadStartPayload}
	| {type: ActionEnum.START_DOWNLOAD; payload: {event: DownloadEvent}}
	| {type: ActionEnum.UPDATE_DOWNLOAD; payload: {event: DownloadEvent}}
	| {type: ActionEnum.FINISH_DOWNLOAD; payload: {event: DownloadEvent}}

export const reducer = (state: TCommonState, action: Action): TCommonState => {
	switch (action.type) {
		case ActionEnum.SET_FOCUSED_ROM:
			return {...state, focusedRomId: action.payload.romId}
		case ActionEnum.TOGGLE_SEARCH_DIALOG:
			return {...state, isSearchDialogOpened: !state.isSearchDialogOpened}
		case ActionEnum.ADD_DOWNLOAD_TO_QUEUE:
			return {...state, pendingDownloads: [...state.pendingDownloads, action.payload]}
		case ActionEnum.START_DOWNLOAD: {
			const {event} = action.payload

			return {
				...state,
				ongoingDownloads: [...state.ongoingDownloads, event],
				pendingDownloads: state.pendingDownloads.filter((download) => download.romId !== event.data.romId)
			}
		}
		case ActionEnum.UPDATE_DOWNLOAD: {
			const otherDownloads = state.ongoingDownloads.filter(
				(download) => download.data.romId !== action.payload.event.data.romId
			)
			return {...state, ongoingDownloads: [...otherDownloads, action.payload.event]}
		}
		case ActionEnum.FINISH_DOWNLOAD: {
			const {event} = action.payload

			return {
				...state,
				ongoingDownloads: state.ongoingDownloads.filter((download) => download.data.romId !== event.data.romId),
				finishedDownloads: [...state.finishedDownloads, event]
			}
		}
		default:
			throw new Error('Action not defined.')
	}
}
