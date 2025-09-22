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
import Achievements from './components/achievements'

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
	const launchboxScore = rom?.launchboxMetadata?.communityRating
	const hideScore = (!igdbScore || igdbScore === '0.0') && !ssScore

	if (!rom) {
		return null
	}

	return (
		<Background backgroundImageUrl={backgroundImageURL}>
			<motion.div
				initial={{opacity: 0, translateX: -5}}
				animate={{opacity: 1, translateX: 0}}
				className='px-header w-full pb-12'
			>
				<div className='flex justify-between items-end'>
					<div className='z-10 py-12 gap-9 flex flex-col'>
						<Heading variant={'h1'}>{rom?.name}</Heading>
						<ContinuePlayingRom rom={rom} hideTitle />
					</div>
					<RomCarousel className='max-xl:hidden' images={screenshots} />
				</div>
				<div className='flex gap-6 max-[1110px]:flex-col'>
					<div className='grid gap-6 grid-cols-2 max-xl:grid-cols-1 w-full h-fit'>
						{rom.summary && (
							<MarkdownCard id={'description'} disableDialog title='Description' markdownData={rom.summary} />
						)}
						{!hideScore && (
							<Score
								igdbScore={igdbScore ? Number(igdbScore) : undefined}
								ssScore={ssScore ? Number(ssScore) * 10 : undefined}
								launchboxScore={launchboxScore}
							/>
						)}
						{notes && (
							<MarkdownCard
								id={'notes'}
								className='max-xl:col-span-1 max-[1650px]:col-span-2'
								title='Notes'
								markdownData={notes}
							/>
						)}
						{!isGameSavesEmpty && (
							<GameData
								saves={gameSaves ?? []}
								states={gameStates ?? []}
								className='max-xl:col-span-1 max-[1650px]:col-span-2'
							/>
						)}
					</div>
					<div className='flex flex-col gap-6'>
						<About rom={rom} />
						{rom.mergedRaMetadata && rom.raId && (
							<Achievements raId={rom.raId} availableAchievements={rom.mergedRaMetadata} />
						)}
					</div>
				</div>
			</motion.div>
		</Background>
	)
}
