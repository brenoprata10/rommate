import {Skeleton} from '@/components/ui/skeleton'
import SkeletonWrapper from '@/components/ui/skeleton-wrapper'

export default function RecentlyAddedSkeleton() {
	return (
		<SkeletonWrapper>
			<Skeleton className='w-[9.062rem] h-[12.062rem] rounded-md' />
		</SkeletonWrapper>
	)
}
