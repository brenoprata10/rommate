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
	LucideProps,
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
import React from 'react'

const BADGE_SIZE = {width: 14, height: 14}

type LucideIconComponent = React.ForwardRefExoticComponent<
	Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
>

const GENRE_CONFIG: Record<string, LucideIconComponent> = {
	adventure: Map,
	shooter: BowArrow,
	platform: ToyBrick,
	puzzle: Puzzle,
	'role-playing (rpg)': Sword,
	arcade: Joystick,
	racing: Car,
	"hack and slash/beat 'em up": Swords,
	indie: TrendingUpDownIcon,
	strategy: Puzzle,
	sport: Volleyball,
	'turn-based strategy (tbs)': Dices
}

export default function About({rom}: {rom: Rom}) {
	const {franchises, companies, genres} = rom.metadatum

	const releaseDate = new Intl.DateTimeFormat('en', {month: 'long', year: 'numeric'}).format(
		rom?.metadatum.firstReleaseDate
	)

	return (
		<div className='max-[1110px]:max-w-none max-w-[16.375rem] w-full'>
			<ContentCard title='About'>
				<div className='flex flex-col gap-3'>
					<AboutBadge label={rom.fsName} badge={<File {...BADGE_SIZE} />} />
					<AboutBadge label={bytes(rom.fsSizeBytes) ?? ''} badge={<HardDrive {...BADGE_SIZE} />} />
					<AboutBadge label={releaseDate} badge={<Rocket {...BADGE_SIZE} />} />
					<BadgeList list={rom.tags.map((tag) => ({label: tag, icon: Tag}))} />
					<BadgeList
						list={genres.map((genre) => ({
							label: genre,
							icon: GENRE_CONFIG[genre.toLowerCase()] ?? Ellipsis
						}))}
					/>
					<BadgeList list={franchises.map((franchise) => ({label: franchise, icon: LibraryBig}))} />
					<BadgeList list={companies.map((company) => ({label: company, icon: Castle}))} />
				</div>
			</ContentCard>
		</div>
	)
}

const BadgeList = ({list}: {list: Array<{label: string; icon: LucideIconComponent}>}) => {
	if (list.length === 0) {
		return null
	}

	return (
		<div className='flex gap-3 flex-wrap'>
			{list.map((item) => (
				<AboutBadge key={item.label} label={item.label} badge={<item.icon {...BADGE_SIZE} />} />
			))}
		</div>
	)
}
