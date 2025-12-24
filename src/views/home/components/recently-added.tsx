import ScrollableSection from '@/components/ui/scrollable-section'
import useRecentlyAdded from '@/hooks/api/use-recently-added'
import GameCover from '@/components/ui/game-cover'
import RecentlyAddedSkeleton from './recently-added-skeleton'

export default function RecentlyAdded({onHover}: {onHover: (romId: number) => void}) {
	const {data: roms, isLoading} = useRecentlyAdded()

	return (
		<ScrollableSection
			title='Recently Added'
			itemsLength={roms?.length ?? 0}
			itemGap='18px'
			isScrollButtonDisabled={isLoading}
			className='w-max'
		>
			{isLoading
				? new Array(15).fill(<RecentlyAddedSkeleton />)
				: roms?.map((rom) => (
						<GameCover
							key={rom.id}
							id={rom.id}
							src={rom.pathCoverLarge}
							width='145px'
							height='193px'
							onHover={() => onHover(rom.id)}
						/>
					))}
		</ScrollableSection>
	)
}
