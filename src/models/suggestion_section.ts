import {Rom} from './rom'

export type SuggestionSection = {
	items: Rom[]
	title: string
	kind:
		| 'verified'
		| 'favorite'
		| 'retroachievements'
		| 'collection'
		| {platform: {slug: string; is_unidentified: boolean}}
		| {fileSize: {size: number}}
}
