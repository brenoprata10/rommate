export type Platform = {
	id: number
	slug: string
	fsSlug: string
	romCount: number
	name: string
	igdbSlug: string | null
	mobySlug: string | null
	customName: string | null
	igdbId: number | null
	sgdbId: number | null
	mobyId: number | null
	launchboxId: number | null
	ssId: number | null
	raId: number | null
	hasheousId: number | null
	tgdbId: number | null
	category: string | null
	generation: number | null
	familyName: string | null
	familySlug: string | null
	url: string | null
	urlLogo: string | null
	aspectRatio: string
	createdAt: string
	updatedAt: string
	fsSizeBytes: number
	isUnidentified: boolean
	isIdentified: boolean
	missingFromFs: boolean
	displayName: string
}
