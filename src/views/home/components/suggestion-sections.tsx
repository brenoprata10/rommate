import useSuggestionSections from '@/hooks/api/use-suggestion-sections'
import VerifiedSection from './sections/verified-section'
import FavoriteSection from './sections/favorite-section'
import RetroachievementSection from './sections/retroachievement-section'
import GameCoverSection from './sections/game-cover-section'
import {SuggestionSection, SuggestionSectionKind} from '@/models/suggestion_section'
import {getPlatformImage} from '@/utils/platform-image'
import useServerUrl from '@/hooks/use-server-url'
import {motion} from 'motion/react'

const CONFIG: Record<
	string,
	{
		shouldShow: (section: SuggestionSection) => boolean
		component: (section: SuggestionSection, serverUrl?: string) => React.ReactNode
	}
> = {
	favorite: {
		shouldShow: (section) => section.kind === SuggestionSectionKind.FAVORITE,
		component: (section: SuggestionSection) => <FavoriteSection data={section} />
	},
	verified: {
		shouldShow: (section) => section.kind === SuggestionSectionKind.VERIFIED,
		component: (section: SuggestionSection) => <VerifiedSection data={section} />
	},
	retroachievements: {
		shouldShow: (section) => section.kind === SuggestionSectionKind.RETROACHIEVEMENTS,
		component: (section: SuggestionSection) => <RetroachievementSection data={section} />
	},
	platform: {
		shouldShow: (section) => section.kind === SuggestionSectionKind.PLATFORM,
		component: (section: SuggestionSection, serverUrl) => {
			if (section.kind !== SuggestionSectionKind.PLATFORM) {
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
											slug: section.slug,
											serverUrl,
											isUnidentified: section.isUnidentified
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
			[
				SuggestionSectionKind.COLLECTION,
				SuggestionSectionKind.GENRE,
				SuggestionSectionKind.COMPANY,
				SuggestionSectionKind.PLAYED_RELATED,
				SuggestionSectionKind.FAVORITE_RELATED
			].includes(section.kind),
		component: (section: SuggestionSection) => <GameCoverSection data={section} />
	}
}

export default function SuggestionSections() {
	const {data: suggestionSections} = useSuggestionSections()
	const serverUrl = useServerUrl()

	return (
		<>
			{suggestionSections?.map((section) => (
				<motion.div key={section.title} initial={{opacity: 0}} animate={{opacity: 1}}>
					{Object.values(CONFIG)
						.find((config) => config.shouldShow(section))
						?.component(section, serverUrl)}
				</motion.div>
			))}
		</>
	)
}
