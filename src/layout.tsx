import {Outlet} from 'react-router'
import {AppSidebar} from '@/components/app-sidebar'
import {SidebarProvider} from '@/components/ui/sidebar'

export default function Layout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<Outlet />
		</SidebarProvider>
	)
}
