import {useCallback, useEffect} from 'react'
import {CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from './ui/command'
import useSearchDialog from '@/hooks/use-search-dialog'
import useRoms from '@/hooks/api/use-roms'
import {CommandLoading} from 'cmdk'
import {Link, useNavigate} from 'react-router'
import {Badge} from './ui/badge'

export default function SearchMenu() {
	const {isSearchDialogOpened, toggleSearchDialog} = useSearchDialog()
	const navigate = useNavigate()
	const {data: roms, isLoading} = useRoms()

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

	const onClickItem = useCallback(
		(romId: number) => {
			navigate(`/rom/${romId}`)
			toggleSearchDialog()
		},
		[navigate, toggleSearchDialog]
	)

	return (
		<CommandDialog
			className='dark'
			open={isSearchDialogOpened}
			onOpenChange={toggleSearchDialog}
			showCloseButton={false}
		>
			<CommandInput placeholder='Search rom title...' />
			<CommandList>
				{isLoading && (
					<CommandLoading>
						<div className='w-full flex justify-center p-5 text-sm'>Hang on…</div>
					</CommandLoading>
				)}
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading='Roms'>
					{roms?.map((rom) => (
						<CommandItem key={`${rom.platformId}-${rom.id}`} onSelect={() => onClickItem(rom.id)}>
							<div className='flex w-full justify-between'>
								<div className='flex gap-2'>
									<Badge variant={'outline'}>{rom.id}</Badge>
									{rom.name}
								</div>
								<Badge variant={'secondary'}>{rom.platformName}</Badge>
							</div>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	)
}
