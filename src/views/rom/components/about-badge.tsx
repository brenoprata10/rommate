import {Badge} from '@/components/ui/badge'

export default function AboutBadge({badge, label}: {badge: React.ReactNode; label: string}) {
	return (
		<Badge variant='secondary' className='pr-2 pl-0 py-0 min-h-[1.5rem]'>
			<div className='flex gap-2 justify-between items-center'>
				<div className='flex bg-neutral-700 min-h-[1.5rem] aspect-square items-center justify-center'>{badge}</div>
				<span className='py-[0.125rem] text-ellipsis overflow-hidden max-w-[11rem]'>{label}</span>
			</div>
		</Badge>
	)
}
