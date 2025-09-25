export type DownloadStartPayload = {
	romId: number
}
export type DownloadInProgressPayload = {
	romId: number
	chunkLength: number
}
export type DownloadFinishedPayload = {
	romId: number
}

export type DownloadEvent =
	| {
			event: 'started'
			data: DownloadStartPayload
	  }
	| {
			event: 'progress'
			data: DownloadInProgressPayload
	  }
	| {
			event: 'finished'
			data: DownloadFinishedPayload
	  }
