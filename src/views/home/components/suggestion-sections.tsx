import useSuggestionSections from '@/hooks/api/use-suggestion-sections'
import VerifiedSection from './sections/verified-section'
import FavoriteSection from './sections/favorite-section'
import RetroachievementSection from './sections/retroachievement-section'
import GameCoverSection from './sections/game-cover-section'
import {SuggestionSection} from '@/models/suggestion_section'
import {getPlatformImage} from '@/utils/platform-image'
import useServerUrl from '@/hooks/use-server-url'

function isPlatformSection(
	section: SuggestionSection
): section is SuggestionSection & {kind: {platform: {slug: string; isUnidentified: boolean}}} {
	return typeof section.kind === 'object' && 'platform' in section.kind
}

const CONFIG: Record<
	string,
	{
		shouldShow: (section: SuggestionSection) => boolean
		component: (section: SuggestionSection, serverUrl?: string) => React.ReactNode
	}
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
	},
	platform: {
		shouldShow: (section) => isPlatformSection(section),
		component: (section: SuggestionSection, serverUrl) => {
			if (!isPlatformSection(section)) {
				return null
			}

			return (
				<GameCoverSection
					data={section}
					titleImage={
						<img
							width={30}
							height={30}
							src={
								serverUrl
									? getPlatformImage({
											slug: section.kind.platform.slug,
											serverUrl,
											isUnidentified: section.kind.platform.isUnidentified
										})
									: undefined
							}
						/>
					}
				/>
			)
		}
	},
	default: {
		shouldShow: (section) =>
			section.kind === 'collection' ||
			section.kind === 'genre' ||
			section.kind === 'company' ||
			section.kind === 'playedRelated',
		component: (section: SuggestionSection) => <GameCoverSection data={section} />
	}
}

export default function SuggestionSections() {
	const {data: suggestionSections} = useSuggestionSections()
	const serverUrl = useServerUrl()

	return (
		<>
			{suggestionSections?.map((section) => (
				<>
					{Object.values(CONFIG)
						.find((config) => config.shouldShow(section))
						?.component(section, serverUrl)}
				</>
			))}
		</>
	)
}
