import useServerUrl from '@/hooks/use-server-url'
import clsx from 'clsx'
import {motion} from 'motion/react'
import {useCallback, useEffect, useState} from 'react'
import {useNavigate} from 'react-router'

const className = 'border border-neutral-700 rounded-md aspect-[3/4] transition'

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
	onHover?: () => void
}) {
	const serverURL = useServerUrl()
	const navigate = useNavigate()
	const [imageURL, setImageURL] = useState<string | null>(null)

	useEffect(() => {
		if (src) {
			setImageURL(`${serverURL}/${src}`)
			return
		}
	}, [src, serverURL])

	const redirectToRomPage = useCallback(() => {
		navigate(`/rom/${id}`)
	}, [id, navigate])

	const handleError = useCallback(() => {
		setImageURL('/unmatched_cover.webp')
	}, [])

	if (!serverURL) {
		return <div className={clsx([className, 'bg-neutral-900'])}>&nbsp;</div>
	}

	return (
		<motion.img
			className={clsx([className, onHover && 'hover:border-neutral-200 cursor-pointer'])}
			width={width}
			height={height}
			src={imageURL ?? '/unmatched_cover.webp'}
			onClick={redirectToRomPage}
			onMouseEnter={onHover}
			onError={handleError}
		/>
	)
}
