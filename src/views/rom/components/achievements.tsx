import ContentCard from '@/components/ui/content-card'
import {Progress} from '@/components/ui/progress'
import {Separator} from '@/components/ui/separator'
import useLoggedInUser from '@/hooks/api/use-logged-in-user'
import useServerUrl from '@/hooks/use-server-url'
import {RetroAchievement, RetroAchievementsMetadata} from '@/models/retroachievements'

export default function Achievements({
	raId,
	availableAchievements
}: {
	raId: number
	availableAchievements: RetroAchievementsMetadata
}) {
	const {data: currentUser} = useLoggedInUser()

	const userRomAchievements = currentUser?.raProgression?.results.find((achievement) => achievement.romRaId === raId)
	const userUnlockedAchievementsIds = userRomAchievements?.earnedAchievements
		.sort((a1, a2) => (new Date(a1.date) > new Date(a2.date) ? 1 : -1))
		.map((achievement) => achievement.id)
	const unlockedAchievements = availableAchievements.achievements.filter((achievement) =>
		userUnlockedAchievementsIds?.includes(achievement.badgeId)
	)
	const lockedAchievements = availableAchievements.achievements.filter(
		(achievement) => !userUnlockedAchievementsIds?.includes(achievement.badgeId)
	)
	const value = userRomAchievements ? (userRomAchievements.numAwarded * 100) / userRomAchievements.maxPossible : 0

	return (
		<ContentCard title='Achievements'>
			<div className='flex flex-col gap-2'>
				<Progress value={value} className={'!bg-[#644F10] h-1'} indicatorClassName={'!bg-[#D97706]'} />
				<span className='text-sm font-medium text-neutral-400 self-end'>
					{userRomAchievements?.numAwarded}/{userRomAchievements?.maxPossible} Unlocked
				</span>
				<div className='flex flex-col gap-3'>
					{unlockedAchievements.map((achievement) => (
						<Achievement key={achievement.ra_id} achievement={achievement} />
					))}
					{lockedAchievements.map((achievement, index) => (
						<Achievement
							key={achievement.ra_id}
							isLocked
							achievement={achievement}
							hideSeparator={index === lockedAchievements.length - 1}
						/>
					))}
				</div>
			</div>
		</ContentCard>
	)
}

const Achievement = ({
	achievement,
	hideSeparator,
	isLocked
}: {
	achievement: RetroAchievement
	hideSeparator?: boolean
	isLocked?: boolean
}) => {
	const serverURL = useServerUrl()

	return (
		<div className='flex flex-col gap-1 max-w-[11rem]'>
			<div className='flex gap-2 items-center'>
				<img
					className='rounded-md'
					src={`${serverURL}/${isLocked ? achievement.badgePathLock : achievement.badgePath}`}
					width={40}
					height={40}
				/>
				<span className='text-neutral-300 font-medium text-sm'>{achievement.title}</span>
			</div>
			<span className='font-medium text-sm text-neutral-400'>{achievement.description}</span>
			{!hideSeparator && <Separator className='mt-1' />}
		</div>
	)
}
