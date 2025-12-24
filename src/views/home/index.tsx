import Heading from '@/components/ui/heading'
import useLoggedInUser from '@/hooks/api/use-logged-in-user'
import {useCallback, useEffect, useState} from 'react'
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
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/components/ui/alert-dialog'

export default function Home() {
	const {focusedRomId, setFocusedGame} = useFocusedGame()
	const [authError, setAuthError] = useState<string | null>(null)
	const {checkAuthentication} = useRommSession()
	const {data: recentlyPlayedRoms} = useRecentlyPlayed()
	const {data: currentUser} = useLoggedInUser()
	const navigate = useNavigate()

	useEffect(() => {
		checkAuthentication().catch((error) => {
			setAuthError(error.toString())
		})
	}, [checkAuthentication])

	useMount(async () => {
		const update = await check()
		if (update) {
			navigate('/updater')
		}
	})

	const handleAuthErrorModalAction = useCallback(() => {
		navigate('/login')
	}, [navigate])

	const onHoverRom = useCallback(
		(romId: number) => {
			setFocusedGame(romId)
		},
		[setFocusedGame]
	)

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
					{recentlyPlayedRoms && recentlyPlayedRoms?.length > 0 && <ContinuePlaying onHover={onHoverRom} />}
					<RecentlyAdded onHover={onHoverRom} />
				</div>
			</div>
			<Background romId={focusedRomId ?? recentlyPlayedRoms?.[0]?.id}>&nbsp;</Background>
			<AlertDialog open={Boolean(authError)}>
				<AlertDialogContent className='bg-card text-card-foreground'>
					<AlertDialogHeader>
						<AlertDialogTitle>Failed to authenticate!</AlertDialogTitle>
						<AlertDialogDescription>{authError}</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogAction onClick={handleAuthErrorModalAction}>Close</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
