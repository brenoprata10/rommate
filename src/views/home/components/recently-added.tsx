import ScrollableSection from '@/components/ui/scrollable-section'
import useRecentlyAdded from '@/hooks/api/use-recently-added'
import GameCover from '@/components/ui/game-cover'
import RecentlyAddedSkeleton from './recently-added-skeleton'

export default function RecentlyAdded({onHover}: {onHover: (romId: number) => void}) {
	const {data: roms, isLoading} = useRecentlyAdded()

	if (isLoading) {
		return (
			<RecentlyAddedScrollWrapper romsLength={0} isLoading>
				{new Array(15).fill(<RecentlyAddedSkeleton />)}
			</RecentlyAddedScrollWrapper>
		)
	}

	return (
		<RecentlyAddedScrollWrapper romsLength={roms?.length ?? 0}>
			{roms?.map((rom) => (
				<GameCover
					key={rom.id}
					id={rom.id}
					src={rom.pathCoverLarge}
					width='145px'
					height='193px'
					onHover={() => onHover(rom.id)}
				/>
			))}
		</RecentlyAddedScrollWrapper>
	)
}

const RecentlyAddedScrollWrapper = ({
	romsLength,
	isLoading,
	children
}: {
	romsLength: number
	isLoading?: boolean
	children: React.ReactNode
}) => {
	return (
		<ScrollableSection
			title='Recently Added'
			itemsLength={romsLength}
			itemGap='18px'
			isScrollButtonDisabled={isLoading}
		>
			{children}
		</ScrollableSection>
	)
}
