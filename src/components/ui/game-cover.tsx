import useServerUrl from '@/hooks/use-server-url'

export default function GameCover({src, width, height}: {src: string; width: string; height: string}) {
	const serverURL = useServerUrl()

	return (
		<img
			className='border border-neutral-700 object-cover rounded-md aspect-[3/4]'
			style={{width}}
			width={width}
			height={height}
			src={`${serverURL}/${src}`}
		/>
	)
}
