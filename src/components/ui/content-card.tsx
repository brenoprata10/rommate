import {Card, CardContent, CardHeader, CardTitle} from './card'
import Heading from './heading'

export default function ContentCard({title, children}: {title: string; children: string}) {
	return (
		<Card className='gap-3'>
			<CardHeader>
				<CardTitle>
					<Heading variant={'h3'}>{title}</Heading>
				</CardTitle>
			</CardHeader>
			<CardContent className='text-neutral-400'>{children}</CardContent>
		</Card>
	)
}
