type FileConflictInfo = {
	creationDate: string
	length: number
}

export enum SaveSyncKind {
	SYNCED = 'synced',
	MISSING_LOCAL_FILE = 'missingLocalFile',
	MISSING_CLOUD_FILE = 'missingCloudFile',
	CONFLICT = 'conflict'
}

export type SaveSync =
	| {kind: SaveSyncKind.SYNCED}
	| {kind: SaveSyncKind.MISSING_LOCAL_FILE}
	| {kind: SaveSyncKind.MISSING_CLOUD_FILE}
	| {
			kind: SaveSyncKind.CONFLICT
			cloudFile: FileConflictInfo
			localFile: FileConflictInfo
	  }
