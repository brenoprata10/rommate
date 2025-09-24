import {invoke, Channel} from '@tauri-apps/api/core'

export type DownloadEvent =
	| {
			event: 'started'
			data: {
				url: string
				downloadId: number
				contentLength: number
			}
	  }
	| {
			event: 'progress'
			data: {
				downloadId: number
				chunkLength: number
			}
	  }
	| {
			event: 'finished'
			data: {
				downloadId: number
			}
	  }

const onEvent = new Channel<DownloadEvent>()
onEvent.onmessage = (message) => {
	console.log(`got download event ${message.event}`)
}

await invoke('download', {
	url: 'https://raw.githubusercontent.com/tauri-apps/tauri/dev/crates/tauri-schema-generator/schemas/config.schema.json',
	onEvent
})
