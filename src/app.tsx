import {RouterProvider} from 'react-router/dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import router from '@/utils/routes'

const queryClient = new QueryClient()

export default function App() {
	return (
		<div className='dark overflow-x-hidden'>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</div>
	)
}
