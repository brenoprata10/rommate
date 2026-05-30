import useSuggestionSections from '@/hooks/api/use-suggestion-sections'
import VerifiedSection from './sections/verified-section'
import FavoriteSection from './sections/favorite-section'
import RetroachievementSection from './sections/retroachievement-section'
import {SuggestionSection} from '@/models/suggestion_section'

const CONFIG: Record<
	string,
	{shouldShow: (section: SuggestionSection) => boolean; component: (section: SuggestionSection) => React.ReactNode}
> = {
	favorite: {
		shouldShow: (section) => section.kind === 'favorite',
		component: (section: SuggestionSection) => <FavoriteSection data={section} />
	},
	verified: {
		shouldShow: (section) => section.kind === 'verified',
		component: (section: SuggestionSection) => <VerifiedSection data={section} />
	},
	retroachievements: {
		shouldShow: (section) => section.kind === 'retroachievements',
		component: (section: SuggestionSection) => <RetroachievementSection data={section} />
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
