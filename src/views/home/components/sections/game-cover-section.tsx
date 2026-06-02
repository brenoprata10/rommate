import {SuggestionSection} from '@/models/suggestion_section'
import GameCover from '@/components/ui/game-cover'
import ScrollableSection from '@/components/ui/scrollable-section'
import React from 'react'

export default function GameCoverSection({data, titleImage}: {data: SuggestionSection; titleImage?: React.ReactNode}) {
	return (
		<ScrollableSection
			title={
				<div className='flex gap-2 items-center'>
					{titleImage}
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
