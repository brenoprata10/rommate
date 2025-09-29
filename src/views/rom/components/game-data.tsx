import ContentCard from '@/components/ui/content-card'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {RomUserSave, RomUserState} from '@/models/rom'
import UserSave from './user-save'
import Heading from '@/components/ui/heading'
import {motion} from 'motion/react'
import React from 'react'

enum GameDataType {
	STATE = 'STATE',
	SAVE = 'SAVE'
}

const MAX_ITEMS = 2

function GameData({
	userSaves,
	userStates,
	userId,
	className
}: {
	userSaves: RomUserSave[] | null
	userStates: RomUserState[] | null
	userId?: number
	className?: string
}) {
	const saves = userSaves?.filter((save) => save.userId === userId) ?? []
	const states = userStates?.filter((state) => state.userId === userId) ?? []
	const isGameSavesEmpty = (!saves || saves.length === 0) && (!states || states.length === 0)

	if (isGameSavesEmpty || !userId) {
		return null
	}

	const displayedSaves = saves.slice(0, MAX_ITEMS)
	const displayedStates = states.slice(0, MAX_ITEMS)

	return (
		<Tabs defaultValue={GameDataType.SAVE} className={className}>
			<ContentCard
				title='Game Data'
				headerTrailing={
					<TabsList>
						<TabsTrigger value={GameDataType.SAVE}>Save</TabsTrigger>
						<TabsTrigger value={GameDataType.STATE}>State</TabsTrigger>
					</TabsList>
				}
			>
				<TabsContent value={GameDataType.SAVE} className='grid gap-4'>
					{displayedSaves && displayedSaves.length > 0 ? (
						displayedSaves.map((save) => <UserSave key={save.id} data={save} />)
					) : (
						<EmptyListMessage />
					)}
				</TabsContent>
				<TabsContent value={GameDataType.STATE} className='grid gap-4'>
					{displayedStates && displayedStates.length > 0 ? (
						displayedStates?.map((state) => <UserSave key={state.id} data={state} />)
					) : (
						<EmptyListMessage />
					)}
				</TabsContent>
			</ContentCard>
		</Tabs>
	)
}

const EmptyListMessage = () => {
	return (
		<motion.div initial={{opacity: 0, translateY: 5}} animate={{opacity: 1, translateY: 0}}>
			<Heading variant={'h4'} className='text-neutral-500 w-full text-center'>
				Oops, nothing to be seen here.
			</Heading>
		</motion.div>
	)
}

export default React.memo(GameData)
