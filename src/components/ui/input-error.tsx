import {FieldError} from 'react-hook-form'

export default function InputError({error}: {error: FieldError}) {
	return <div className='mt-1 text-xs text-red-500'>{error.type === 'required' && <span>Required</span>}</div>
}
