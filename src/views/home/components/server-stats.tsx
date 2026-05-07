import useServerStats from '@/hooks/api/use-stats'
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip'
import bytes from 'bytes'
import React from 'react'
import {Save, Gamepad2, Library, Camera, File, Pin} from 'lucide-react'
import {motion} from 'motion/react'
import {ServerStat} from '@/models/stat'

const STAT_ITEM_CONFIG: Record<
	keyof ServerStat,
	{
		id: string
		icon: React.ComponentType<{width: number; height: number}>
		tooltip: string
		getValue: (serverStats: ServerStat) => string | number
	}
> = {
	platforms: {
		id: 'platforms',
		icon: Library,
		tooltip: 'Platforms',
		getValue: (serverStats) => serverStats.platforms
	},
	roms: {
		id: 'roms',
		icon: Gamepad2,
		tooltip: 'Roms',
		getValue: (serverStats) => serverStats.roms
	},
	saves: {
		id: 'saves',
		icon: Save,
		tooltip: 'Saves',
		getValue: (serverStats) => serverStats.saves
	},
	states: {
		id: 'states',
		icon: Pin,
		tooltip: 'States',
		getValue: (serverStats) => serverStats.states
	},
	screenshots: {
		id: 'screenshots',
		icon: Camera,
		tooltip: 'Screenshots',
		getValue: (serverStats) => serverStats.screenshots
	},
	totalFilesizeBytes: {
		id: 'totalFilesizeBytes',
		icon: File,
		tooltip: 'Size on Disk',
		getValue: (serverStats) => bytes(serverStats.totalFilesizeBytes) ?? '-'
	}
}

export default function ServerStatsCard() {
	const {data: serverStats, isLoading, isError} = useServerStats()

	if (isLoading || isError || !serverStats) {
		return null
	}

	return (
		<motion.div
			className='flex items-center h-fit py-3.5 px-2 divide-x divide-muted bg-card rounded-3xl min-w-[441px] justify-center shadow shadow-muted overflow-hidden'
			initial={{opacity: 0, translateX: 20}}
			animate={{opacity: 1, translateX: 0}}
		>
			{Object.values(STAT_ITEM_CONFIG).map((statItem) => (
				<Tooltip key={statItem.id}>
					<TooltipTrigger>
						<StatItem icon={<statItem.icon width={18} height={18} />} value={statItem.getValue(serverStats)} />
					</TooltipTrigger>
					<TooltipContent sideOffset={10}>
						<span>{statItem.tooltip}</span>
					</TooltipContent>
				</Tooltip>
			))}
		</motion.div>
	)
}

const StatItem = ({icon, value}: {icon: React.ReactNode; value: string | number}) => {
	return (
		<div className='flex gap-2.5 items-center px-3'>
			{icon}
			<span className='!text-sm'>{value}</span>
		</div>
	)
}
