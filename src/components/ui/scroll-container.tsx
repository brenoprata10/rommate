import {useSidebar} from './sidebar'

export default function ScrollContainer({
	children,
	scrollRef
}: {
	children: React.ReactNode
	scrollRef: React.RefObject<HTMLDivElement | null>
}) {
	const {width: sidebarWidth} = useSidebar()

	return (
		<div
			ref={scrollRef}
			className={'flex gap-6 w-full overflow-auto scrollbar-hidden'}
			style={{
				maxWidth: `calc(100vw - ${sidebarWidth})`
			}}
		>
			{children}
		</div>
	)
}
