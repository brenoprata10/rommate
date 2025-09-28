import {DownloadEvent, DownloadRomEvent} from '@/utils/downloader'
import {v4 as uuidv4} from 'uuid'

export type TCommonState = {
	focusedRomId?: number | null
	isSearchDialogOpened: boolean
	ongoingDownloads: Array<DownloadEvent & {type: 'rom'; romId: number}>
	pendingDownloads: Array<{id: string} & {type: 'rom'; romId: number}>
	finishedDownloads: Array<DownloadEvent & {type: 'rom'; romId: number}>
	cancelledDownloads: Array<DownloadEvent & {type: 'rom'; romId: number}>
}

export const INITIAL_STATE: TCommonState = {
	isSearchDialogOpened: false,
	ongoingDownloads: [],
	pendingDownloads: [],
	finishedDownloads: [],
	cancelledDownloads: []
}

export enum ActionEnum {
	SET_FOCUSED_ROM = 'SET_FOCUSED_ROM',
	TOGGLE_SEARCH_DIALOG = 'TOGGLE_SEARCH_DIALOG',
	ADD_ROM_DOWNLOAD_TO_QUEUE = 'ADD_ROM_DOWNLOAD_TO_QUEUE',
	START_ROM_DOWNLOAD = 'START_DOWNLOAD',
	UPDATE_ROM_DOWNLOAD = 'UPDATE_DOWNLOAD',
	FINISH_ROM_DOWNLOAD = 'FINISH_DOWNLOAD',
	CANCEL_ROM_DOWNLOAD = 'CANCEL_ROM_DOWNLOAD',
	CLEAR_FINISHED_DOWNLOADS = 'CLEAR_FINISHED_DOWNLOADS'
}

export type Action =
	| {
			type: ActionEnum.SET_FOCUSED_ROM
			payload: {romId: number | null}
	  }
	| {type: ActionEnum.TOGGLE_SEARCH_DIALOG}
	| {type: ActionEnum.ADD_ROM_DOWNLOAD_TO_QUEUE; payload: {romId: number}}
	| {type: ActionEnum.START_ROM_DOWNLOAD; payload: {event: DownloadRomEvent}}
	| {type: ActionEnum.UPDATE_ROM_DOWNLOAD; payload: {event: DownloadRomEvent}}
	| {type: ActionEnum.FINISH_ROM_DOWNLOAD; payload: {event: DownloadRomEvent}}
	| {type: ActionEnum.CANCEL_ROM_DOWNLOAD; payload: {event: DownloadRomEvent}}
	| {type: ActionEnum.CLEAR_FINISHED_DOWNLOADS}

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
		case ActionEnum.START_ROM_DOWNLOAD: {
			const {event} = action.payload

			return {
				...state,
				ongoingDownloads: [...state.ongoingDownloads, {...event, type: 'rom'}],
				pendingDownloads: state.pendingDownloads.filter((download) => download.id !== event.id)
			}
		}
		case ActionEnum.UPDATE_ROM_DOWNLOAD: {
			const {event} = action.payload
			const updatedEventIndex = state.ongoingDownloads.findIndex((download) => download.id === event.id)
			if (updatedEventIndex === -1) {
				return state
			}
			const updatedOngoingDownloads = [...state.ongoingDownloads]
			updatedOngoingDownloads[updatedEventIndex] = {...event, type: 'rom'}

			return {...state, ongoingDownloads: updatedOngoingDownloads}
		}
		case ActionEnum.FINISH_ROM_DOWNLOAD: {
			const {event} = action.payload

			return {
				...state,
				ongoingDownloads: state.ongoingDownloads.filter((download) => download.id !== event.id),
				finishedDownloads: [...state.finishedDownloads, {...event, type: 'rom'}]
			}
		}
		case ActionEnum.CLEAR_FINISHED_DOWNLOADS: {
			return {...state, finishedDownloads: []}
		}

		case ActionEnum.CANCEL_ROM_DOWNLOAD: {
			const {event} = action.payload

			return {...state, cancelledDownloads: [...state.cancelledDownloads, {...event, type: 'rom'}]}
		}
		default:
			throw new Error('Action not defined.')
	}
}
