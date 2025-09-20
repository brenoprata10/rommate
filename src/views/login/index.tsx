import {Gamepad2} from 'lucide-react'
import {LoginForm} from './components/LoginForm'

export default function Login() {
	return (
		<div className='grid min-h-svh lg:grid-cols-2 text-primary'>
			<div className='bg-background flex flex-col gap-4 p-6 md:p-10'>
				<div className='flex justify-center gap-2 md:justify-start'>
					<div className='flex items-center gap-2 font-medium'>
						<div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
							<Gamepad2 className='size-4' />
						</div>
						Rommate
					</div>
				</div>
				<div className='flex flex-1 items-center justify-center'>
					<div className='w-full max-w-xs'>
						<LoginForm />
					</div>
				</div>
			</div>
			<div className='bg-background relative hidden lg:block'>
				<img
					src='/hero-dark.webp'
					alt='Image'
					className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
				/>
				<div className='absolute h-full w-full bg-black opacity-10'>&nbsp;</div>
			</div>
		</div>
	)
}
