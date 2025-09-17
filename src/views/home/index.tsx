import Heading from '@/components/ui/heading'
import useLoggedInUser from '@/hooks/api/use-logged-in-user'
import {useCallback, useEffect, useState} from 'react'
import {useNavigate} from 'react-router'
import ContinuePlaying from './components/continue-playing'
import useRommSession from '@/hooks/use-romm-session'
import useBackgroundImage from '@/hooks/use-background-image'
import RecentlyAdded from './components/recently-added'
import Background from '@/components/ui/background'
import {Skeleton} from '@/components/ui/skeleton'
import SkeletonWrapper from '@/components/ui/skeleton-wrapper'
import {motion} from 'motion/react'
import useRecentlyPlayed from '@/hooks/api/use-recently-played'
import {debounce} from 'lodash'

export default function Home() {
	const [featuredRomId, setFeaturedRomId] = useState<number | null>(null)
	const {isAuthenticated} = useRommSession()
	const {data: roms} = useRecentlyPlayed()
	const backgroundImageUrl = useBackgroundImage({romId: featuredRomId ?? roms?.[0].id})
	const {data: currentUser} = useLoggedInUser()
	const navigate = useNavigate()

	useEffect(() => {
		const checkAuthentication = async () => {
			const isLoggedIn = await isAuthenticated()
			if (!isLoggedIn) {
				navigate('/login')
			}
		}

		checkAuthentication()
	}, [navigate, isAuthenticated])

	const onHoverRom = useCallback(
		debounce(
			(romId: number) => {
				setFeaturedRomId(romId)
			},
			500,
			{trailing: true}
		),
		[]
	)

	return (
		<Background backgroundImageUrl={backgroundImageUrl}>
			<div className='z-10 py-12 gap-9 flex flex-col'>
				<Heading variant={'h1'} className='px-header flex gap-2'>
					<span>Welcome</span>
					{currentUser?.username ? (
						<motion.span animate={{opacity: 1}} initial={{opacity: 0}}>
							{currentUser?.username}
						</motion.span>
					) : (
						<SkeletonWrapper>
							<Skeleton className='h-[3rem] w-[15rem]' />
						</SkeletonWrapper>
					)}
				</Heading>
				<div className='grid gap-8'>
					<ContinuePlaying onHover={onHoverRom} />
					<RecentlyAdded onHover={onHoverRom} />
				</div>
			</div>
		</Background>
	)
}
