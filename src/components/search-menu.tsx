import {useCallback, useEffect, useState} from 'react'
import {CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from './ui/command'
import useSearchDialog from '@/hooks/use-search-dialog'
import useRoms from '@/hooks/api/use-roms'
import {useNavigate} from 'react-router'
import {Badge} from './ui/badge'
import {motion, AnimatePresence} from 'motion/react'
import {Rom} from '@/models/rom'

export default function SearchMenu() {
	const [searchInput, setSearchInput] = useState<string | null>(null)
	const [previousSearchResults, setPreviousSearchResults] = useState<Rom[]>([])
	const {isSearchDialogOpened, toggleSearchDialog} = useSearchDialog()
	const navigate = useNavigate()
	const {data: roms} = useRoms({limit: 6, offset: 0, searchTerm: searchInput ?? undefined})

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				toggleSearchDialog()
			}
		}
		document.addEventListener('keydown', down)
		return () => document.removeEventListener('keydown', down)
	}, [toggleSearchDialog])

	useEffect(() => {
		if (roms && roms.length > 0) {
			setPreviousSearchResults(roms)
		}
	}, [roms])

	const onClickItem = useCallback(
		(romId: number) => {
			navigate(`/rom/${romId}`)
			toggleSearchDialog()
		},
		[navigate, toggleSearchDialog]
	)

	const onChangeInputValue = useCallback((value: string) => {
		setSearchInput(value)
	}, [])

	return (
		<CommandDialog
			className='dark min-w-[19.5rem]'
			open={isSearchDialogOpened}
			onOpenChange={toggleSearchDialog}
			showCloseButton={false}
			shouldFilter={false}
		>
			<CommandInput
				value={searchInput ?? undefined}
				onValueChange={onChangeInputValue}
				placeholder='Search rom title...'
			/>
			<CommandList>
				<CommandGroup key={searchInput} heading='Roms'>
					{roms && roms.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}
					<AnimatePresence mode='popLayout'>
						{(roms ?? previousSearchResults).map((rom) => (
							<motion.div
								key={`${rom.platformId}-${rom.id}`}
								layout
								animate={{opacity: 1, translateY: 0}}
								exit={{opacity: 0, translateY: 20}}
							>
								<CommandItem key={`${rom.platformId}-${rom.id}`} onSelect={() => onClickItem(rom.id)}>
									<div className='flex w-full justify-between'>
										<div className='flex gap-2'>
											<Badge variant={'outline'}>{rom.id}</Badge>
											{rom.name}
										</div>
										<Badge variant={'secondary'}>{rom.platformName}</Badge>
									</div>
								</CommandItem>
							</motion.div>
						))}
					</AnimatePresence>
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	)
}
