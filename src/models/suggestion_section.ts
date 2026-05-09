import {Rom} from './rom'

export type SuggestionSection = {
	items: Rom[]
	title: string
	kind: 'verified' | {fileSize: {size: number}}
}
