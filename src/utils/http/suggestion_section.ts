import {SuggestionSection} from '@/models/suggestion_section'
import {TauriCommandKey, TauriCommandPayload, tauriInvoke} from '.'

export const getSuggestionSections = async (): Promise<TauriCommandPayload<SuggestionSection[]>> => {
	return tauriInvoke(TauriCommandKey.GET_SUGGESTION_SECTIONS)
}
