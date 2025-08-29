import {Label} from '@radix-ui/react-label'
import {InputHTMLAttributes} from 'react'
import {Input} from './input'
import InputError from './input-error'
import {FieldError, UseFormRegisterReturn} from 'react-hook-form'

export default function FormInput({
	register,
	label,
	fieldError,
	...inputProps
}: InputHTMLAttributes<HTMLInputElement> & {
	label: string
	register: UseFormRegisterReturn
	fieldError?: FieldError
}) {
	return (
		<div className='grid'>
			<Label htmlFor={inputProps.id}>{label}</Label>
			<Input id={inputProps.id} className='mt-3' {...register} {...inputProps} />
			{fieldError && <InputError error={fieldError} />}
		</div>
	)
}
