import RomList from '@/components/rom-list'
import usePlatforms from '@/hooks/api/use-platforms'
import useRomsByPlatformId from '@/hooks/api/use-roms-by-platform-id'
import {useParams} from 'react-router'

export default function Platform() {
	const params = useParams()
	const platformId = params.id
	const {data: platforms, isLoading, error} = usePlatforms()
	const {data: roms, isLoading: isLoadingRoms, error: romsError} = useRomsByPlatformId({id: platformId})

	if (isLoadingRoms || romsError || isLoading || error) {
		return null
	}
	const platform = platforms?.find((platform) => platform.id.toString() === platformId)

	return <RomList title={platform?.name ?? 'Platform'} roms={roms?.items ?? []} />
}
