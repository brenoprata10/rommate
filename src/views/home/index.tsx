import Heading from '@/components/ui/heading'
import useLoggedInUser from '@/hooks/api/use-logged-in-user'
import {useEffect} from 'react'
import {useNavigate} from 'react-router'
import ContinuePlaying from './components/continue-playing'
import useRommSession from '@/hooks/use-romm-session'
import useBackgroundImage from '@/hooks/use-background-image'
import RecentlyAdded from './components/recently-added'

export default function Home() {
	const {isAuthenticated} = useRommSession()
	const backgroundImageUrl = useBackgroundImage()
	const {data: currentUser, error: userError} = useLoggedInUser()
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

	console.log({currentUser, userError, backgroundImageUrl})

	return (
		<div
			className='
				after:absolute
				after:w-screen
				after:h-screen
				after:bg-black
				after:opacity-85
				after:top-0
				after:left-0
				after:z-[-1]
			'
		>
			<div
				className='absolute w-screen h-screen top-0 left-0 bg-no-repeat bg-center bg-cover z-[-1]'
				style={{
					backgroundImage: `url("${backgroundImageUrl}")`
				}}
			/>
			<div className='z-10 py-12 gap-9 flex flex-col'>
				<Heading variant={'h1'} className='px-header'>
					Welcome {currentUser?.username}
				</Heading>
				<div className='grid gap-8'>
					<ContinuePlaying />
					<RecentlyAdded />
				</div>
			</div>
		</div>
	)
}
