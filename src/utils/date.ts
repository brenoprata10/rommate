import {DateArg, formatDistanceToNow} from 'date-fns'

export const getFormattedDistanceDate = (date: DateArg<Date>) => {
	return formatDistanceToNow(date, {addSuffix: true}).replace('about', '')
}

export const getFormattedHour = (date: string | Date) => {
	const formatter = new Intl.DateTimeFormat('en', {
		hour: '2-digit',
		minute: '2-digit'
	})

	return formatter.format(new Date(date))
}
