import ContentCard from '@/components/ui/content-card'
import {Progress} from '@/components/ui/progress'
import useLoggedInUser from '@/hooks/api/use-logged-in-user'
import {RetroAchievementsMetadata} from '@/models/retroachievements'

export default function Achievements({
	raId,
	availableAchievements
}: {
	raId: number
	availableAchievements: RetroAchievementsMetadata
}) {
	const {data: currentUser} = useLoggedInUser()

	const userRomAchievements = currentUser?.raProgression?.results.find((achievement) => achievement.romRaId === raId)
	const userUnlockedAchievementsIds = userRomAchievements?.earnedAchievements.map((achievement) => achievement.id)
	const unlockedAchievements = availableAchievements.achievements.filter((achievement) =>
		userUnlockedAchievementsIds?.includes(achievement.badgeId)
	)

	const value = userRomAchievements ? (userRomAchievements.numAwarded * 100) / userRomAchievements.maxPossible : 0

	console.log({unlockedAchievements})

	return (
		<ContentCard title='Achievements'>
			<div className='flex flex-col gap-2'>
				<Progress value={value} className={'!bg-[#644F10] h-1'} indicatorClassName={'!bg-[#D97706]'} />
				<span>
					{userRomAchievements?.numAwarded}/ {userRomAchievements?.maxPossible}
				</span>
			</div>
		</ContentCard>
	)
}
