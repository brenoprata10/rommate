import {useCallback, useRef} from 'react'
import Heading from './heading'
import Navigation from './navigation'
import ScrollContainer from './scroll-container'
import clsx from 'clsx'

export default function ScrollableSection({
	title,
	className,
	itemsLength,
	itemGap = '18px',
	padding = 'px-header',
	isScrollButtonDisabled,
	children
}: {
	title: string
	className?: string
	itemsLength: number
	itemGap?: string
	isScrollButtonDisabled?: boolean
	padding?: string
	children: React.ReactNode
}) {
	const scrollRef = useRef<HTMLDivElement>(null)

	const getScrollOffset = useCallback(() => {
		if (!scrollRef.current) {
			return 0
		}
		return scrollRef.current.scrollWidth / itemsLength
	}, [itemsLength])

	const onNext = useCallback(() => {
		if (!scrollRef.current) {
			return
		}

		scrollRef.current.scrollTo({left: scrollRef.current.scrollLeft + getScrollOffset(), behavior: 'smooth'})
	}, [getScrollOffset])

	const onPrevious = useCallback(() => {
		if (!scrollRef.current) {
			return
		}

		scrollRef.current.scrollTo({left: scrollRef.current.scrollLeft - getScrollOffset(), behavior: 'smooth'})
	}, [getScrollOffset])

	return (
		<div className={clsx(['flex flex-col gap-5 w-max', className])}>
			<div className={clsx(['flex justify-between', padding])}>
				<Heading variant={'h3'}>{title}</Heading>
				<Navigation disabled={isScrollButtonDisabled} onNext={onNext} onPrevious={onPrevious} />
			</div>

			<ScrollContainer scrollRef={scrollRef} padding={padding} itemGap={itemGap}>
				{children}
			</ScrollContainer>
		</div>
	)
}
