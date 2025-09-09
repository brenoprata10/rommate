export type LaunchBoxMetadata = {
	firstReleaseDate?: number
	maxPlayers?: number
	releaseType?: string
	cooperative?: boolean
	youtubeVideoId?: string
	communityRating?: number
	wikipediaUrl?: string
	esrb?: string
	genres?: string[]
	companies?: string[]
	images?: LaunchBoxImage[]
}

interface LaunchBoxImage {
	url?: string
	type?: string
	region?: string
}
