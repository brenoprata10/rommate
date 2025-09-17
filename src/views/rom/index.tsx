import Background from '@/components/ui/background'
import Heading from '@/components/ui/heading'
import useRom from '@/hooks/api/use-rom'
import useBackgroundImage from '@/hooks/use-background-image'
import {useParams} from 'react-router'
import {motion} from 'motion/react'
import ContinuePlayingRom from '../home/components/continue-playing-rom'
import useServerUrl from '@/hooks/use-server-url'
import RomCarousel from '@/components/ui/rommate-carousel'
import ContentCard from '@/components/ui/content-card'

export default function RomDetail() {
	const params = useParams()
	const serverURL = useServerUrl()
	const romId = Number(params.id)
	const {data: rom} = useRom({id: romId})
	const backgroundImageURL = useBackgroundImage({romId})
	const screenshots = [...(rom?.mergedScreenshots ?? [])].map((screenshot) => `${serverURL}/${screenshot}`).reverse()

	if (!rom) {
		return null
	}

	return (
		<Background backgroundImageUrl={backgroundImageURL}>
			<motion.div
				initial={{opacity: 0, translateX: -5}}
				animate={{opacity: 1, translateX: 0}}
				className='px-header w-full'
			>
				<div className='flex justify-between items-end'>
					<div className='z-10 py-12 gap-9 flex flex-col'>
						<Heading variant={'h1'}>{rom?.name}</Heading>
						<ContinuePlayingRom rom={rom} hideTitle />
					</div>
					<RomCarousel images={screenshots} />
				</div>
				<ContentCard title='Description'>{rom.summary}</ContentCard>
			</motion.div>
		</Background>
	)
}
