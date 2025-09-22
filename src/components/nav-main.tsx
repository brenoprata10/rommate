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
	SidebarMenuSubItem
} from '@/components/ui/sidebar'
import {Badge} from './ui/badge'

export function NavMain({
	items
}: {
	items: {
		title: string
		url: string
		icon?: LucideIcon
		isActive?: boolean
		items?: {
			title: string
			url: string
			badge: string
		}[]
	}[]
}) {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Romm</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<Collapsible key={item.title} asChild defaultOpen={item.isActive} className='group/collapsible'>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton tooltip={item.title}>
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
												<a href={subItem.url} className='flex justify-between'>
													<span className='max-w-[8.75rem] overflow-hidden text-ellipsis whitespace-nowrap'>
														{subItem.title}
													</span>
													<Badge className='text-xs' variant={'secondary'}>
														{subItem.badge}
													</Badge>
												</a>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									))}
								</SidebarMenuSub>
							</CollapsibleContent>
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	)
}
