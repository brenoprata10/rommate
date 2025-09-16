import {createBrowserRouter} from 'react-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/layout'
import RomDetail from '@/views/rom'

const router = createBrowserRouter([
	{
		path: '/',
		Component: Layout,
		children: [
			{index: true, Component: Home},
			{path: '/rom/:id', Component: RomDetail}
		]
	},
	{
		path: '/login',
		Component: Login
	}
])

export default router
