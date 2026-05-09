import useSuggestionSections from '@/hooks/api/use-suggestion-sections'
import VerifiedSection from './sections/verified-section'

export default function SuggestionSections() {
	const {data: suggestionSections, isLoading: isLoadingSuggestionSections} = useSuggestionSections()

	return (
		<>
			{suggestionSections?.map((section) => (
				<>
					{section.kind === 'verified' && (
						<VerifiedSection key={section.title} data={section} isLoading={isLoadingSuggestionSections} />
					)}
				</>
			))}
		</>
	)
}
