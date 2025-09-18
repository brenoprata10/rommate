import clsx from 'clsx'
import {Card, CardContent, CardHeader, CardTitle} from './card'
import Heading from './heading'

export default function ContentCard({
	title,
	children,
	className
}: {
	title: string
	children: React.ReactNode
	className?: string
}) {
	return (
		<Card className={clsx(['gap-3', className])}>
			<CardHeader>
				<CardTitle>
					<Heading variant={'h3'}>{title}</Heading>
				</CardTitle>
			</CardHeader>
			<CardContent className='text-neutral-400'>{children}</CardContent>
		</Card>
	)
}
