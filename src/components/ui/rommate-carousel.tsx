import clsx from 'clsx'
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from './carousel'

export default function RomCarousel({images, className}: {images: string[]; className?: string}) {
	return (
		<Carousel className={clsx(['max-w-[30.312rem] mb-12 flex flex-col gap-3', className])}>
			<div className='flex gap-3 justify-end'>
				<CarouselPrevious />
				<CarouselNext />
			</div>
			<CarouselContent>
				{images.map((image) => (
					<CarouselItem key={image}>
						<img src={image} className='rounded-md border border-neutral-800' />
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	)
}
