import HeroCard from '@/components/ui/hero-card'
import {RetroAchievementsMetadata} from '@/models/retroachievements'
import AchievementProgress from '@/components/ui/achievement-progress'

export default function Achievements({rom}: {rom: {raId: number; mergedRaMetadata: RetroAchievementsMetadata}}) {
	return (
		<HeroCard
			id={'achievements-card'}
			title='Achievements'
			component={
				<AchievementProgress
					contentClassName='flex flex-col gap-2 max-[1110px]:flex-row'
					rom={rom}
					maxAchievementCount={4}
				/>
			}
			dialogComponent={<AchievementProgress contentClassName='grid grid-cols-3 gap-6' rom={rom} />}
		/>
	)
}
