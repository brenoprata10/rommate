import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router/dom'
import router from '@/utils/routes'
import '@/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<div className='dark'>
			<RouterProvider router={router} />
		</div>
	</React.StrictMode>
)
