export type DownloadInProgressPayload = {
	downloaded: number
	progress: number
	speed: number
}

export type DownloadEvent = {id: string} & (
	| {
			event: 'started'
	  }
	| (DownloadInProgressPayload & {
			event: 'progress'
	  })
	| {
			event: 'finished'
	  }
)

export type DownloadRomEvent = DownloadEvent & {romId: number}
