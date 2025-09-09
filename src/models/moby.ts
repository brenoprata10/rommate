export type MobyMetadata = {
	moby_score: string | null
	genres: string[] | null
	alternate_titles: string[] | null
	platforms: MobyPlatform[]
}

type MobyPlatform = {
	moby_id: number
	name: string
}
