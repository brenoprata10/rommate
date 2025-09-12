export type MobyMetadata = {
	mobyScore: string | null
	genres: string[] | null
	alternateTitles: string[] | null
	platforms: MobyPlatform[]
}

type MobyPlatform = {
	mobyId: number
	name: string
}
