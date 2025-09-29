import clsx from 'clsx'
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from './carousel'
import React from 'react'
import useServerUrl from '@/hooks/use-server-url'

function RomCarousel({images, className}: {images: string[]; className?: string}) {
	const serverURL = useServerUrl()
	const screenshots = images.map((screenshot) => `${serverURL}/${screenshot}`).reverse()

	return (
		<Carousel className={clsx(['max-w-[30.312rem] mb-12 flex flex-col gap-3', className])}>
			<div className='flex gap-3 justify-end'>
				<CarouselPrevious />
				<CarouselNext />
			</div>
			<CarouselContent>
				{screenshots.map((image) => (
					<CarouselItem key={image}>
						<img src={image} className='rounded-md border border-neutral-800' />
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	)
}

export default React.memo(RomCarousel)
