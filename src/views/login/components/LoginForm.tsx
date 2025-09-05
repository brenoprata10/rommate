import {cn} from '@/lib/utils'
import {invoke} from '@tauri-apps/api/core'
import {Button} from '@/components/ui/button'
import {useForm, SubmitHandler} from 'react-hook-form'
import {useCallback} from 'react'
import FormInput from '@/components/ui/form-input'

type LoginInputs = {
	username: string
	password: string
	serverURL: string
}

export function LoginForm({className, ...props}: React.ComponentProps<'form'>) {
	const {
		register,
		handleSubmit,
		formState: {errors, isValid}
	} = useForm<LoginInputs>()

	const onSubmit: SubmitHandler<LoginInputs> = useCallback(
		async (payload) => {
			if (!isValid) {
				return
			}
			const response = await invoke('login', {payload})
			console.log(JSON.stringify(response))
		},
		[isValid]
	)

	return (
		<form className={cn('flex flex-col gap-6', className)} {...props} onSubmit={handleSubmit(onSubmit)}>
			<div className='flex flex-col items-center gap-2 text-center'>
				<h1 className='text-2xl font-bold'>Login to your account</h1>
				<p className='text-muted-foreground text-sm text-balance'>Welcome to Rommate!</p>
			</div>
			<div className='grid gap-6'>
				<FormInput
					label='Server URL'
					id='server-url'
					type='url'
					register={register('serverURL', {required: true})}
					fieldError={errors.serverURL}
				/>
				<FormInput
					label='Username'
					id='username'
					register={register('username', {required: true})}
					fieldError={errors.username}
				/>
				<FormInput
					label='Password'
					id='password'
					type='password'
					register={register('password', {required: true})}
					fieldError={errors.password}
				/>
				<Button type='submit' className='w-full'>
					Login
				</Button>
			</div>
		</form>
	)
}
