import * as React from 'react'
import {BookOpen, Bot, ComponentIcon, Gamepad2, Settings, Settings2, SquaresUnite, SquareTerminal} from 'lucide-react'

import {NavMain} from '@/components/nav-main'
import {NavProjects} from '@/components/nav-projects'
import {NavUser} from '@/components/nav-user'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
	SidebarTrigger
} from '@/components/ui/sidebar'
import useLoggedInUser from '@/hooks/api/use-logged-in-user'
import usePlatforms from '@/hooks/api/use-platforms'
import useCollections from '@/hooks/api/use-collections'
import {NavLink} from 'react-router'

// This is sample data.
const data = {
	navMain: [
		{
			title: 'Playground',
			url: '#',
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: 'History',
					url: '#'
				},
				{
					title: 'Starred',
					url: '#'
				},
				{
					title: 'Settings',
					url: '#'
				}
			]
		},
		{
			title: 'Models',
			url: '#',
			icon: Bot,
			items: [
				{
					title: 'Genesis',
					url: '#'
				},
				{
					title: 'Explorer',
					url: '#'
				},
				{
					title: 'Quantum',
					url: '#'
				}
			]
		},
		{
			title: 'Documentation',
			url: '#',
			icon: BookOpen,
			items: [
				{
					title: 'Introduction',
					url: '#'
				},
				{
					title: 'Get Started',
					url: '#'
				},
				{
					title: 'Tutorials',
					url: '#'
				},
				{
					title: 'Changelog',
					url: '#'
				}
			]
		},
		{
			title: 'Settings',
			url: '#',
			icon: Settings2,
			items: [
				{
					title: 'General',
					url: '#'
				},
				{
					title: 'Team',
					url: '#'
				},
				{
					title: 'Billing',
					url: '#'
				},
				{
					title: 'Limits',
					url: '#'
				}
			]
		}
	],
	settings: [
		{
			name: 'General',
			url: '/',
			icon: Settings
		}
	]
}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
	const {data: currentUser, error: userError} = useLoggedInUser()
	const {data: platforms, error: platformsError} = usePlatforms()
	const {data: collections, error: collectionsError} = useCollections()
	const platformMenuItem = React.useMemo(
		() => ({
			title: 'Platfoms',
			icon: Gamepad2,
			url: '#',
			items:
				platforms && !platformsError
					? platforms
							?.map((platform) => ({
								title: platform.name,
								url: platform.url ?? '#',
								badge: platform.romCount.toString()
							}))
							.reduce(
								(result, platform) => {
									const isPlatformDuplicated = result.some(
										({title}) => title.toUpperCase() === platform.title.toUpperCase()
									)
									return isPlatformDuplicated ? result : [...result, platform]
								},
								[] as Array<{title: string; url: string; badge: string}>
							)
					: []
		}),
		[platforms, platformsError]
	)
	const collectionMenuItem = React.useMemo(
		() => ({
			title: 'Collections',
			icon: SquaresUnite,
			url: '#',
			items:
				collections && !collectionsError
					? collections?.map((collection) => ({
							title: collection.name,
							url: '#',
							badge: collection.romCount.toString()
						}))
					: []
		}),
		[collections, collectionsError]
	)

	return (
		<Sidebar collapsible='icon' {...props}>
			<SidebarHeader>
				<NavLink className='p-2 flex items-center gap-2 font-medium text-lg overflow-hidden' to={'/'}>
					<div className='text-primary flex size-8 items-center justify-center rounded-md'>
						<ComponentIcon className='size-4' />
					</div>
					Rommate
				</NavLink>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={[platformMenuItem, collectionMenuItem]} />
				<NavProjects projects={data.settings} />
			</SidebarContent>
			<SidebarFooter>
				<SidebarTrigger />
				{currentUser && !userError && <NavUser user={currentUser} />}
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
