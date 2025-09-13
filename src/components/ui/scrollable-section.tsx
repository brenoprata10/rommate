import {useCallback, useRef} from 'react'
import Heading from './heading'
import Navigation from './navigation'
import ScrollContainer from './scroll-container'

export default function ScrollableSection({
	title,
	itemsLength,
	children
}: {
	title: string
	itemsLength: number
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
		<div className='flex flex-col gap-5'>
			<div className='flex justify-between'>
				<Heading variant={'h3'} className='px-header'>
					{title}
				</Heading>
				<Navigation className={'px-header'} onNext={onNext} onPrevious={onPrevious} />
			</div>

			<ScrollContainer scrollRef={scrollRef}>{children}</ScrollContainer>
		</div>
	)
}
