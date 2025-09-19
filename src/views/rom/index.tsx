import Background from '@/components/ui/background'
import Heading from '@/components/ui/heading'
import useRom from '@/hooks/api/use-rom'
import useBackgroundImage from '@/hooks/use-background-image'
import {useParams} from 'react-router'
import {motion} from 'motion/react'
import ContinuePlayingRom from '../home/components/continue-playing-rom'
import useServerUrl from '@/hooks/use-server-url'
import RomCarousel from '@/components/ui/rommate-carousel'
import MarkdownCard from '@/components/ui/markdown-card'
import useLoggedInUser from '@/hooks/api/use-logged-in-user'
import GameData from './components/game-data'
import About from './components/about'
import Score from './components/score'

export default function RomDetail() {
	const params = useParams()
	const {data: user} = useLoggedInUser()
	const serverURL = useServerUrl()
	const romId = Number(params.id)
	const {data: rom} = useRom({id: romId})
	const backgroundImageURL = useBackgroundImage({romId})
	const screenshots = [...(rom?.mergedScreenshots ?? [])].map((screenshot) => `${serverURL}/${screenshot}`).reverse()
	const notes = rom?.userNotes?.find((note) => note.userId === user?.id)?.noteRawMarkdown
	const gameSaves = rom?.userSaves?.filter((save) => save.userId === user?.id)
	const gameStates = rom?.userStates?.filter((state) => state.userId === user?.id)
	const isGameSavesEmpty = (!gameSaves || gameSaves.length === 0) && (!gameStates || gameStates.length === 0)
	const igdbScore = rom?.igdbMetadata?.totalRating
	const ssScore = rom?.ssMetadata?.ssScore
	const hideScore = (!igdbScore || igdbScore === '0.0') && !ssScore

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
				<div className='flex gap-6'>
					<div className='grid gap-6 grid-cols-2 w-full h-fit'>
						<MarkdownCard title='Description' markdownData={rom.summary} />
						{!hideScore && (
							<Score
								igdbScore={igdbScore ? Number(igdbScore) : undefined}
								ssScore={ssScore ? Number(ssScore) * 10 : undefined}
							/>
						)}
						{notes && <MarkdownCard title='Notes' markdownData={notes} />}
						{!isGameSavesEmpty && <GameData saves={gameSaves ?? []} states={gameStates ?? []} />}
					</div>
					<About rom={rom} />
				</div>
			</motion.div>
		</Background>
	)
}
