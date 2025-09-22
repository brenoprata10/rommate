import clsx from 'clsx'
import {useSidebar} from './sidebar'

export default function ScrollContainer({
	children,
	scrollRef,
	padding,
	itemGap
}: {
	children: React.ReactNode
	scrollRef: React.RefObject<HTMLDivElement | null>
	padding?: string
	itemGap?: string
}) {
	const {width: sidebarWidth} = useSidebar()

	return (
		<div
			ref={scrollRef}
			className={clsx(['flex w-full overflow-auto scrollbar-hidden', padding])}
			style={{
				maxWidth: `calc(100vw - ${sidebarWidth})`,
				gap: itemGap
			}}
		>
			{children}
		</div>
	)
}
