import {Rom} from '@/models/rom'
import ContinuePlayingRom from './continue-playing-rom'
import clsx from 'clsx'
import ScrollableSection from '@/components/ui/scrollable-section'

export default function ContinuePlaying({roms}: {roms: Rom[]}) {
	return (
		<ScrollableSection title='Continue Playing' itemsLength={roms.length}>
			{roms.map((rom) => (
				<ContinuePlayingRom key={rom.id} rom={rom} className={clsx([roms.indexOf(rom) === 0 && 'ml-header'])} />
			))}
		</ScrollableSection>
	)
}
