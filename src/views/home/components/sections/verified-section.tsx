import {SuggestionSection} from '@/models/suggestion_section'
import GameCover from '@/components/ui/game-cover'
import RecentlyAddedSkeleton from '../recently-added-skeleton'
import ScrollableSection from '@/components/ui/scrollable-section'
import useServerUrl from '@/hooks/use-server-url'

export default function VerifiedSection({data, isLoading}: {data: SuggestionSection; isLoading: boolean}) {
	const serverUrl = useServerUrl()

	return (
		<ScrollableSection
			title={
				<div className='flex gap-2 items-center'>
					<img width={16} height={16} src={`${serverUrl}/assets/scrappers/hasheous.png`} />
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
