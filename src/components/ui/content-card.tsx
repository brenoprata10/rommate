import clsx from 'clsx'
import {Card, CardContent, CardHeader, CardTitle} from './card'
import Heading from './heading'

export default function ContentCard({
	title,
	headerTrailing,
	children,
	className,
	contentClassName
}: {
	title: string
	headerTrailing?: React.ReactNode
	children: React.ReactNode
	className?: string
	contentClassName?: string
}) {
	return (
		<Card className={clsx(['gap-3', className])}>
			<CardHeader className='flex justify-between items-center'>
				<CardTitle>
					<Heading variant={'h3'}>{title}</Heading>
				</CardTitle>
				{headerTrailing}
			</CardHeader>
			<CardContent className={clsx(['text-neutral-400', contentClassName])}>{children}</CardContent>
		</Card>
	)
}
