export type DownloadInProgressPayload = {
	downloaded: number
	progress: number
	speed: number
}

export type DownloadEvent = {id: string} & (
	| {
			event: 'pending'
	  }
	| {
			event: 'waiting'
	  }
	| {
			event: 'started'
	  }
	| (DownloadInProgressPayload & {
			event: 'progress'
	  })
	| {
			event: 'finished'
	  }
	| {
			event: 'cancelled'
	  }
)

export type DownloadRomEvent = DownloadEvent & {romId: number}
