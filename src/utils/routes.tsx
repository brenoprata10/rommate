import {createBrowserRouter} from 'react-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/layout'
import RomDetail from '@/views/rom'
import Collection from '@/views/collection'
import Platform from '@/views/platform'
import AutoUpdater from '@/components/auto-updater'

const router = createBrowserRouter([
	{
		path: '/',
		Component: Layout,
		children: [
			{index: true, Component: Home},
			{path: '/updater', Component: AutoUpdater},
			{path: '/rom/:id', Component: RomDetail},
			{path: '/collection/:id/:collectionType', Component: Collection},
			{path: '/platform/:id', Component: Platform}
		]
	},
	{
		path: '/login',
		Component: Login
	}
])

export default router
