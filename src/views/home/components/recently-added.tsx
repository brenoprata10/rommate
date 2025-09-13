import ScrollableSection from '@/components/ui/scrollable-section'
import Heading from '@/components/ui/heading'
import useRecentlyAdded from '@/hooks/api/use-recently-added'
import GameCover from '@/components/ui/game-cover'

export default function RecentlyAdded() {
	const {data: roms} = useRecentlyAdded()

	if (!roms || roms.length === 0) {
		return (
			<div>
				<Heading variant={'h4'}>No roms are available.</Heading>
			</div>
		)
	}

	return (
		<ScrollableSection title='Recently Added' itemsLength={roms.length} itemGap='18px'>
			{roms.map((rom) => (
				<GameCover key={rom.id} src={rom.pathCoverLarge} width='145px' height='217px' />
			))}
		</ScrollableSection>
	)
}
