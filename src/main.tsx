import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router/dom'
import router from '@/utils/routes'
import '@/index.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<div className='dark'>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</div>
	</React.StrictMode>
)
