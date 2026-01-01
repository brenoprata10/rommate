import Background from '@/components/ui/background'
import Heading from '@/components/ui/heading'
import useRom from '@/hooks/api/use-rom'
import {useParams} from 'react-router'
import {motion} from 'motion/react'
import ContinuePlayingRom from '../home/components/continue-playing-rom'
import RomCarousel from '@/components/ui/rommate-carousel'
import MarkdownCard from '@/components/ui/markdown-card'
import useLoggedInUser from '@/hooks/api/use-logged-in-user'
import GameData from './components/game-data'
import About from './components/about'
import Score from './components/score'
import Achievements from './components/achievements'
import RomCollections from './components/collections'

export default function RomDetail() {
	const params = useParams()
	const {data: user} = useLoggedInUser()
	const romId = Number(params.id)
	const {data: rom, isLoading: isLoadingRom} = useRom({id: romId})
	const notes = rom?.allUserNotes?.filter((note) => note.userId === user?.id)

	// Score
	const igdbScore = rom?.igdbMetadata?.totalRating
	const ssScore = rom?.ssMetadata?.ssScore
	const launchboxScore = rom?.launchboxMetadata?.communityRating
	const hideScore = (!igdbScore || igdbScore === '0.0') && !ssScore && !launchboxScore

	if (!rom || isLoadingRom) {
		return null
	}

	return (
		<div className='flex flex-col w-full'>
			<motion.div
				className='px-header w-full pb-12 z-[1]'
				initial={{opacity: 0, translateX: -10}}
				animate={{opacity: 1, translateX: 0}}
			>
				<div className='flex justify-between items-end'>
					<div className='z-10 py-12 gap-9 flex flex-col'>
						<Heading variant={'h1'}>{rom?.name}</Heading>
						<ContinuePlayingRom rom={rom} hideTitle />
					</div>
					<RomCarousel className='max-xl:hidden' images={rom?.mergedScreenshots ?? []} />
				</div>
				<div className='flex gap-6 max-[1110px]:flex-col'>
					<div className='grid gap-6 grid-cols-2 w-full h-fit'>
						{rom.summary && (
							<MarkdownCard
								id={'description'}
								disableDialog
								className='max-xl:col-span-2'
								title='Description'
								markdownData={rom.summary}
							/>
						)}
						{!hideScore && (
							<Score
								igdbScore={igdbScore ? Number(igdbScore) : undefined}
								ssScore={ssScore ? Number(ssScore) * 10 : undefined}
								launchboxScore={launchboxScore}
							/>
						)}
						{notes?.map((note) => (
							<MarkdownCard
								key={note.id}
								className='max-[1450px]:col-span-2'
								id={note.id.toString()}
								title={`${note.title} ${!note.isPublic ? '🔒' : ''}`}
								markdownData={note.content ?? ''}
							/>
						))}
						<GameData
							className='max-[1450px]:col-span-2'
							userId={user?.id}
							userStates={rom.userStates}
							userSaves={rom.userSaves}
						/>
						<RomCollections romId={romId} />
					</div>
					<div className='flex flex-col gap-6'>
						<About rom={rom} />
						{rom.mergedRaMetadata && rom.raId && (
							<Achievements raId={rom.raId} availableAchievements={rom.mergedRaMetadata} />
						)}
					</div>
				</div>
			</motion.div>

			<Background romId={rom.id}>&nbsp;</Background>
		</div>
	)
}
