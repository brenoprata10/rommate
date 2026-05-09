import useSuggestionSections from '@/hooks/api/use-suggestion-sections'
import VerifiedSection from './sections/verified-section'
import {SuggestionSection} from '@/models/suggestion_section'

const CONFIG: Record<
	string,
	{shouldShow: (section: SuggestionSection) => boolean; component: (section: SuggestionSection) => React.ReactNode}
> = {
	verified: {
		shouldShow: (section) => section.kind === 'verified',
		component: (section: SuggestionSection) => <VerifiedSection data={section} />
	}
}

export default function SuggestionSections() {
	const {data: suggestionSections} = useSuggestionSections()

	return (
		<>
			{suggestionSections?.map((section) => (
				<>
					{Object.values(CONFIG)
						.find((config) => config.shouldShow(section))
						?.component(section)}
				</>
			))}
		</>
	)
}
