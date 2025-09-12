import Heading from '@/components/ui/heading'
import {Rom} from '@/models/rom'

export default function ContinuePlaying({roms}: {roms: Rom[]}) {
	return (
		<div className='flex flex-col gap-5'>
			<Heading variant={'h3'}>Continue Playing</Heading>
			<div className='flex gap-6 box-border'>
				{roms.map((rom) => (
					<div key={rom.id} className='grid grid-cols-[14.875rem_16.812rem] max-w-[31.688rem] w-full'>
						<img
							className='min-w-[14.875rem] aspect-[2/3] object-cover rounded-md'
							width={238}
							height={356}
							src={`http://192.168.178.20:8089/${rom.pathCoverLarge}`}
						/>
						<div className='pt-[1.375rem] px-[1.375rem]'>
							<Heading variant={'h2'}>{rom.name}</Heading>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
