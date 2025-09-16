import {Skeleton} from '@/components/ui/skeleton'
import SkeletonWrapper from '@/components/ui/skeleton-wrapper'

export default function ContinuePlayingRomSkeleton() {
	return (
		<SkeletonWrapper>
			<div className={'grid grid-cols-[14.8rem_16.812rem] max-w-[31.688rem] w-full'}>
				<Skeleton className='aspect-[3/4] w-full object-cover rounded-md' />
				<div className='flex flex-col pt-[1.375rem] px-[1.375rem] justify-between'>
					<Skeleton className='h-[2.25rem] w-full rounded-md' />
					<Skeleton className='h-[2.25rem] w-full rounded-md' />
				</div>
			</div>
		</SkeletonWrapper>
	)
}
