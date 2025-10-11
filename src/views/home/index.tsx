import Heading from '@/components/ui/heading'
import useLoggedInUser from '@/hooks/api/use-logged-in-user'
import {useCallback, useEffect} from 'react'
import {useNavigate} from 'react-router'
import ContinuePlaying from './components/continue-playing'
import useRommSession from '@/hooks/use-romm-session'
import RecentlyAdded from './components/recently-added'
import Background from '@/components/ui/background'
import {Skeleton} from '@/components/ui/skeleton'
import SkeletonWrapper from '@/components/ui/skeleton-wrapper'
import {motion} from 'motion/react'
import useRecentlyPlayed from '@/hooks/api/use-recently-played'
import useFocusedGame from '@/hooks/use-focused-game'
import {useMount} from 'react-use'
import {check} from '@tauri-apps/plugin-updater'
import {Button} from '@/components/ui/button'
import {playRetroarch} from '@/utils/http/retroarch'

export default function Home() {
	const {focusedRomId, setFocusedGame} = useFocusedGame()
	const {isAuthenticated} = useRommSession()
	const {data: roms} = useRecentlyPlayed()
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

	useMount(async () => {
		const update = await check()
		if (update) {
			navigate('/updater')
		}
	})

	const onHoverRom = useCallback(
		(romId: number) => {
			setFocusedGame(romId)
		},
		[setFocusedGame]
	)

	const handleRunShell = useCallback(() => {
		playRetroarch({romId: 1})
	}, [])

	return (
		<>
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
					<Button onClick={handleRunShell}>test shell</Button>
				</div>
			</div>
			<Background romId={focusedRomId ?? roms?.[0].id}>&nbsp;</Background>
		</>
	)
}
