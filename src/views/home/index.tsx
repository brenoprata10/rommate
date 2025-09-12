import Heading from '@/components/ui/heading'
import useLoggedInUser from '@/hooks/api/useLoggedInUser'
import useRoms from '@/hooks/api/useRoms'
import {useEffect} from 'react'
import {useNavigate} from 'react-router'
import ContinuePlaying from './components/continue-playing'
import useRommSession from '@/hooks/use-romm-session'

export default function Home() {
	const {isAuthenticated} = useRommSession()
	const {data: roms, error} = useRoms()
	const {data: currentUser, error: userError} = useLoggedInUser()
	const navigate = useNavigate()
	const isRomsListEmpty = !roms || roms.length === 0

	useEffect(() => {
		const checkAuthentication = async () => {
			const isLoggedIn = await isAuthenticated()
			if (!isLoggedIn) {
				navigate('/login')
			}
		}

		checkAuthentication()
	}, [navigate, isAuthenticated])

	console.log({roms, currentUser, error, userError})

	return (
		<div style={{'--home-page-padding': '32px'} as React.CSSProperties}>
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
					className='absolute w-screen h-screen top-0 left-0 bg-no-repeat bg-cover z-[-1]'
					style={{
						backgroundImage:
							'url("https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1030300/8e09f2b2eedd3fa9b4479dd5c26d8bdf60562478/ss_8e09f2b2eedd3fa9b4479dd5c26d8bdf60562478.600x338.jpg")'
					}}
				/>
				<div className='z-10 py-12 px-(--home-page-padding) gap-9 flex flex-col'>
					<Heading variant={'h1'}>Welcome {currentUser?.username}</Heading>
					{isRomsListEmpty ? (
						<div>
							<Heading variant={'h4'}>No roms are available.</Heading>
						</div>
					) : (
						<div className='grid gap-8'>
							<ContinuePlaying roms={roms} />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
