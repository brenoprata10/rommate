import {SaveSync, SaveSyncKind} from '@/models/rom-save'
import {CircleCheckIcon, CircleXIcon, CloudDownloadIcon, LoaderIcon} from 'lucide-react'
import {Popover, PopoverTrigger, PopoverContent} from '@/components/ui/popover'
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip'
import SaveSyncCard from './save-sync-card'

const SAVE_SYNC_LABEL_CONFIG: Record<SaveSyncKind, string | null> = {
	[SaveSyncKind.CONFLICT]: 'Local and cloud saves don’t match.\nClick to choose a version.',
	[SaveSyncKind.SYNCED]: 'Save Synced',
	[SaveSyncKind.MISSING_LOCAL_FILE]: 'Download Cloud Save',
	[SaveSyncKind.MISSING_CLOUD_FILE]: null
}

export default function SaveSyncActions({
	saveSync,
	isSyncingSave,
	onUploadLocalFile,
	onDownloadCloudFile
}: {
	saveSync: SaveSync
	isSyncingSave?: boolean
	onUploadLocalFile: () => void
	onDownloadCloudFile: () => void
}) {
	if (saveSync.kind === SaveSyncKind.MISSING_CLOUD_FILE) {
		return null
	}

	if (saveSync.kind === SaveSyncKind.CONFLICT) {
		return (
			<Tooltip>
				<Popover>
					<PopoverTrigger asChild>
						<TooltipTrigger asChild>
							<CircleXIcon className='stroke-red-400 cursor-pointer hover:stroke-red-500 transition-colors' />
						</TooltipTrigger>
					</PopoverTrigger>
					<PopoverContent className='w-80' sideOffset={10}>
						<div className='grid gap-4'>
							<div className='space-y-2'>
								<h4 className='leading-none font-medium'>Choose a Save File</h4>
								<p className='text-sm text-muted-foreground'>
									Your local and cloud saves don't match. Select the version you'd like to use:
								</p>
							</div>
							<div className='overflow-hidden flex gap-3 flex-col items-center'>
								<SaveSyncCard data={saveSync.cloudFile} type='cloud' onClick={onDownloadCloudFile} />
								<SaveSyncCard data={saveSync.localFile} type='local' onClick={onUploadLocalFile} />
							</div>
						</div>
					</PopoverContent>
				</Popover>
				<TooltipContent side='right' align='center' className='whitespace-pre'>
					{'Local and cloud saves don’t match.\nClick to choose a version.'}
				</TooltipContent>
			</Tooltip>
		)
	}

	return (
		<Tooltip>
			<TooltipTrigger>
				{isSyncingSave ? (
					<LoaderIcon className='stroke-neutral-400 animate-spin' />
				) : (
					<>
						{saveSync.kind === SaveSyncKind.SYNCED && <CircleCheckIcon className='stroke-green-500' />}
						{saveSync.kind === SaveSyncKind.MISSING_LOCAL_FILE && (
							<CloudDownloadIcon
								className='stroke-neutral-400 cursor-pointer hover:stroke-neutral-500 transition-colors'
								onClick={onDownloadCloudFile}
							/>
						)}
					</>
				)}
			</TooltipTrigger>
			<TooltipContent side='right' align='center' className='whitespace-pre'>
				{isSyncingSave ? 'Syncing Save...' : SAVE_SYNC_LABEL_CONFIG[saveSync.kind]}
			</TooltipContent>
		</Tooltip>
	)
}
