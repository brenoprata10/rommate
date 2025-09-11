import {cva, VariantProps} from 'class-variance-authority'
import {cn} from '@/lib/utils'

const headingVariants = cva('font-semibold', {
	variants: {
		variant: {
			h1: 'text-neutral-200 text-5xl',
			h2: 'text-neutral-200 text-3xl',
			h3: 'text-neutral-300 text-2xl',
			h4: 'text-neutral-300 text-xl',
			h5: 'text-neutral-300 text-lg'
		}
	},
	defaultVariants: {
		variant: 'h1'
	}
})

export default function Heading({
	variant,
	className,
	children,
	...props
}: React.ComponentProps<'h5'> & VariantProps<typeof headingVariants>) {
	return (
		<h5 className={cn(headingVariants({variant}), className)} {...props}>
			{children}
		</h5>
	)
}
