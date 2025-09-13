import {useSidebar} from './sidebar'

export default function ScrollContainer({
	children,
	scrollRef,
	itemGap
}: {
	children: React.ReactNode
	scrollRef: React.RefObject<HTMLDivElement | null>
	itemGap?: string
}) {
	const {width: sidebarWidth} = useSidebar()

	return (
		<div
			ref={scrollRef}
			className={'px-header flex w-full overflow-auto scrollbar-hidden'}
			style={{
				maxWidth: `calc(100vw - ${sidebarWidth})`,
				gap: itemGap
			}}
		>
			{children}
		</div>
	)
}
