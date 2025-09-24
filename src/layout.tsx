import {Outlet} from 'react-router'
import {AppSidebar} from '@/components/app-sidebar'
import {SidebarProvider} from '@/components/ui/sidebar'
import {CommonContext, CommonDispatchContext} from '@/context'
import {useReducer} from 'react'
import {INITIAL_STATE, reducer} from '@/reducer'
import SearchMenu from './components/search-menu'
import DownloadManager from './components/download-manager'

export default function Layout() {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

	return (
		<CommonDispatchContext.Provider value={dispatch}>
			<CommonContext.Provider value={state}>
				<SidebarProvider>
					<AppSidebar />
					<Outlet />
					<SearchMenu />
					<DownloadManager />
				</SidebarProvider>
			</CommonContext.Provider>
		</CommonDispatchContext.Provider>
	)
}
