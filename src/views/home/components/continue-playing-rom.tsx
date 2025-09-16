import {Button} from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import useServerUrl from '@/hooks/use-server-url'
import {Rom} from '@/models/rom'
import clsx from 'clsx'
import {PlayIcon} from 'lucide-react'

export default function ContinuePlayingRom({rom, className}: {rom: Rom; className?: string}) {
	const serverURL = useServerUrl()

	return (
		<div className={clsx(['grid grid-cols-[14.8rem_16.812rem] max-w-[31.688rem] w-full', className])}>
			<a href={`/rom/${rom.id}`}>
				<img
					className='border border-neutral-700  object-cover rounded-md'
					width={237}
					height={316}
					src={`${serverURL}/${rom.pathCoverLarge}`}
				/>
			</a>
			<div className='flex flex-col pt-[1.375rem] px-[1.375rem] justify-between'>
				<Heading variant={rom.name.length > 21 ? 'h3' : 'h2'} className='text-neutral-200'>
					{rom.name}
				</Heading>
				<Button
					className={`
						bg-neutral-900
						text-white 
						border 
						border-neutral-700
						hover:bg-neutral-800
						cursor-pointer
					`}
				>
					<PlayIcon /> Install
				</Button>
			</div>
		</div>
	)
}
