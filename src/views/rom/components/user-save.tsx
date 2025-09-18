import useServerUrl from '@/hooks/use-server-url'
import {RomUserSave} from '@/models/rom'

export default function UserSave({data}: {data: RomUserSave}) {
	const serverURL = useServerUrl()
	return (
		<div className='bg-neutral-800 border border-neutral-700 rounded-md'>
			{data.screenshot && <img src={`${serverURL}/assets/${data.screenshot?.fullPath}`} />}
		</div>
	)
}
