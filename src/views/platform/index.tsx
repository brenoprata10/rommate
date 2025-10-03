import RomList from '@/components/rom-list'
import usePlatforms from '@/hooks/api/use-platforms'
import useRomsByPlatformIdPaginated from '@/hooks/api/use-roms-by-platform-id-paginated'
import {useParams} from 'react-router'

export default function Platform() {
	const params = useParams()
	const platformId = params.id
	const {data: platforms, isLoading, error} = usePlatforms()
	const {
		data: roms,
		isLoading: isLoadingRoms,
		error: romsError,
		fetchNextPage,
		hasNextPage
	} = useRomsByPlatformIdPaginated({id: platformId})

	if (isLoadingRoms || romsError || isLoading || error) {
		return null
	}
	const platform = platforms?.find((platform) => platform.id.toString() === platformId)
	const romsList = roms?.pages?.flatMap((payload) => payload.items).flat()

	return (
		<RomList
			title={platform?.name ?? 'Platform'}
			roms={romsList ?? []}
			loadMore={fetchNextPage}
			hasNextPage={hasNextPage}
		/>
	)
}
