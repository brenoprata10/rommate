export type DownloadInProgressPayload = {
	downloaded: number
	progress: number
	speed: number
}

export type DownloadEvent = {id: string} & (
	| {
			event: 'started'
	  }
	| {
			event: 'progress'
			data: DownloadInProgressPayload
	  }
	| {
			event: 'finished'
	  }
)
