import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert'
import {AlertCircleIcon} from 'lucide-react'
import {motion} from 'motion/react'

export default function AlertError({title, description}: {title: string; description: string}) {
	return (
		<motion.div animate={{scale: 1}} initial={{scale: 0}}>
			<Alert variant='destructive'>
				<AlertCircleIcon />
				<AlertTitle>{title}</AlertTitle>
				<AlertDescription>{description}</AlertDescription>
			</Alert>
		</motion.div>
	)
}
