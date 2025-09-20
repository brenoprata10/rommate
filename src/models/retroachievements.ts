export type RetroAchievementsMetadata = {
	firstReleaseDate: number
	genres: string[]
	companies: string[]
	achievements: RetroAchievement[]
}

export type RetroAchievement = {
	ra_id: number
	title: string
	description: string
	points: number
	num_awarded: number
	num_awarded_hardcore: number
	badgeId: string
	badgeUrlLock: string
	badgeUrl: string
	badgePath: string
	badgePathLock: string
	displayOrder: number
	type: string
}
