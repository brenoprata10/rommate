import usePlatformImage from '@/hooks/use-platform-image'
import useServerUrl from '@/hooks/use-server-url'
import clsx from 'clsx'
import {motion} from 'motion/react'
import {useCallback, useEffect, useState} from 'react'
import {useNavigate} from 'react-router'

const className = 'border border-neutral-700 rounded-md aspect-[3/4] transition overflow-hidden cursor-pointer'

function GameCover({
	src,
	id,
	width,
	height,
	platformSlug,
	onHover
}: {
	src: string
	id: number
	width?: string
	height?: string
	platformSlug?: string
	onHover?: () => void
}) {
	const serverURL = useServerUrl()
	const navigate = useNavigate()
	const platformImageUrl = usePlatformImage({slug: platformSlug})
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
		<a
			className={clsx([className, 'relative hover:border-neutral-200'])}
			onClick={redirectToRomPage}
			style={{minWidth: width, height}}
		>
			<motion.img
				loading='lazy'
				width={width}
				height={height}
				style={{width, height}}
				src={imageURL}
				onMouseEnter={onHover}
				onError={handleError}
			/>
			{platformImageUrl && (
				<img
					src={platformImageUrl}
					width={25}
					height={25}
					className='bottom-1.5 object-center left-1.5 absolute pointer-events-none cursor-pointer'
				/>
			)}
		</a>
	)
}

export default GameCover
