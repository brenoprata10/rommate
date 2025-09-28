import {DownloadEvent, DownloadRomEvent} from '@/utils/downloader'
import {v4 as uuidv4} from 'uuid'

export type TCommonState = {
	focusedRomId?: number | null
	isSearchDialogOpened: boolean
	downloads: Array<DownloadEvent & {type: 'rom'; romId: number}>
}

export const INITIAL_STATE: TCommonState = {
	isSearchDialogOpened: false,
	downloads: []
}

export enum ActionEnum {
	SET_FOCUSED_ROM = 'SET_FOCUSED_ROM',
	TOGGLE_SEARCH_DIALOG = 'TOGGLE_SEARCH_DIALOG',
	ADD_ROM_DOWNLOAD_TO_QUEUE = 'ADD_ROM_DOWNLOAD_TO_QUEUE',
	UPDATE_ROM_DOWNLOAD = 'UPDATE_ROM_DOWNLOAD',
	CLEAR_FINISHED_DOWNLOADS = 'CLEAR_FINISHED_DOWNLOADS'
}

export type Action =
	| {
			type: ActionEnum.SET_FOCUSED_ROM
			payload: {romId: number | null}
	  }
	| {type: ActionEnum.TOGGLE_SEARCH_DIALOG}
	| {type: ActionEnum.ADD_ROM_DOWNLOAD_TO_QUEUE; payload: {romId: number}}
	| {type: ActionEnum.UPDATE_ROM_DOWNLOAD; payload: {event: DownloadRomEvent}}
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
				downloads: [...state.downloads, {id: uuidv4(), romId: action.payload.romId, type: 'rom', event: 'pending'}]
			}
		case ActionEnum.UPDATE_ROM_DOWNLOAD: {
			const {event} = action.payload

			const updatedDownloadIndex = state.downloads.findIndex((download) => download.id === event.id)

			if (updatedDownloadIndex === -1) {
				return state
			}

			const updatedDownloads = [...state.downloads]
			updatedDownloads[updatedDownloadIndex] = {...event, type: 'rom'}

			return {
				...state,
				downloads: updatedDownloads
			}
		}
		case ActionEnum.CLEAR_FINISHED_DOWNLOADS: {
			return {
				...state,
				downloads: state.downloads.filter((download) => !['finished', 'cancelled'].includes(download.event))
			}
		}
		default:
			throw new Error('Action not defined.')
	}
}
