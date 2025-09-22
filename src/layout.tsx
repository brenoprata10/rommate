import {Outlet} from 'react-router'
import {AppSidebar} from '@/components/app-sidebar'
import {SidebarProvider} from '@/components/ui/sidebar'
import {CommonContext, CommonDispatchContext} from '@/context'
import {useReducer} from 'react'
import {INITIAL_STATE, reducer} from '@/reducer'

export default function Layout() {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

	return (
		<CommonDispatchContext.Provider value={dispatch}>
			<CommonContext.Provider value={state}>
				<SidebarProvider>
					<AppSidebar />
					<Outlet />
				</SidebarProvider>
			</CommonContext.Provider>
		</CommonDispatchContext.Provider>
	)
}
