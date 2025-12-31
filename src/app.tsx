import {RouterProvider} from 'react-router/dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import router from '@/utils/routes'
import {Toaster} from '@/components/ui/sonner'

const queryClient = new QueryClient({defaultOptions: {queries: {staleTime: 10 * 60 * 1000}}})

export default function App() {
	return (
		<div className='dark overflow-x-hidden'>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
			<Toaster />
		</div>
	)
}
