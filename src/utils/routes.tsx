import {createBrowserRouter} from 'react-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/layout'

const router = createBrowserRouter([
	{
		path: '/',
		Component: Layout,
		children: [{index: true, Component: Home}]
	},
	{
		path: '/login',
		Component: Login
	}
])

export default router
