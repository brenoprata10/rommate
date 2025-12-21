import * as React from 'react'
import {ComponentIcon, Gamepad2, Home, SearchIcon, Settings, SquaresUnite} from 'lucide-react'

import {NavItem, NavMain} from '@/components/nav-main'
import {NavProjects} from '@/components/nav-projects'
import {NavUser} from '@/components/nav-user'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenuButton,
	SidebarRail,
	SidebarTrigger
} from '@/components/ui/sidebar'
import useLoggedInUser from '@/hooks/api/use-logged-in-user'
import usePlatforms from '@/hooks/api/use-platforms'
import useCollections from '@/hooks/api/use-collections'
import {Link, NavLink} from 'react-router'
import useSearchDialog from '@/hooks/use-search-dialog'
import DownloadManager from './download-manager'
import {getCollectionType} from '@/utils/collection'

const data = {
	settings: [
		{
			name: 'General',
			url: '/',
			icon: Settings
		}
	]
}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
	const {toggleSearchDialog} = useSearchDialog()
	const {data: currentUser, isLoading: isLoadingUser} = useLoggedInUser()
	const {data: platforms, error: platformsError} = usePlatforms()
	const {data: collections, error: collectionsError} = useCollections()
	const platformMenuItem: NavItem = React.useMemo(
		() => ({
			title: 'Platfoms',
			icon: Gamepad2,
			url: '#',
			items:
				platforms && !platformsError
					? platforms
							.filter((platform) => platform.romCount !== 0)
							?.map((platform) => ({
								title: platform.name,
								url: `/platform/${platform.id}`,
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
	const collectionMenuItem: NavItem = React.useMemo(
		() => ({
			title: 'Collections',
			icon: SquaresUnite,
			url: '#',
			items:
				collections && !collectionsError
					? collections?.map((collection) => ({
							title: collection.name,
							url: `/collection/${collection.id}/${getCollectionType(collection)}`,
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
				<SidebarGroup>
					<Link to='/'>
						<SidebarMenuButton tooltip={'Home'}>
							{<Home />}
							<span>Home</span>
						</SidebarMenuButton>
					</Link>
					<SidebarMenuButton tooltip={'Search'} onClick={toggleSearchDialog}>
						{<SearchIcon />}
						<span>Search</span>
					</SidebarMenuButton>
				</SidebarGroup>
				<NavMain items={[platformMenuItem, collectionMenuItem]} />
				<NavProjects projects={data.settings} />
			</SidebarContent>
			<SidebarFooter>
				<SidebarTrigger />
				<DownloadManager />
				<NavUser user={currentUser} isLoading={isLoadingUser} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
