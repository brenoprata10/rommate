import useServerUrl from '@/hooks/use-server-url'
import clsx from 'clsx'
import {motion} from 'motion/react'
import {useCallback} from 'react'
import {useNavigate} from 'react-router'

const className = 'border border-neutral-700 rounded-md aspect-[3/4] cursor-pointer hover:border-neutral-200 transition'

export default function GameCover({
	src,
	id,
	width,
	height,
	onHover
}: {
	src: string
	id: number
	width: string
	height: string
	onHover: () => void
}) {
	const serverURL = useServerUrl()
	const navigate = useNavigate()

	const redirectToRomPage = useCallback(() => {
		navigate(`/rom/${id}`)
	}, [id, navigate])

	if (!serverURL) {
		return <div className={clsx([className, 'bg-neutral-900'])}>&nbsp;</div>
	}

	return (
		<motion.img
			className={className}
			width={width}
			height={height}
			src={`${serverURL}/${src}`}
			onClick={redirectToRomPage}
			onMouseEnter={onHover}
		/>
	)
}
