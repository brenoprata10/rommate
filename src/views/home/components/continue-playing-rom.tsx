import Heading from '@/components/ui/heading'
import useServerUrl from '@/hooks/use-server-url'
import {Rom} from '@/models/rom'
import clsx from 'clsx'

export default function ContinuePlayingRom({rom, className}: {rom: Rom; className?: string}) {
	const serverURL = useServerUrl()

	return (
		<div className={clsx(['grid grid-cols-[14.8rem_16.812rem] max-w-[31.688rem] w-full', className])}>
			<img
				className='border border-neutral-700 aspect-[3/4] w-full object-cover rounded-md'
				width={238}
				height={356}
				src={`${serverURL}/${rom.pathCoverLarge}`}
			/>
			<div className='pt-[1.375rem] px-[1.375rem]'>
				<Heading variant={rom.name.length > 16 ? 'h3' : 'h2'} className='text-neutral-200'>
					{rom.name}
				</Heading>
			</div>
		</div>
	)
}
