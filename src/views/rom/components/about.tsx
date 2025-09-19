import ContentCard from '@/components/ui/content-card'
import {
	BowArrow,
	Car,
	Castle,
	Dices,
	Ellipsis,
	File,
	HardDrive,
	Joystick,
	LibraryBig,
	Map,
	Puzzle,
	Rocket,
	Sword,
	Swords,
	Tag,
	ToyBrick,
	TrendingUpDownIcon,
	Volleyball
} from 'lucide-react'
import bytes from 'bytes'
import AboutBadge from './about-badge'
import {Rom} from '@/models/rom'

const BADGE_SIZE = {width: 14, height: 14}

const GENRE_CONFIG: Record<string, React.ReactNode> = {
	adventure: <Map {...BADGE_SIZE} />,
	shooter: <BowArrow {...BADGE_SIZE} />,
	platform: <ToyBrick {...BADGE_SIZE} />,
	puzzle: <Puzzle {...BADGE_SIZE} />,
	'role-playing (rpg)': <Sword {...BADGE_SIZE} />,
	arcade: <Joystick {...BADGE_SIZE} />,
	racing: <Car {...BADGE_SIZE} />,
	"hack and slash/beat 'em up": <Swords {...BADGE_SIZE} />,
	indie: <TrendingUpDownIcon {...BADGE_SIZE} />,
	strategy: <Puzzle {...BADGE_SIZE} />,
	sport: <Volleyball {...BADGE_SIZE} />,
	'turn-based strategy (tbs)': <Dices {...BADGE_SIZE} />
}

export default function About({rom}: {rom: Rom}) {
	const {franchises, companies, genres} = rom.metadatum

	const releaseDate = new Intl.DateTimeFormat('en', {month: 'long', year: 'numeric'}).format(
		rom?.metadatum.firstReleaseDate
	)

	return (
		<div className='max-w-[16.375rem] w-full'>
			<ContentCard title='About'>
				<div className='flex flex-col gap-3'>
					<AboutBadge label={rom.fsName} badge={<File {...BADGE_SIZE} />} />
					<AboutBadge label={bytes(rom.fsSizeBytes) ?? ''} badge={<HardDrive {...BADGE_SIZE} />} />
					<AboutBadge label={releaseDate} badge={<Rocket {...BADGE_SIZE} />} />
					<BadgeList list={rom.tags.map((tag) => ({label: tag, icon: <Tag {...BADGE_SIZE} />}))} />
					<BadgeList
						list={genres.map((genre) => ({
							label: genre,
							icon: GENRE_CONFIG[genre.toLowerCase()] ?? <Ellipsis {...BADGE_SIZE} />
						}))}
					/>
					<BadgeList list={franchises.map((franchise) => ({label: franchise, icon: <LibraryBig {...BADGE_SIZE} />}))} />
					<BadgeList list={companies.map((company) => ({label: company, icon: <Castle {...BADGE_SIZE} />}))} />
				</div>
			</ContentCard>
		</div>
	)
}

const BadgeList = ({list}: {list: Array<{label: string; icon: React.ReactNode}>}) => {
	if (list.length === 0) {
		return null
	}
	return (
		<div className='flex gap-3 flex-wrap'>
			{list.map((item) => (
				<AboutBadge key={item.label} label={item.label} badge={item.icon} />
			))}
		</div>
	)
}
