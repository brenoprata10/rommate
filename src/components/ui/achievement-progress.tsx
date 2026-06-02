import RetroachievementProgress from '@/components/ui/retroachievement-progress'
import useServerUrl from '@/hooks/use-server-url'
import {RetroAchievement, RetroAchievementsMetadata} from '@/models/retroachievements'
import clsx from 'clsx'
import useRetroachievements from '@/hooks/use-retroachievements'
import {useMemo} from 'react'

export default function AchievementProgress({
	className,
	contentClassName,
	rom,
	truncateDescription,
	maxAchievementCount,
	randomizeOrder
}: {
	className?: string
	contentClassName?: string
	rom: {raId: number; mergedRaMetadata: RetroAchievementsMetadata}
	truncateDescription?: boolean
	maxAchievementCount?: number
	randomizeOrder?: boolean
}) {
	console.log(rom)
	const {lockedAchievements, unlockedAchievements, progressPercentage, totalAchievementsCount, userRomAchievements} =
		useRetroachievements({raId: rom.raId, availableAchievements: rom.mergedRaMetadata})

	const achievements = useMemo(
		() =>
			[
				...unlockedAchievements.map((achievement) => ({...achievement, isLocked: false})),
				...lockedAchievements.map((achievement) => ({...achievement, isLocked: true}))
			].sort(() => (randomizeOrder ? Math.random() - 0.5 : 0)),
		[unlockedAchievements, lockedAchievements, randomizeOrder]
	)

	if (achievements.length === 0) {
		return null
	}

	return (
		<div className={clsx('flex flex-col gap-2', className)}>
			<RetroachievementProgress value={progressPercentage} />
			<span className='text-sm font-medium text-neutral-400 self-end'>
				{userRomAchievements?.numAwarded ?? 0}/{totalAchievementsCount} Unlocked
			</span>
			<div className={clsx(['flex gap-3', contentClassName])}>
				{achievements.slice(0, maxAchievementCount).map((achievement) => (
					<Achievement
						key={achievement.ra_id}
						achievement={achievement}
						truncateDescription={truncateDescription}
						isLocked={achievement.isLocked}
					/>
				))}
			</div>
		</div>
	)
}

const Achievement = ({
	achievement,
	isLocked,
	truncateDescription
}: {
	achievement: RetroAchievement
	isLocked?: boolean
	truncateDescription?: boolean
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
				<span className='text-neutral-300 font-medium text-sm line-clamp-2'>{achievement.title}</span>
			</div>
			<span className={clsx('font-medium text-sm text-neutral-400', truncateDescription && 'line-clamp-2')}>
				{achievement.description}
			</span>
		</div>
	)
}
