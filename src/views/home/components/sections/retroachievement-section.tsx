import {SuggestionSection} from '@/models/suggestion_section'
import GameCover from '@/components/ui/game-cover'
import ScrollableSection from '@/components/ui/scrollable-section'
import {Scrapper} from '@/models/enums/scrapper'
import useScrapper from '@/hooks/useScrapper'
import AchievementProgress from '@/components/ui/achievement-progress'

export default function RetroachievementSection({data}: {data: SuggestionSection}) {
	const retroachievementsConfig = useScrapper(Scrapper.RETROACHIEVEMENTS)

	return (
		<ScrollableSection
			title={
				<div className='flex gap-2 items-center'>
					<img width={30} height={30} src={retroachievementsConfig.logoUrl} />
					{data.title}
				</div>
			}
			itemsLength={data.items?.length ?? 0}
			itemGap='36px'
			className='w-max'
		>
			{data.items
				.filter((rom) => (rom.mergedRaMetadata?.achievements ?? []).length > 0)
				.map((rom) => (
					<div key={rom.id} className='flex gap-5 min-w-[40rem] items-center'>
						<GameCover
							id={rom.id}
							src={rom.pathCoverLarge}
							platformSlug={rom.platformSlug}
							width='145px'
							height='193px'
						/>
						{rom.raId && rom.mergedRaMetadata && (
							<AchievementProgress
								className={'w-full'}
								contentClassName='w-full mt-4'
								rom={{raId: rom.raId, mergedRaMetadata: rom.mergedRaMetadata}}
								truncateDescription
								randomizeOrder
								maxAchievementCount={3}
							/>
						)}
					</div>
				))}
		</ScrollableSection>
	)
}
