import {BadgeCheck, Bell, ChevronsUpDown, LogOut} from 'lucide-react'
import {Avatar, AvatarImage} from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar} from '@/components/ui/sidebar'
import useServerUrl from '@/hooks/use-server-url'
import useRommSession from '@/hooks/use-romm-session'
import {User} from '@/models/user'

export function NavUser({
	user,
	isLoading
}: {
	user?: Pick<User, 'username' | 'email' | 'avatarPath'>
	isLoading: boolean
}) {
	const {isMobile} = useSidebar()
	const {logout} = useRommSession()
	const serverUrl = useServerUrl()
	const avatarUrl =
		user?.avatarPath || isLoading
			? `${serverUrl}/assets/romm/assets/${user?.avatarPath}`
			: `${serverUrl}/assets/default/user.svg`

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size='lg'
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
						>
							<Avatar className='h-8 w-8 rounded-lg'>
								<AvatarImage src={avatarUrl} alt={user?.username} />
							</Avatar>
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate font-medium'>{user?.username}</span>
								<span className='truncate text-xs'>{user?.email}</span>
							</div>
							<ChevronsUpDown className='ml-auto size-4' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
						side={isMobile ? 'bottom' : 'right'}
						align='end'
						sideOffset={4}
					>
						<DropdownMenuLabel className='p-0 font-normal'>
							<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
								<Avatar className='h-8 w-8 rounded-lg'>
									<AvatarImage src={avatarUrl} alt={user?.username} />
								</Avatar>
								<div className='grid flex-1 text-left text-sm leading-tight'>
									<span className='truncate font-medium'>{user?.username}</span>
									<span className='truncate text-xs'>{user?.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup></DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<BadgeCheck />
								Account
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Bell />
								Notifications
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={logout}>
							<LogOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
