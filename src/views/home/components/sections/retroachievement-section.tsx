import {SuggestionSection} from '@/models/suggestion_section'
import GameCover from '@/components/ui/game-cover'
import ScrollableSection from '@/components/ui/scrollable-section'
import {Scrapper} from '@/models/enums/scrapper'
import useScrapper from '@/hooks/useScrapper'

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
			className='w-max'
		>
			{data.items.map((rom) => (
				<GameCover
					key={rom.id}
					id={rom.id}
					src={rom.pathCoverLarge}
					platformSlug={rom.platformSlug}
					width='145px'
					height='193px'
				/>
			))}
		</ScrollableSection>
	)
}
