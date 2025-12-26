import {ChevronRight, type LucideIcon} from 'lucide-react'

import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@/components/ui/collapsible'
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	useSidebar
} from '@/components/ui/sidebar'
import {Badge} from './ui/badge'
import {useLocation, useNavigate} from 'react-router'
import {useCallback, useState} from 'react'

export type NavItem = {
	title: string
	url: string
	icon?: LucideIcon
	isActive?: boolean
	items?: {
		title: string
		url: string
		badge: string
		imageUrl?: string
	}[]
}

export function NavMain({items}: {items: NavItem[]}) {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Romm</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<CollapsibleItem key={item.title} item={item} />
				))}
			</SidebarMenu>
		</SidebarGroup>
	)
}

const CollapsibleItem = ({item}: {item: NavItem}) => {
	const location = useLocation()
	const navigate = useNavigate()
	const {state, setOpen} = useSidebar()
	const [isOpened, setIsOpened] = useState(location.state?.navItems?.[item.title] ?? false)

	const onClickCollapsible = useCallback(() => {
		if (state === 'collapsed') {
			setIsOpened(true)
			setOpen(true)
			return
		}
		setIsOpened(!isOpened)
	}, [isOpened, state, setOpen])

	const onClickItem = useCallback(
		(event: React.MouseEvent<HTMLDivElement, MouseEvent>, url: string) => {
			event.stopPropagation()
			navigate(url, {state: {navItems: {[item.title]: isOpened}}})
		},
		[isOpened, item.title, navigate]
	)

	return (
		<Collapsible key={item.title} asChild defaultOpen={isOpened} open={isOpened} className='group/collapsible'>
			<SidebarMenuItem>
				<CollapsibleTrigger asChild>
					<SidebarMenuButton tooltip={item.title} onClick={onClickCollapsible}>
						{item.icon && <item.icon />}
						<span>{item.title}</span>
						<ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
					</SidebarMenuButton>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub>
						{item.items?.map((subItem) => (
							<SidebarMenuSubItem key={subItem.title}>
								<SidebarMenuSubButton asChild>
									<div
										onClick={(event) => onClickItem(event, subItem.url)}
										className='flex justify-between cursor-pointer'
									>
										<div className='flex gap-2 flex-1'>
											{subItem.imageUrl && <img src={subItem.imageUrl} className='aspect-square max-w-5' />}
											<span className='max-w-[8.75rem] overflow-hidden text-ellipsis whitespace-nowrap'>
												{subItem.title}
											</span>
										</div>
										<Badge className='text-xs' variant={'secondary'}>
											{subItem.badge}
										</Badge>
									</div>
								</SidebarMenuSubButton>
							</SidebarMenuSubItem>
						))}
					</SidebarMenuSub>
				</CollapsibleContent>
			</SidebarMenuItem>
		</Collapsible>
	)
}
