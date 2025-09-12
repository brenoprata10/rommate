import Heading from '@/components/ui/heading'
import useServerUrl from '@/hooks/use-server-url'
import {Rom} from '@/models/rom'

export default function ContinuePlaying({roms}: {roms: Rom[]}) {
	const serverURL = useServerUrl()

	return (
		<div className='flex flex-col gap-5'>
			<Heading variant={'h3'}>Continue Playing</Heading>
			<div
				className='
					flex gap-6 box-border max-w-[calc(100vw-var(--sidebar-width)-var(--home-page-padding)*2)] w-full overflow-auto
				'
			>
				{roms.map((rom) => (
					<div key={rom.id} className='grid grid-cols-[14.875rem_16.812rem] max-w-[31.688rem] w-full'>
						<img
							className='min-w-[14.875rem] border border-neutral-700 aspect-[2/3] object-cover rounded-md'
							width={238}
							height={356}
							src={`${serverURL}/${rom.pathCoverLarge}`}
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
