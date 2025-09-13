import ContinuePlayingRom from './continue-playing-rom'
import ScrollableSection from '@/components/ui/scrollable-section'
import useRecentlyPlayed from '@/hooks/api/use-recently-played'
import Heading from '@/components/ui/heading'

export default function ContinuePlaying() {
	const {data: roms} = useRecentlyPlayed()

	if (!roms || roms.length === 0) {
		return (
			<div>
				<Heading variant={'h4'}>No roms are available.</Heading>
			</div>
		)
	}

	return (
		<ScrollableSection title='Continue Playing' itemsLength={roms.length}>
			{roms.map((rom) => (
				<ContinuePlayingRom key={rom.id} rom={rom} />
			))}
		</ScrollableSection>
	)
}
