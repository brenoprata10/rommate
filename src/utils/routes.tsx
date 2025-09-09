import {createBrowserRouter} from 'react-router'
import Login from '@/views/login'
import Home from '@/views/home'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />
	},
	{
		path: '/login',
		element: <Login />
	}
])

export default router
