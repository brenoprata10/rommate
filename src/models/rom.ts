import {HasheousMetadata} from './hasheous'
import {IgdbMetadata} from './igdb'
import {LaunchBoxMetadata} from './launchbox'
import {MobyMetadata} from './moby'
import {RetroAchievementsMetadata} from './retroachievements'
import {ScreenScrapperMetadata} from './screen-scrapper'

export type Rom = {
	id: number
	igdbId: number | null
	sgdbId: number | null
	mobyId: number | null
	ssId: number | null
	raId: number | null
	launchboxId: number | null
	hasheousId: number | null
	tgdbId: number | null
	platformId: number
	platformSlug: string
	platformFsSlug: string
	platformName: string
	platformCustomName: string
	platformDisplayName: string
	fsName: string
	fsNameNoTags: string
	fsNameNoExt: string
	fsExtension: string
	fsPath: string
	fsSizeBytes: number
	name: string
	slug: string
	summary: string
	alternativeNames: string[]
	youtubeVideoId: string | null
	metadatum: RomMetadatum
	igdbMetadata: IgdbMetadata | null
	mobyMetadata: MobyMetadata | null
	ssMetadata: ScreenScrapperMetadata | null
	launchboxMetadata: LaunchBoxMetadata | null
	hasheousMetadata: HasheousMetadata | null
	pathCoverSmall: string
	pathCoverLarge: string
	urlCover: string
	hasManual: boolean
	pathManual: string | null
	urlManual: string
	isUnidentified: boolean
	isIdentified: boolean
	revision: string
	regions: string[]
	languages: string[]
	tags: string[]
	crcHash: string
	md5Hash: string
	sha1Hash: string
	multi: boolean
	files: RomFile[]
	fullPath: string
	createdAt: string
	updatedAt: string
	missingFromFs: boolean
	mergedRaMetadata: RetroAchievementsMetadata | null
	mergedScreenshots: string[] | null
	siblings: RomSiblings[]
	romUser: RomUser
	userSaves: RomUserSave[] | null
	userStates: RomUserState[] | null
	userScreenshots: RomUserScreenshot[] | null
	userNotes: RomUserNote[] | null
	userCollections: RomUserCollection[] | null
}

type RomUserNote = {
	user_id: number
	username: string
	note_raw_markdown: string
}

type RomUserCollection = {
	name: string
	description: string
	rom_ids: number[]
	rom_count: number
	path_cover_small: string
	path_cover_large: string
	path_covers_small: string[]
	path_covers_large: string[]
	is_public: boolean
	is_favorite: boolean
	is_virtual: boolean
	is_smart: boolean
	created_at: string
	updated_at: string
	id: number
	url_cover: string
	user_id: number
}

type RomUserSave = {
	id: number
	rom_id: number
	user_id: number
	file_name: string
	file_name_no_tags: string
	file_name_no_ext: string
	file_extension: string
	file_path: string
	file_size_bytes: number
	full_path: string
	download_path: string
	missing_from_fs: string
	created_at: string
	updated_at: string
	emulator: string
	screenshot: RomUserScreenshot
}

type RomUserScreenshot = {
	id: number
	rom_id: number
	user_id: number
	file_name: string
	file_name_no_tags: string
	file_name_no_ext: string
	file_extension: string
	file_path: string
	file_size_bytes: number
	full_path: string
	download_path: string
	missing_from_fs: boolean
	created_at: string
	updated_at: string
}

type RomUserState = {
	id: number
	rom_id: number
	user_id: number
	file_name: string
	file_name_no_tags: string
	file_name_no_ext: string
	file_extension: string
	file_path: string
	file_size_bytes: number
	full_path: string
	download_path: string
	missing_from_fs: boolean
	created_at: string
	updated_at: string
	emulator: string
	screenshot: RomUserScreenshot
}

type RomUser = {
	id: number
	user_id: number
	rom_id: number
	created_at: string
	updated_at: string
	last_played: string | null
	note_raw_markdown: string
	note_is_public: boolean
	is_main_sibling: boolean
	backlogged: boolean
	now_playing: boolean
	hidden: boolean
	rating: number
	difficulty: number
	completion: number
	status?: RomUserStatus
}

type RomSiblings = {
	id: number
	name: string
	fs_name_no_tags: string
	fs_name_no_ext: string
	sort_comparator: string
}

enum RomFileCategory {
	DLC = 'dlc',
	HACK = 'hack',
	MANUAL = 'manual',
	PATCH = 'patch',
	Update = 'update',
	MOD = 'mod',
	DEMO = 'demo',
	TRANSLATION = 'translation',
	PROTOTYPE = 'prototype'
}

type RomFile = {
	id: number
	rom_id: number
	file_name: string
	file_path: string
	file_size_bytes: number
	full_path: string
	created_at: string
	updated_at: string
	last_modified: string
	crc_hash?: string
	md5_hash?: string
	sha1_hash?: string
	category?: RomFileCategory
}

type RomMetadatum = {
	rom_id: number
	genres: string[]
	franchises: string[]
	collections: string[]
	companies: string[]
	game_modes: string[]
	age_ratings: string[]
	first_release_date: number
	average_rating: number
}

enum RomUserStatus {
	INCOMPLETE = 'incomplete',
	FINISHED = 'finished',
	COMPLETED100 = 'completed_100',
	RETIRED = 'retired',
	NEVERPLAYING = 'never_playing'
}

export type RomStats = {
	platforms: number
	roms: number
	saves: number
	states: number
	screenshots: number
	total_filesize_bytes: number
}
