import {FileConflictInfo} from '@/models/rom-save'
import {Badge} from '@/components/ui/badge'
import {getFormattedHour, getFormattedDistanceDate} from '@/utils/date'
import bytes from 'bytes'
import {FileIcon, CloudIcon} from 'lucide-react'

const BADGE_CLASSNAME = 'bg-neutral-700 text-neutral-200 text-xs font-medium'

export default function SaveSyncCard({
	data,
	type,
	onClick
}: {
	data: FileConflictInfo
	type: 'local' | 'cloud'
	onClick: () => void
}) {
	const isLocalFile = type === 'local'

	return (
		<div
			className='cursor-pointer bg-neutral-900 border border-neutral-800 rounded-md overflow-hidden flex flex-col gap-3 items-center w-full font-medium transition-colors text-neutral-200 p-3 hover:bg-neutral-800 hover:border-neutral-700'
			role='button'
			onClick={onClick}
		>
			<div className='flex gap-2'>
				{isLocalFile ? <FileIcon /> : <CloudIcon />}
				<b>{type === 'local' ? 'Local Save' : 'Cloud Save'}</b>
			</div>
			<div className='flex gap-3 flex-wrap items-center justify-center'>
				<Badge className={BADGE_CLASSNAME}>
					{getFormattedDistanceDate(data.creationDate)} - {getFormattedHour(data.creationDate)}
				</Badge>
				<Badge className={BADGE_CLASSNAME}>{bytes(data.length)}</Badge>
			</div>
		</div>
	)
}
