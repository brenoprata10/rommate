import useServerUrl from '@/hooks/use-server-url'
import clsx from 'clsx'
import {motion} from 'motion/react'
import {useCallback, useEffect, useState} from 'react'
import {useNavigate} from 'react-router'

const className = 'border border-neutral-700 rounded-md aspect-[3/4] transition'

function GameCover({
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
	const [imageURL, setImageURL] = useState<string>(`${serverURL}/${src}`)

	useEffect(() => {
		setImageURL(`${serverURL}/${src}`)
	}, [serverURL, src])

	const redirectToRomPage = useCallback(() => {
		navigate(`/rom/${id}`)
	}, [id, navigate])

	const handleError = useCallback(() => {
		setImageURL('/unmatched_cover.webp')
	}, [])

	return (
		<motion.img
			loading='lazy'
			className={clsx([className, 'hover:border-neutral-200 cursor-pointer'])}
			width={width}
			height={height}
			style={{width, height}}
			src={imageURL}
			onClick={redirectToRomPage}
			onMouseEnter={onHover}
			onError={handleError}
		/>
	)
}

export default GameCover
