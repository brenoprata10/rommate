import {ChevronLeftIcon, ChevronRightIcon} from 'lucide-react'
import {Button} from './button'
import clsx from 'clsx'

export default function Navigation({
	className,
	onPrevious,
	onNext
}: {
	className?: string
	onPrevious: () => void
	onNext: () => void
}) {
	return (
		<div className={clsx(['flex gap-2', className])}>
			<NavigationButton onClick={onPrevious}>
				<ChevronLeftIcon />
			</NavigationButton>
			<NavigationButton onClick={onNext}>
				<ChevronRightIcon />
			</NavigationButton>
		</div>
	)
}

const NavigationButton = (props: React.ComponentProps<typeof Button>) => (
	<Button className='bg-neutral-950 text-white hover:bg-accent cursor-pointer' {...props}>
		{props.children}
	</Button>
)
