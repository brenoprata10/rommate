import {SuggestionSection} from '@/models/suggestion_section'
import GameCover from '@/components/ui/game-cover'
import ScrollableSection from '@/components/ui/scrollable-section'
import {HeartIcon} from 'lucide-react'

export default function FavoriteSection({data}: {data: SuggestionSection}) {
	return (
		<ScrollableSection
			title={
				<div className='flex gap-2 items-center'>
					<HeartIcon fill='red' stroke='red' /> <span>{data.title}</span>
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
