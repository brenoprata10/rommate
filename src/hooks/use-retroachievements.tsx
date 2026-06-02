import useLoggedInUser from '@/hooks/api/use-logged-in-user'
import {RetroAchievementsMetadata} from '@/models/retroachievements'

export default function useRetroachievements({
	raId,
	availableAchievements
}: {
	raId: number
	availableAchievements: RetroAchievementsMetadata
}) {
	const {data: currentUser} = useLoggedInUser()

	const userRomAchievements = currentUser?.raProgression?.results?.find((achievement) => achievement.romRaId === raId)
	const userUnlockedAchievementsIds = userRomAchievements?.earnedAchievements
		.sort((a1, a2) => (new Date(a1.date) > new Date(a2.date) ? 1 : -1))
		.map((achievement) => achievement.id)
	const unlockedAchievements = availableAchievements.achievements.filter((achievement) =>
		userUnlockedAchievementsIds?.includes(achievement.badgeId)
	)
	const lockedAchievements = availableAchievements.achievements.filter(
		(achievement) => !userUnlockedAchievementsIds?.includes(achievement.badgeId)
	)
	const progressPercentage = userRomAchievements
		? (userRomAchievements.numAwarded * 100) / userRomAchievements.maxPossible
		: 0
	const totalAchievementsCount = availableAchievements.achievements.length

	return {progressPercentage, unlockedAchievements, lockedAchievements, totalAchievementsCount, userRomAchievements}
}
