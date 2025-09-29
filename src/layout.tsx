import {Outlet} from 'react-router'
import {AppSidebar} from '@/components/app-sidebar'
import {SidebarProvider} from '@/components/ui/sidebar'
import {CommonContext, CommonDispatchContext} from '@/context'
import {useEffect, useReducer} from 'react'
import {ActionEnum, INITIAL_STATE, reducer} from '@/reducer'
import SearchMenu from './components/search-menu'
import useStore from './hooks/use-store'

export default function Layout() {
	const {get} = useStore()
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

	useEffect(() => {
		const loadServerUrl = async () => {
			const url = await get<string>('romm_url')
			if (!url) {
				return
			}
			dispatch({type: ActionEnum.SET_SERVER_URL, payload: url})
		}

		loadServerUrl()
	}, [get])

	return (
		<CommonDispatchContext.Provider value={dispatch}>
			<CommonContext.Provider value={state}>
				<SidebarProvider>
					<AppSidebar className='overflow-hidden' />
					<Outlet />
					<SearchMenu />
				</SidebarProvider>
			</CommonContext.Provider>
		</CommonDispatchContext.Provider>
	)
}
