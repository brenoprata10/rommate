import HeroCard from '@/components/ui/hero-card'
import {Progress} from '@/components/ui/progress'
import useLoggedInUser from '@/hooks/api/use-logged-in-user'
import useServerUrl from '@/hooks/use-server-url'
import {RetroAchievement, RetroAchievementsMetadata} from '@/models/retroachievements'
import {RAResults} from '@/models/user'
import clsx from 'clsx'

const MAX_ITEMS_COLLAPSED = 3
const MAX_ITEMS_LOCKED_COLLAPSED = 3

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
	const totalAchievementsCount = availableAchievements.achievements.length

	return (
		<HeroCard
			id={'achievements-card'}
			title='Achievements'
			component={
				<AchievementCardWrapper
					contentClassName='flex flex-col gap-2 max-[1110px]:flex-row'
					value={value}
					userRomAchievements={userRomAchievements}
					unlockedAchievements={unlockedAchievements.slice(0, MAX_ITEMS_COLLAPSED)}
					lockedAchievements={lockedAchievements.slice(0, MAX_ITEMS_LOCKED_COLLAPSED)}
					totalAchievementsCount={totalAchievementsCount}
				/>
			}
			dialogComponent={
				<AchievementCardWrapper
					contentClassName='grid grid-cols-3 gap-6'
					value={value}
					userRomAchievements={userRomAchievements}
					unlockedAchievements={unlockedAchievements}
					lockedAchievements={lockedAchievements}
					totalAchievementsCount={totalAchievementsCount}
				/>
			}
		/>
	)
}

const AchievementCardWrapper = ({
	value,
	userRomAchievements,
	lockedAchievements,
	unlockedAchievements,
	contentClassName,
	totalAchievementsCount
}: {
	value: number
	userRomAchievements?: RAResults
	lockedAchievements: RetroAchievement[]
	unlockedAchievements: RetroAchievement[]
	contentClassName?: string
	totalAchievementsCount?: number
}) => {
	return (
		<div className='flex flex-col gap-2'>
			<Progress value={value} className={'!bg-[#644F10] h-1'} indicatorClassName={'!bg-[#D97706]'} />
			<span className='text-sm font-medium text-neutral-400 self-end'>
				{userRomAchievements?.numAwarded ?? 0}/{totalAchievementsCount} Unlocked
			</span>
			<div className={clsx(['gap-3', contentClassName])}>
				{unlockedAchievements.map((achievement) => (
					<Achievement key={achievement.ra_id} achievement={achievement} />
				))}
				{lockedAchievements.map((achievement) => (
					<Achievement key={achievement.ra_id} isLocked achievement={achievement} />
				))}
			</div>
		</div>
	)
}

const Achievement = ({achievement, isLocked}: {achievement: RetroAchievement; isLocked?: boolean}) => {
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
		</div>
	)
}
