import ContentCard from '@/components/ui/content-card'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {RomUserSave, RomUserState} from '@/models/rom'
import UserSave from './user-save'

export default function GameData({saves, states}: {saves: RomUserSave[]; states: RomUserState[]}) {
	return (
		<Tabs defaultValue='save'>
			<ContentCard
				title='Game Data'
				headerTrailing={
					<TabsList>
						<TabsTrigger value='save'>Save</TabsTrigger>
						<TabsTrigger value='state'>State</TabsTrigger>
					</TabsList>
				}
			>
				<TabsContent value='save' className='grid gap-4'>
					{saves?.map((save) => (
						<UserSave key={save.id} data={save} />
					))}
				</TabsContent>
				<TabsContent value='state' className='grid gap-4'>
					{states?.map((state) => (
						<UserSave key={state.id} data={state} />
					))}
				</TabsContent>
			</ContentCard>
		</Tabs>
	)
}
