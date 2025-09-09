export type IgdbMetadata = {
	total_rating: string
	aggregated_rating: string
	first_release_date: number
	youtube_video_id: string | null
	genres: string[]
	franchises: string[]
	alternative_names: string[]
	collections: string[]
	companies: string[]
	game_modes: string[]
	platforms: IgdbPlatform[]
	expansions: IgdbExpansion[]
	dlcs: IgdbDlc[]
	remasters: IgdbRemaster[]
	remakes: IgdbRemake[]
	expanded_games: IgdbExpandedGame[]
	ports: IgdbPort[]
	similar_games: IgdbSimilarGame[]
}

type IgdbPlatform = {
	igdb_id: number
	name: string
}

type IgdbExpansion = {
	id: number
	name: string
	slug: string
	type: string
	cover_url: string
}

type IgdbDlc = {
	id: number
	name: string
	slug: string
	type: string
	cover_url: string
}

type IgdbRemaster = {
	id: number
	name: string
	slug: string
	type: string
	cover_url: string
}

type IgdbRemake = {
	id: number
	name: string
	slug: string
	type: string
	cover_url: string
}

type IgdbExpandedGame = {
	id: number
	name: string
	slug: string
	type: string
	cover_url: string
}

type IgdbPort = {
	id: number
	name: string
	slug: string
	type: string
	cover_url: string
}

type IgdbSimilarGame = {
	id: number
	name: string
	slug: string
	type: string
	cover_url: string
}
