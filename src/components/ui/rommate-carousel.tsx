import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from './carousel'

export default function RomCarousel({images}: {images: string[]}) {
	return (
		<Carousel className='max-h-[20.125rem] max-w-[32.312rem] mb-12 flex flex-col gap-3'>
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
