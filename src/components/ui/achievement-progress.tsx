import RetroachievementProgress from '@/components/ui/retroachievement-progress'
import useServerUrl from '@/hooks/use-server-url'
import {RetroAchievement, RetroAchievementsMetadata} from '@/models/retroachievements'
import clsx from 'clsx'
import useRetroachievements from '@/hooks/use-retroachievements'

export default function AchievementProgress({
	contentClassName,
	rom,
	maxLockedAchievementCount,
	maxUnlockedAchievementCount
}: {
	contentClassName?: string
	rom: {raId: number; mergedRaMetadata: RetroAchievementsMetadata}
	maxUnlockedAchievementCount?: number
	maxLockedAchievementCount?: number
}) {
	const {lockedAchievements, unlockedAchievements, progressPercentage, totalAchievementsCount, userRomAchievements} =
		useRetroachievements({raId: rom.raId, availableAchievements: rom.mergedRaMetadata})

	return (
		<div className='flex flex-col gap-2'>
			<RetroachievementProgress value={progressPercentage} />
			<span className='text-sm font-medium text-neutral-400 self-end'>
				{userRomAchievements?.numAwarded ?? 0}/{totalAchievementsCount} Unlocked
			</span>
			<div className={clsx(['gap-3', contentClassName])}>
				{unlockedAchievements.slice(0, maxUnlockedAchievementCount).map((achievement, index) => (
					<Achievement key={`${achievement.ra_id}-${index}`} achievement={achievement} />
				))}
				{lockedAchievements.slice(0, maxLockedAchievementCount).map((achievement, index) => (
					<Achievement key={`${achievement.ra_id}-${index}`} isLocked achievement={achievement} />
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
