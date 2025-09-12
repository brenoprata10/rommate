export type IgdbMetadata = {
	totalRating: string
	aggregatedRating: string
	firstReleaseDate: number
	youtubeVideoId: (string | null)[]
	genres: string[]
	franchises: string[]
	alternativeNames: string[]
	collections: string[]
	companies: string[]
	gameModes: string[]
	platforms: IgdbPlatform[]
	expansions: IgdbExpansion[]
	dlc: IgdbDlc[]
	remasters: IgdbRemaster[]
	remakes: IgdbRemake[]
	expandedGames: IgdbExpandedGame[]
	ports: IgdbPort[]
	similarGames: IgdbSimilarGame[]
}

type IgdbPlatform = {
	igdbId: number
	name: string
}

type IgdbExpansion = {
	id: number
	name: string
	slug: string
	type: string
	coverUrl: string
}

type IgdbDlc = {
	id: number
	name: string
	slug: string
	type: string
	coverUrl: string
}

type IgdbRemaster = {
	id: number
	name: string
	slug: string
	type: string
	coverUrl: string
}

type IgdbRemake = {
	id: number
	name: string
	slug: string
	type: string
	coverUrl: string
}

type IgdbExpandedGame = {
	id: number
	name: string
	slug: string
	type: string
	coverUrl: string
}

type IgdbPort = {
	id: number
	name: string
	slug: string
	type: string
	coverUrl: string
}

type IgdbSimilarGame = {
	id: number
	name: string
	slug: string
	type: string
	coverUrl: string
}
