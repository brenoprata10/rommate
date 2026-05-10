import {Rom} from './rom'

export type SuggestionSection = {
	items: Rom[]
	title: string
	kind: 'verified' | 'favorite' | {fileSize: {size: number}}
}
