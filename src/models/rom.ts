import {RommPlatform} from './enums/platform'
import {HasheousMetadata} from './hasheous'
import {IgdbMetadata} from './igdb'
import {LaunchBoxMetadata} from './launchbox'
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
	platformFsSlug: RommPlatform
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
	slug?: string
	summary: string | null
	alternativeNames: string[]
	youtubeVideoId: string | null
	metadatum: RomMetadatum
	igdbMetadata: IgdbMetadata | null
	ssMetadata: ScreenScrapperMetadata | null
	launchboxMetadata: LaunchBoxMetadata | null
	hasheousMetadata: HasheousMetadata | null
	pathCoverSmall: string
	pathCoverLarge: string
	urlCover: string | null
	hasManual: boolean
	pathManual: string | null
	urlManual: string | null
	isUnidentified: boolean
	isIdentified: boolean
	revision: string
	regions: string[]
	languages: string[]
	tags: string[]
	crcHash: string | null
	md5Hash: string | null
	sha1Hash: string | null
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
	userId: number
	username: string
	noteRawMarkdown: string
}

type RomUserCollection = {
	name: string
	description?: string
	romIds?: number[]
	romCount?: number
	pathCoverSmall?: string
	pathCoverLarge?: string
	pathCoversSmall?: string[]
	pathCoversLarge?: string[]
	isPublic?: boolean
	isFavorite?: boolean
	isVirtual?: boolean
	isSmart?: boolean
	createdAt?: string
	updatedAt?: string
	id: number
	urlCover?: string
	userId?: number
}

export type RomUserSave = {
	id: number
	romId: number
	userId: number
	fileName: string
	fileNameNoTags: string
	fileNameNoExt: string
	fileExtension: string
	filePath: string
	fileSizeBytes: number
	fullPath: string
	downloadPath: string
	missingFromFs: string
	createdAt: string
	updatedAt: string
	emulator: string
	screenshot: RomUserScreenshot | null
}

type RomUserScreenshot = {
	id: number
	romId: number
	userId: number
	fileName: string
	fileNameNoTags: string
	fileNameNoExt: string
	fileExtension: string
	filePath: string
	fileSizeBytes: number
	fullPath: string
	downloadPath: string
	missingFromFs: boolean
	createdAt: string
	updatedAt: string
}

export type RomUserState = {
	id: number
	romId: number
	userId: number
	fileName: string
	fileNameNoTags: string
	fileNameNoExt: string
	fileExtension: string
	filePath: string
	fileSizeBytes: number
	fullPath: string
	downloadPath: string
	missingFromFs: string
	createdAt: string
	updatedAt: string
	emulator: string
	screenshot: RomUserScreenshot
}

type RomUser = {
	id: number
	userId: number
	romId: number
	createdAt: string
	updatedAt: string
	lastPlayed: string | null
	noteRawMarkdown: string
	noteIsPublic: boolean
	isMainSibling: boolean
	backlogged: boolean
	nowPlaying: boolean
	hidden: boolean
	rating: number
	difficulty: number
	completion: number
	status?: RomUserStatus
}

export type RomSiblings = {
	id: number
	name: string
	fsNameNoTags: string
	fsNameNoExt: string
	sortComparator: string
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

export type RomFile = {
	id: number
	romId: number
	fileName: string
	filePath: string
	fileSizeBytes: number
	fullPath: string
	createdAt: string
	updatedAt: string
	lastModified: string
	crcHash?: string
	md5Hash?: string
	sha1Hash?: string
	category: RomFileCategory
}

type RomMetadatum = {
	romId: number
	genres: string[]
	franchises: string[]
	collections: string[]
	companies: string[]
	gameModes: string[]
	ageRatings: string[]
	firstReleaseDate?: number
	averageRating?: number
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
