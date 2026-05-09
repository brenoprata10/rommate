import {SuggestionSection} from '@/models/suggestion_section'
import GameCover from '@/components/ui/game-cover'
import RecentlyAddedSkeleton from '../recently-added-skeleton'
import ScrollableSection from '@/components/ui/scrollable-section'
import useScrapper from '@/hooks/useScrapper'
import {Scrapper} from '@/models/enums/scrapper'

export default function VerifiedSection({data, isLoading}: {data: SuggestionSection; isLoading: boolean}) {
	const hasheousConfig = useScrapper(Scrapper.HASHEOUS)

	return (
		<ScrollableSection
			title={
				<div className='flex gap-2 items-center'>
					<img width={20} height={20} src={hasheousConfig.logoUrl} />
					{data.title}
				</div>
			}
			itemsLength={data.items?.length ?? 0}
			isScrollButtonDisabled={isLoading}
			className='w-max'
		>
			{isLoading
				? new Array(15).fill(<RecentlyAddedSkeleton />)
				: data.items.map((rom) => (
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
