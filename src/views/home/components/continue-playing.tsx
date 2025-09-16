import ContinuePlayingRom from './continue-playing-rom'
import ScrollableSection from '@/components/ui/scrollable-section'
import useRecentlyPlayed from '@/hooks/api/use-recently-played'
import ContinuePlayingRomSkeleton from './continue-playing-rom-skeleton'

export default function ContinuePlaying() {
	const {data: roms, isLoading} = useRecentlyPlayed()

	return (
		<ScrollableSection title='Continue Playing' itemsLength={roms?.length ?? 0} isScrollButtonDisabled={isLoading}>
			{isLoading
				? new Array(7).fill(<ContinuePlayingRomSkeleton />)
				: roms?.map((rom) => <ContinuePlayingRom key={rom.id} rom={rom} />)}
		</ScrollableSection>
	)
}
