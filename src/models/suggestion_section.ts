import {Rom} from './rom'

export enum SuggestionSectionKind {
	VERIFIED = 'verified',
	FAVORITE = 'favorite',
	RETROACHIEVEMENTS = 'retroachievements',
	COLLECTION = 'collection',
	GENRE = 'genre',
	COMPANY = 'company',
	PLAYED_RELATED = 'playedRelated',
	FAVORITE_RELATED = 'favoriteRelated',
	PLATFORM = 'platform'
}

export type SuggestionSection = {
	items: Rom[]
	title: string
} & (
	| {
			kind:
				| SuggestionSectionKind.VERIFIED
				| SuggestionSectionKind.FAVORITE
				| SuggestionSectionKind.RETROACHIEVEMENTS
				| SuggestionSectionKind.COLLECTION
				| SuggestionSectionKind.GENRE
				| SuggestionSectionKind.COMPANY
				| SuggestionSectionKind.PLAYED_RELATED
				| SuggestionSectionKind.FAVORITE_RELATED
	  }
	| {kind: SuggestionSectionKind.PLATFORM; slug: string; isUnidentified: boolean}
)
