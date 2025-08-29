import {cn} from '@/lib/utils'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {useForm, SubmitHandler} from 'react-hook-form'
import {useCallback} from 'react'

type LoginInputs = {
	username: string
	password: string
	serverURL: string
}

export function LoginForm({className, ...props}: React.ComponentProps<'form'>) {
	const {
		register,
		handleSubmit,
		formState: {errors}
	} = useForm<LoginInputs>()

	const onSubmit: SubmitHandler<LoginInputs> = useCallback((data) => {
		console.log(data)
	}, [])

	return (
		<form className={cn('flex flex-col gap-6', className)} {...props} onSubmit={handleSubmit(onSubmit)}>
			<div className='flex flex-col items-center gap-2 text-center'>
				<h1 className='text-2xl font-bold'>Login to your account</h1>
				<p className='text-muted-foreground text-sm text-balance'>Welcome to Rommate!</p>
			</div>
			<div className='grid gap-6'>
				<div className='grid gap-3'>
					<Label htmlFor='server-url'>Server URL</Label>
					<Input type='url' {...register('serverURL', {required: true})} />
				</div>
				<div className='grid gap-3'>
					<Label htmlFor='username'>Username</Label>
					<Input {...register('username', {required: true})} />
				</div>
				<div className='grid gap-3'>
					<div className='flex items-center'>
						<Label htmlFor='password'>Password</Label>
					</div>
					<Input type='password' {...register('password', {required: true})} />
				</div>
				<Button type='submit' className='w-full'>
					Login
				</Button>
			</div>
		</form>
	)
}
