import {ChevronLeftIcon, ChevronRightIcon} from 'lucide-react'
import {Button} from './button'
import clsx from 'clsx'

export default function Navigation({
	className,
	disabled,
	onPrevious,
	onNext
}: {
	className?: string
	disabled?: boolean
	onPrevious: () => void
	onNext: () => void
}) {
	return (
		<div className={clsx(['flex gap-2', className])}>
			<NavigationButton disabled={disabled} onClick={onPrevious}>
				<ChevronLeftIcon />
			</NavigationButton>
			<NavigationButton disabled={disabled} onClick={onNext}>
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
