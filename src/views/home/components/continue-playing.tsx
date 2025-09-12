import Heading from '@/components/ui/heading'
import {useSidebar} from '@/components/ui/sidebar'
import {Rom} from '@/models/rom'
import ContinuePlayingRom from './continue-playing-rom'

export default function ContinuePlaying({roms}: {roms: Rom[]}) {
	const {width: sidebarWidth} = useSidebar()

	return (
		<div className='flex flex-col gap-5'>
			<Heading variant={'h3'} className='px-header'>
				Continue Playing
			</Heading>
			<div
				className={'flex gap-6 w-full overflow-auto'}
				style={{
					maxWidth: `calc(100vw - ${sidebarWidth})`
				}}
			>
				{roms.map((rom) => (
					<ContinuePlayingRom key={rom.id} rom={rom} className='ml-header' />
				))}
			</div>
		</div>
	)
}
