import {DownloadEvent} from '@/utils/downloader'
import {v4 as uuidv4} from 'uuid'

export type TCommonState = {
	focusedRomId?: number | null
	isSearchDialogOpened: boolean
	ongoingDownloads: DownloadEvent[]
	pendingDownloads: Array<{id: string} & {type: 'rom'; romId: number}>
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
	ADD_ROM_DOWNLOAD_TO_QUEUE = 'ADD_ROM_DOWNLOAD_TO_QUEUE',
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
	| {type: ActionEnum.ADD_ROM_DOWNLOAD_TO_QUEUE; payload: {romId: number}}
	| {type: ActionEnum.START_DOWNLOAD; payload: {event: DownloadEvent}}
	| {type: ActionEnum.UPDATE_DOWNLOAD; payload: {event: DownloadEvent}}
	| {type: ActionEnum.FINISH_DOWNLOAD; payload: {event: DownloadEvent}}

export const reducer = (state: TCommonState, action: Action): TCommonState => {
	switch (action.type) {
		case ActionEnum.SET_FOCUSED_ROM:
			return {...state, focusedRomId: action.payload.romId}
		case ActionEnum.TOGGLE_SEARCH_DIALOG:
			return {...state, isSearchDialogOpened: !state.isSearchDialogOpened}
		case ActionEnum.ADD_ROM_DOWNLOAD_TO_QUEUE:
			return {
				...state,
				pendingDownloads: [...state.pendingDownloads, {id: uuidv4(), romId: action.payload.romId, type: 'rom'}]
			}
		case ActionEnum.START_DOWNLOAD: {
			const {event} = action.payload

			return {
				...state,
				ongoingDownloads: [...state.ongoingDownloads, event],
				pendingDownloads: state.pendingDownloads.filter((download) => download.id !== event.id)
			}
		}
		case ActionEnum.UPDATE_DOWNLOAD: {
			const otherDownloads = state.ongoingDownloads.filter((download) => download.id !== action.payload.event.id)
			return {...state, ongoingDownloads: [...otherDownloads, action.payload.event]}
		}
		case ActionEnum.FINISH_DOWNLOAD: {
			const {event} = action.payload

			return {
				...state,
				ongoingDownloads: state.ongoingDownloads.filter((download) => download.id !== event.id),
				finishedDownloads: [...state.finishedDownloads, event]
			}
		}
		default:
			throw new Error('Action not defined.')
	}
}
