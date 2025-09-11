import Heading from '@/components/ui/heading'
import useLoggedInUser from '@/hooks/api/useLoggedInUser'
import useRoms from '@/hooks/api/useRoms'
import useRommSession from '@/hooks/useRommSession'
import {useEffect} from 'react'
import {useNavigate} from 'react-router'
import ContinuePlaying from './components/continue-playing'
import {Rom} from '@/models/rom'

const MOCK_ROMS = {
	items: [
		{
			id: 166,
			igdb_id: null,
			sgdb_id: 5253312,
			moby_id: null,
			ss_id: 202443,
			ra_id: null,
			launchbox_id: null,
			hasheous_id: null,
			tgdb_id: null,
			platform_id: 12,
			platform_slug: 'gbc',
			platform_fs_slug: 'gbc',
			platform_name: 'Game Boy Color',
			platform_custom_name: '',
			platform_display_name: 'Game Boy Color',
			fs_name: 'ucity.gbc',
			fs_name_no_tags: 'ucity',
			fs_name_no_ext: 'ucity',
			fs_extension: 'gbc',
			fs_path: 'roms/gbc',
			fs_size_bytes: 131072,
			name: 'µCity',
			slug: null,
			summary:
				"This is µCity (also spelled 'uCity', pronounced 'micro-city'), the open-source city-building game for Game Boy Color.",
			alternative_names: ['uCity', 'µCity'],
			youtube_video_id: null,
			metadatum: {
				rom_id: 166,
				genres: ['Build And Management', 'Simulation'],
				franchises: [],
				collections: [],
				companies: ['Antonio Niño Díaz', 'Antonio Niño Díaz'],
				game_modes: [],
				age_ratings: [],
				first_release_date: 1460160000000,
				average_rating: null
			},
			igdb_metadata: {},
			moby_metadata: {},
			ss_metadata: {
				ss_score: '',
				first_release_date: 1460160000,
				alternative_names: ['uCity', 'µCity'],
				companies: ['Antonio Niño Díaz', 'Antonio Niño Díaz'],
				franchises: [],
				game_modes: [],
				genres: ['Build And Management', 'Simulation']
			},
			launchbox_metadata: {},
			hasheous_metadata: {},
			path_cover_small: '/assets/romm/resources/roms/12/166/cover/small.png?ts=2025-07-19 16:01:41',
			path_cover_large: '/assets/romm/resources/roms/12/166/cover/big.png?ts=2025-07-19 16:01:41',
			urlCover:
				'https://neoclone.screenscraper.fr/api2/mediaJeu.php?devid=zurdi15&devpassword=xTJwoOFjOQG&softname=romm&ssid=arcaneasada&sspassword=Z4aKS34yLgnP8R6utsAUjzMrB&systemeid=10&jeuid=202443&media=box-2D(wor)',
			has_manual: true,
			path_manual: 'roms/12/166/manual/166.pdf',
			url_manual:
				'https://neoclone.screenscraper.fr/api2/mediaManuelJeu.php?devid=zurdi15&devpassword=xTJwoOFjOQG&softname=romm&ssid=arcaneasada&sspassword=Z4aKS34yLgnP8R6utsAUjzMrB&systemeid=10&jeuid=202443&media=manuel(us)',
			is_unidentified: false,
			is_identified: true,
			revision: '',
			regions: [],
			languages: [],
			tags: [],
			crc_hash: '5a84b54b',
			md5_hash: 'a13bebff10a53c113554b8e882343d9d',
			sha1_hash: '8b65e5fd3e6cdcd610118c12ee0052651edeb5e1',
			multi: false,
			files: [
				{
					id: 174,
					rom_id: 166,
					file_name: 'ucity.gbc',
					file_path: 'roms/gbc',
					file_size_bytes: 131072,
					full_path: 'roms/gbc/ucity.gbc',
					created_at: '2025-07-19T02:13:29+00:00',
					updated_at: '2025-07-19T02:13:29+00:00',
					last_modified: '2025-07-19T01:53:20+00:00',
					crc_hash: '5a84b54b',
					md5_hash: 'a13bebff10a53c113554b8e882343d9d',
					sha1_hash: '8b65e5fd3e6cdcd610118c12ee0052651edeb5e1',
					category: null
				}
			],
			full_path: 'roms/gbc/ucity.gbc',
			created_at: '2025-07-19T02:13:22+00:00',
			updated_at: '2025-07-19T16:01:41+00:00',
			missing_from_fs: false,
			siblings: [],
			rom_user: {
				id: -1,
				user_id: -1,
				rom_id: -1,
				created_at: '2025-09-11T18:40:57.845620+00:00',
				updated_at: '2025-09-11T18:40:57.845620+00:00',
				last_played: null,
				note_raw_markdown: '',
				note_is_public: false,
				is_main_sibling: false,
				backlogged: false,
				now_playing: false,
				hidden: false,
				rating: 0,
				difficulty: 0,
				completion: 0,
				status: null,
				user__username: ''
			}
		},
		{
			id: 165,
			igdb_id: 176046,
			sgdb_id: null,
			moby_id: null,
			ss_id: 200453,
			ra_id: 7988,
			launchbox_id: null,
			hasheous_id: 240902,
			tgdb_id: null,
			platform_id: 12,
			platform_slug: 'gbc',
			platform_fs_slug: 'gbc',
			platform_name: 'Game Boy Color',
			platform_custom_name: '',
			platform_display_name: 'Game Boy Color',
			fs_name: 'infinity.gb',
			fs_name_no_tags: 'infinity',
			fs_name_no_ext: 'infinity',
			fs_extension: 'gb',
			fs_path: 'roms/gbc',
			fs_size_bytes: 2097152,
			name: 'Infinity',
			slug: 'infinity--3',
			summary:
				'It is a role-playing game that was in development for the Game Boy Color and was supposed to be released in 2001, but development was canceled before it could end. The game, however, is about to return, 20 years later, with a Kickstarter campaign that aims not only to complete the game, but also to make physical cartridges for the Game Boy.',
			alternative_names: ['Infinity GBC'],
			youtube_video_id: 'v_hR4bG7liE',
			metadatum: {
				rom_id: 165,
				genres: ['Role-playing (RPG)', 'Tactical'],
				franchises: [],
				collections: [],
				companies: ['Incube8 Games'],
				game_modes: ['Single player'],
				age_ratings: ['RP'],
				first_release_date: null,
				average_rating: null
			},
			igdb_metadata: {
				total_rating: '0.0',
				aggregated_rating: '0.0',
				first_release_date: null,
				youtube_video_id: 'v_hR4bG7liE',
				genres: ['Role-playing (RPG)', 'Tactical'],
				franchises: [],
				alternative_names: ['Infinity GBC'],
				collections: [],
				companies: ['Incube8 Games'],
				game_modes: ['Single player'],
				age_ratings: [
					{
						rating: 'RP',
						category: 'ESRB',
						rating_cover_url: 'https://www.igdb.com/icons/rating_icons/esrb/esrb_rp.png'
					}
				],
				platforms: [
					{
						igdb_id: 22,
						name: 'Game Boy Color'
					},
					{
						igdb_id: 6,
						name: 'PC (Microsoft Windows)'
					},
					{
						igdb_id: 130,
						name: 'Nintendo Switch'
					}
				],
				expansions: [],
				dlcs: [],
				remasters: [],
				remakes: [],
				expanded_games: [],
				ports: [],
				similar_games: [
					{
						id: 13196,
						name: 'Tears of Avia',
						slug: 'tears-of-avia',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co2kev.jpg'
					},
					{
						id: 23651,
						name: 'Echo of Soul',
						slug: 'echo-of-soul',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1r78.jpg'
					},
					{
						id: 49414,
						name: 'Oriental Blue: Ao no Tengai',
						slug: 'oriental-blue-ao-no-tengai',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1r7g.jpg'
					},
					{
						id: 19404,
						name: 'Eador: Imperium',
						slug: 'eador-imperium',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1y1f.jpg'
					},
					{
						id: 96217,
						name: 'Eternity: The Last Unicorn',
						slug: 'eternity-the-last-unicorn',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1k9j.jpg'
					},
					{
						id: 54775,
						name: 'Shadows: Awakening',
						slug: 'shadows-awakening',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1mht.jpg'
					},
					{
						id: 19164,
						name: 'Borderlands 3',
						slug: 'borderlands-3',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co20r3.jpg'
					},
					{
						id: 106987,
						name: 'Torchlight III',
						slug: 'torchlight-iii',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co2t2f.jpg'
					},
					{
						id: 113910,
						name: 'Forged Fantasy',
						slug: 'forged-fantasy',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1ikj.jpg'
					},
					{
						id: 99118,
						name: 'Dragalia Lost',
						slug: 'dragalia-lost',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1rfz.jpg'
					}
				]
			},
			moby_metadata: {},
			ss_metadata: {
				ss_score: '',
				first_release_date: null,
				alternative_names: ['Infinity'],
				companies: ['Incube8 Games'],
				franchises: [],
				game_modes: [],
				genres: ['Role Playing Game']
			},
			launchbox_metadata: {},
			hasheous_metadata: {
				tosec_match: false,
				mame_arcade_match: false,
				mame_mess_match: false,
				nointro_match: true,
				redump_match: false,
				whdload_match: false,
				ra_match: true,
				fbneo_match: false
			},
			path_cover_small: '/assets/romm/resources/roms/12/165/cover/small.jpg?ts=2025-07-19 16:04:08',
			path_cover_large: '/assets/romm/resources/roms/12/165/cover/big.jpg?ts=2025-07-19 16:04:08',
			urlCover: '',
			has_manual: false,
			path_manual: null,
			url_manual: '',
			is_unidentified: false,
			is_identified: true,
			revision: '',
			regions: [],
			languages: [],
			tags: [],
			crc_hash: '4ade94aa',
			md5_hash: '6d6507bd38c76a9baa90b8e305ebea13',
			sha1_hash: 'fdfd6d4cbebbf64fc7d1264f0450be270be89823',
			multi: false,
			files: [
				{
					id: 173,
					rom_id: 165,
					file_name: 'infinity.gb',
					file_path: 'roms/gbc',
					file_size_bytes: 2097152,
					full_path: 'roms/gbc/infinity.gb',
					created_at: '2025-07-19T02:13:20+00:00',
					updated_at: '2025-07-19T02:13:20+00:00',
					last_modified: '2025-07-19T01:53:20+00:00',
					crc_hash: '4ade94aa',
					md5_hash: '6d6507bd38c76a9baa90b8e305ebea13',
					sha1_hash: 'fdfd6d4cbebbf64fc7d1264f0450be270be89823',
					category: null
				}
			],
			full_path: 'roms/gbc/infinity.gb',
			created_at: '2025-07-19T02:13:12+00:00',
			updated_at: '2025-07-19T16:04:08+00:00',
			missing_from_fs: false,
			siblings: [],
			rom_user: {
				id: -1,
				user_id: -1,
				rom_id: -1,
				created_at: '2025-09-11T18:40:57.847325+00:00',
				updated_at: '2025-09-11T18:40:57.847325+00:00',
				last_played: null,
				note_raw_markdown: '',
				note_is_public: false,
				is_main_sibling: false,
				backlogged: false,
				now_playing: false,
				hidden: false,
				rating: 0,
				difficulty: 0,
				completion: 0,
				status: null,
				user__username: ''
			}
		},
		{
			id: 164,
			igdb_id: 293713,
			sgdb_id: null,
			moby_id: null,
			ss_id: 82768,
			ra_id: null,
			launchbox_id: null,
			hasheous_id: null,
			tgdb_id: null,
			platform_id: 12,
			platform_slug: 'gbc',
			platform_fs_slug: 'gbc',
			platform_name: 'Game Boy Color',
			platform_custom_name: '',
			platform_display_name: 'Game Boy Color',
			fs_name: 'SpaceInvasion01.gb',
			fs_name_no_tags: 'SpaceInvasion01',
			fs_name_no_ext: 'SpaceInvasion01',
			fs_extension: 'gb',
			fs_path: 'roms/gbc',
			fs_size_bytes: 131072,
			name: 'Space Invasion',
			slug: 'space-invasion--2',
			summary: 'Destroy the waves of aliens before they descend to the surface and wipe out your ship.',
			alternative_names: ['Space Invasion', 'Space Invasion'],
			youtube_video_id: null,
			metadatum: {
				rom_id: 164,
				genres: ['Arcade', 'Indie', 'Shooter'],
				franchises: [],
				collections: [],
				companies: ['Thalamus Digital'],
				game_modes: ['Single player'],
				age_ratings: [],
				first_release_date: 1689724800000,
				average_rating: null
			},
			igdb_metadata: {
				total_rating: '0.0',
				aggregated_rating: '0.0',
				first_release_date: 1689724800,
				youtube_video_id: null,
				genres: ['Shooter', 'Indie', 'Arcade'],
				franchises: [],
				alternative_names: [],
				collections: [],
				companies: ['Thalamus Digital'],
				game_modes: ['Single player'],
				age_ratings: [],
				platforms: [
					{
						igdb_id: 22,
						name: 'Game Boy Color'
					}
				],
				expansions: [],
				dlcs: [],
				remasters: [],
				remakes: [],
				expanded_games: [],
				ports: [],
				similar_games: [
					{
						id: 43367,
						name: 'Rico',
						slug: 'rico',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1q4d.jpg'
					},
					{
						id: 105269,
						name: 'Gene Rain',
						slug: 'gene-rain',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1rfu.jpg'
					},
					{
						id: 107318,
						name: 'Rebel Galaxy Outlaw',
						slug: 'rebel-galaxy-outlaw',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co2feh.jpg'
					},
					{
						id: 22799,
						name: 'Pawarumi',
						slug: 'pawarumi',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1m5n.jpg'
					},
					{
						id: 17130,
						name: 'Unclaimed World',
						slug: 'unclaimed-world',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1rec.jpg'
					},
					{
						id: 119493,
						name: 'Space Mercs',
						slug: 'space-mercs',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1mqu.jpg'
					},
					{
						id: 32902,
						name: 'GentleMoon 2',
						slug: 'gentlemoon-2',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1rry.jpg'
					},
					{
						id: 13200,
						name: 'Planetbase',
						slug: 'planetbase',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1mn1.jpg'
					},
					{
						id: 78770,
						name: 'SD Gundam Next Evolution',
						slug: 'sd-gundam-next-evolution',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1n6h.jpg'
					},
					{
						id: 34823,
						name: 'Sol 0: Mars Colonization',
						slug: 'sol-0-mars-colonization',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co2iwf.jpg'
					}
				]
			},
			moby_metadata: {},
			ss_metadata: {
				ss_score: '',
				first_release_date: 985910400,
				alternative_names: ['Space Invasion', 'Space Invasion'],
				companies: ['Rocket Games', 'Thalamus'],
				franchises: [],
				game_modes: [],
				genres: ["Shoot'em Up"]
			},
			launchbox_metadata: {},
			hasheous_metadata: {},
			path_cover_small: '/assets/romm/resources/roms/12/164/cover/small.png?ts=2025-07-19 16:31:07',
			path_cover_large: '/assets/romm/resources/roms/12/164/cover/big.png?ts=2025-07-19 16:31:07',
			urlCover:
				'https://neoclone.screenscraper.fr/api2/mediaJeu.php?devid=zurdi15&devpassword=xTJwoOFjOQG&softname=romm&ssid=arcaneasada&sspassword=Z4aKS34yLgnP8R6utsAUjzMrB&systemeid=10&jeuid=82768&media=box-2D(eu)',
			has_manual: false,
			path_manual: null,
			url_manual: '',
			is_unidentified: false,
			is_identified: true,
			revision: '',
			regions: [],
			languages: [],
			tags: [],
			crc_hash: '60dfa546',
			md5_hash: '8ac285d7dfef074a0564cfea247e8d02',
			sha1_hash: '304b75c074e3965a3ca3b7f7e309bb0d00dab2c8',
			multi: false,
			files: [
				{
					id: 172,
					rom_id: 164,
					file_name: 'SpaceInvasion01.gb',
					file_path: 'roms/gbc',
					file_size_bytes: 131072,
					full_path: 'roms/gbc/SpaceInvasion01.gb',
					created_at: '2025-07-19T02:13:11+00:00',
					updated_at: '2025-07-19T02:13:11+00:00',
					last_modified: '2025-07-19T01:53:20+00:00',
					crc_hash: '60dfa546',
					md5_hash: '8ac285d7dfef074a0564cfea247e8d02',
					sha1_hash: '304b75c074e3965a3ca3b7f7e309bb0d00dab2c8',
					category: null
				}
			],
			full_path: 'roms/gbc/SpaceInvasion01.gb',
			created_at: '2025-07-19T02:13:07+00:00',
			updated_at: '2025-07-19T16:31:07+00:00',
			missing_from_fs: false,
			siblings: [],
			rom_user: {
				id: -1,
				user_id: -1,
				rom_id: -1,
				created_at: '2025-09-11T18:40:57.847836+00:00',
				updated_at: '2025-09-11T18:40:57.847836+00:00',
				last_played: null,
				note_raw_markdown: '',
				note_is_public: false,
				is_main_sibling: false,
				backlogged: false,
				now_playing: false,
				hidden: false,
				rating: 0,
				difficulty: 0,
				completion: 0,
				status: null,
				user__username: ''
			}
		},
		{
			id: 163,
			igdb_id: null,
			sgdb_id: null,
			moby_id: null,
			ss_id: null,
			ra_id: null,
			launchbox_id: null,
			hasheous_id: null,
			tgdb_id: null,
			platform_id: 12,
			platform_slug: 'gbc',
			platform_fs_slug: 'gbc',
			platform_name: 'Game Boy Color',
			platform_custom_name: '',
			platform_display_name: 'Game Boy Color',
			fs_name: 'Last Crown Warriors (Demo) 2.1.1.gb',
			fs_name_no_tags: 'Last Crown Warriors',
			fs_name_no_ext: 'Last Crown Warriors (Demo) 2.1.1',
			fs_extension: 'gb',
			fs_path: 'roms/gbc',
			fs_size_bytes: 262144,
			name: 'Last Crown Warriors',
			slug: null,
			summary: '',
			alternative_names: [],
			youtube_video_id: null,
			metadatum: {
				rom_id: 163,
				genres: [],
				franchises: [],
				collections: [],
				companies: [],
				game_modes: [],
				age_ratings: [],
				first_release_date: null,
				average_rating: null
			},
			igdb_metadata: {},
			moby_metadata: {},
			ss_metadata: {},
			launchbox_metadata: {},
			hasheous_metadata: {},
			path_cover_small: '/assets/romm/resources/roms/12/163/cover/small.png?ts=2025-07-19 16:32:40',
			path_cover_large: '/assets/romm/resources/roms/12/163/cover/big.png?ts=2025-07-19 16:32:40',
			urlCover: '',
			has_manual: false,
			path_manual: null,
			url_manual: '',
			is_unidentified: true,
			is_identified: false,
			revision: '',
			regions: [],
			languages: [],
			tags: ['Demo'],
			crc_hash: '9a134100',
			md5_hash: 'a096bf1910cbdfc8eebe83180db68979',
			sha1_hash: '75b5188a5b8a720ff08894379147c7870ac8825d',
			multi: false,
			files: [
				{
					id: 171,
					rom_id: 163,
					file_name: 'Last Crown Warriors (Demo) 2.1.1.gb',
					file_path: 'roms/gbc',
					file_size_bytes: 262144,
					full_path: 'roms/gbc/Last Crown Warriors (Demo) 2.1.1.gb',
					created_at: '2025-07-19T02:13:06+00:00',
					updated_at: '2025-07-19T02:13:06+00:00',
					last_modified: '2025-07-19T01:53:20+00:00',
					crc_hash: '9a134100',
					md5_hash: 'a096bf1910cbdfc8eebe83180db68979',
					sha1_hash: '75b5188a5b8a720ff08894379147c7870ac8825d',
					category: null
				}
			],
			full_path: 'roms/gbc/Last Crown Warriors (Demo) 2.1.1.gb',
			created_at: '2025-07-19T02:13:01+00:00',
			updated_at: '2025-07-19T16:32:40+00:00',
			missing_from_fs: false,
			siblings: [],
			rom_user: {
				id: -1,
				user_id: -1,
				rom_id: -1,
				created_at: '2025-09-11T18:40:57.848171+00:00',
				updated_at: '2025-09-11T18:40:57.848171+00:00',
				last_played: null,
				note_raw_markdown: '',
				note_is_public: false,
				is_main_sibling: false,
				backlogged: false,
				now_playing: false,
				hidden: false,
				rating: 0,
				difficulty: 0,
				completion: 0,
				status: null,
				user__username: ''
			}
		},
		{
			id: 162,
			igdb_id: null,
			sgdb_id: 5445165,
			moby_id: null,
			ss_id: null,
			ra_id: 13172,
			launchbox_id: null,
			hasheous_id: 257736,
			tgdb_id: null,
			platform_id: 12,
			platform_slug: 'gbc',
			platform_fs_slug: 'gbc',
			platform_name: 'Game Boy Color',
			platform_custom_name: '',
			platform_display_name: 'Game Boy Color',
			fs_name: 'JetPakDX.gb',
			fs_name_no_tags: 'JetPakDX',
			fs_name_no_ext: 'JetPakDX',
			fs_extension: 'gb',
			fs_path: 'roms/gbc',
			fs_size_bytes: 131072,
			name: 'Jet Pak DX',
			slug: null,
			summary:
				'JetPak DX is a port of the renowned classic Jetpac, originally created by Ultimate Play The Game.\r\n\r\nThe game was developed by Quang Nguyen, with the help of Manfred Linzner on sound and music, along with Veepixels contributing graphics. In 1999, the game was submitted to Bung Enterprises 1st Gameboy Coding Competition.\r\n\r\nIn 2020, a new version titled Super JetPack DX was released on Game Boy cartridges. This enhanced edition features new graphics and gameplay elements. ',
			alternative_names: [],
			youtube_video_id: null,
			metadatum: {
				rom_id: 162,
				genres: [],
				franchises: [],
				collections: [],
				companies: [],
				game_modes: [],
				age_ratings: [],
				first_release_date: null,
				average_rating: null
			},
			igdb_metadata: {},
			moby_metadata: {},
			ss_metadata: {},
			launchbox_metadata: {},
			hasheous_metadata: {
				tosec_match: false,
				mame_arcade_match: false,
				mame_mess_match: false,
				nointro_match: false,
				redump_match: false,
				whdload_match: false,
				ra_match: true,
				fbneo_match: false
			},
			path_cover_small: '/assets/romm/resources/roms/12/162/cover/small.jpg?ts=2025-07-19 16:03:38',
			path_cover_large: '/assets/romm/resources/roms/12/162/cover/big.jpg?ts=2025-07-19 16:03:38',
			urlCover: '',
			has_manual: false,
			path_manual: null,
			url_manual: '',
			is_unidentified: false,
			is_identified: true,
			revision: '',
			regions: [],
			languages: [],
			tags: [],
			crc_hash: 'b16d6847',
			md5_hash: '3ab685d161a07b0fa5a38ce66f2f59c2',
			sha1_hash: 'f5c80e2d969aca3ceca60d59e77e89b95aa022c4',
			multi: false,
			files: [
				{
					id: 170,
					rom_id: 162,
					file_name: 'JetPakDX.gb',
					file_path: 'roms/gbc',
					file_size_bytes: 131072,
					full_path: 'roms/gbc/JetPakDX.gb',
					created_at: '2025-07-19T02:12:58+00:00',
					updated_at: '2025-07-19T02:12:58+00:00',
					last_modified: '2025-07-19T01:53:20+00:00',
					crc_hash: 'b16d6847',
					md5_hash: '3ab685d161a07b0fa5a38ce66f2f59c2',
					sha1_hash: 'f5c80e2d969aca3ceca60d59e77e89b95aa022c4',
					category: null
				}
			],
			full_path: 'roms/gbc/JetPakDX.gb',
			created_at: '2025-07-19T02:12:35+00:00',
			updated_at: '2025-07-19T16:03:38+00:00',
			missing_from_fs: false,
			siblings: [],
			rom_user: {
				id: -1,
				user_id: -1,
				rom_id: -1,
				created_at: '2025-09-11T18:40:57.848714+00:00',
				updated_at: '2025-09-11T18:40:57.848714+00:00',
				last_played: null,
				note_raw_markdown: '',
				note_is_public: false,
				is_main_sibling: false,
				backlogged: false,
				now_playing: false,
				hidden: false,
				rating: 0,
				difficulty: 0,
				completion: 0,
				status: null,
				user__username: ''
			}
		},
		{
			id: 161,
			igdb_id: null,
			sgdb_id: null,
			moby_id: null,
			ss_id: 490523,
			ra_id: null,
			launchbox_id: null,
			hasheous_id: 257735,
			tgdb_id: null,
			platform_id: 12,
			platform_slug: 'gbc',
			platform_fs_slug: 'gbc',
			platform_name: 'Game Boy Color',
			platform_custom_name: '',
			platform_display_name: 'Game Boy Color',
			fs_name: 'GBCspelunky.gbc',
			fs_name_no_tags: 'GBCspelunky',
			fs_name_no_ext: 'GBCspelunky',
			fs_extension: 'gbc',
			fs_path: 'roms/gbc',
			fs_size_bytes: 65536,
			name: 'Spelunky',
			slug: null,
			summary:
				'GBC-spelunky is an attempt to demake Spelunky 2 for Game Boy Color. This project resulted in a playable version, albeit as an endless runner due to ambitious goals and content cuts. Some rough edges may exist due to rushed development in the final weeks, but the game features a complete character controller, robust entity system, and functional level generation and auto-tiling.',
			alternative_names: ['GBCspelunky'],
			youtube_video_id: null,
			metadatum: {
				rom_id: 161,
				genres: [],
				franchises: [],
				collections: [],
				companies: ['sukus'],
				game_modes: [],
				age_ratings: [],
				first_release_date: null,
				average_rating: null
			},
			igdb_metadata: {},
			moby_metadata: {},
			ss_metadata: {
				ss_score: '',
				first_release_date: null,
				alternative_names: ['GBCspelunky'],
				companies: ['sukus'],
				franchises: [],
				game_modes: [],
				genres: []
			},
			launchbox_metadata: {},
			hasheous_metadata: {
				tosec_match: true,
				mame_arcade_match: false,
				mame_mess_match: false,
				nointro_match: false,
				redump_match: false,
				whdload_match: false,
				ra_match: false,
				fbneo_match: false
			},
			path_cover_small: '/assets/romm/resources/roms/12/161/cover/small.png?ts=2025-07-19 16:35:31',
			path_cover_large: '/assets/romm/resources/roms/12/161/cover/big.png?ts=2025-07-19 16:35:31',
			urlCover: '',
			has_manual: false,
			path_manual: null,
			url_manual: '',
			is_unidentified: false,
			is_identified: true,
			revision: '',
			regions: [],
			languages: [],
			tags: [],
			crc_hash: '2d60d327',
			md5_hash: '920142e65e4b27c61848ed165c739777',
			sha1_hash: '27aca0703c7dada169a019c113899c91ce7b225d',
			multi: false,
			files: [
				{
					id: 169,
					rom_id: 161,
					file_name: 'GBCspelunky.gbc',
					file_path: 'roms/gbc',
					file_size_bytes: 65536,
					full_path: 'roms/gbc/GBCspelunky.gbc',
					created_at: '2025-07-19T02:12:34+00:00',
					updated_at: '2025-07-19T02:12:34+00:00',
					last_modified: '2025-07-19T01:53:20+00:00',
					crc_hash: '2d60d327',
					md5_hash: '920142e65e4b27c61848ed165c739777',
					sha1_hash: '27aca0703c7dada169a019c113899c91ce7b225d',
					category: null
				}
			],
			full_path: 'roms/gbc/GBCspelunky.gbc',
			created_at: '2025-07-19T02:12:11+00:00',
			updated_at: '2025-07-19T16:35:31+00:00',
			missing_from_fs: false,
			siblings: [],
			rom_user: {
				id: -1,
				user_id: -1,
				rom_id: -1,
				created_at: '2025-09-11T18:40:57.848976+00:00',
				updated_at: '2025-09-11T18:40:57.848976+00:00',
				last_played: null,
				note_raw_markdown: '',
				note_is_public: false,
				is_main_sibling: false,
				backlogged: false,
				now_playing: false,
				hidden: false,
				rating: 0,
				difficulty: 0,
				completion: 0,
				status: null,
				user__username: ''
			}
		},
		{
			id: 160,
			igdb_id: null,
			sgdb_id: 5445164,
			moby_id: null,
			ss_id: 200451,
			ra_id: null,
			launchbox_id: null,
			hasheous_id: 241572,
			tgdb_id: null,
			platform_id: 12,
			platform_slug: 'gbc',
			platform_fs_slug: 'gbc',
			platform_name: 'Game Boy Color',
			platform_custom_name: '',
			platform_display_name: 'Game Boy Color',
			fs_name: 'Floracy.GBC',
			fs_name_no_tags: 'Floracy',
			fs_name_no_ext: 'Floracy',
			fs_extension: 'GBC',
			fs_path: 'roms/gbc',
			fs_size_bytes: 524288,
			name: 'Floracy',
			slug: null,
			summary:
				"An unreleased game that was developed by German studio Kritzelkratz, though the game failed to attract a publisher it seems. A demo of the game once existed online via the game's website. It is unknown how far the game managed to get before cancellation, though all signs point to the demo being one of the final builds.\r\nGrow plants to battle other plants to become a master Floracy!",
			alternative_names: ['Floracy'],
			youtube_video_id: null,
			metadatum: {
				rom_id: 160,
				genres: [],
				franchises: [],
				collections: [],
				companies: ['Kritzelkratz 3000'],
				game_modes: [],
				age_ratings: [],
				first_release_date: null,
				average_rating: null
			},
			igdb_metadata: {},
			moby_metadata: {},
			ss_metadata: {
				ss_score: '',
				first_release_date: null,
				alternative_names: ['Floracy'],
				companies: ['Kritzelkratz 3000'],
				franchises: [],
				game_modes: [],
				genres: []
			},
			launchbox_metadata: {},
			hasheous_metadata: {
				tosec_match: false,
				mame_arcade_match: false,
				mame_mess_match: false,
				nointro_match: true,
				redump_match: false,
				whdload_match: false,
				ra_match: false,
				fbneo_match: false
			},
			path_cover_small: '/assets/romm/resources/roms/12/160/cover/small.jpg?ts=2025-07-19 16:02:38',
			path_cover_large: '/assets/romm/resources/roms/12/160/cover/big.jpg?ts=2025-07-19 16:02:38',
			urlCover: '',
			has_manual: false,
			path_manual: null,
			url_manual: '',
			is_unidentified: false,
			is_identified: true,
			revision: '',
			regions: [],
			languages: [],
			tags: [],
			crc_hash: 'd760ccff',
			md5_hash: 'ffadefd2e7e6325cd33f834915a09c8b',
			sha1_hash: 'bb24ea021d873990d2e381d711376ba1d300b81f',
			multi: false,
			files: [
				{
					id: 168,
					rom_id: 160,
					file_name: 'Floracy.GBC',
					file_path: 'roms/gbc',
					file_size_bytes: 524288,
					full_path: 'roms/gbc/Floracy.GBC',
					created_at: '2025-07-19T02:12:09+00:00',
					updated_at: '2025-07-19T02:12:09+00:00',
					last_modified: '2025-07-19T01:53:20+00:00',
					crc_hash: 'd760ccff',
					md5_hash: 'ffadefd2e7e6325cd33f834915a09c8b',
					sha1_hash: 'bb24ea021d873990d2e381d711376ba1d300b81f',
					category: null
				}
			],
			full_path: 'roms/gbc/Floracy.GBC',
			created_at: '2025-07-19T02:12:03+00:00',
			updated_at: '2025-07-19T16:02:38+00:00',
			missing_from_fs: false,
			siblings: [],
			rom_user: {
				id: -1,
				user_id: -1,
				rom_id: -1,
				created_at: '2025-09-11T18:40:57.849256+00:00',
				updated_at: '2025-09-11T18:40:57.849256+00:00',
				last_played: null,
				note_raw_markdown: '',
				note_is_public: false,
				is_main_sibling: false,
				backlogged: false,
				now_playing: false,
				hidden: false,
				rating: 0,
				difficulty: 0,
				completion: 0,
				status: null,
				user__username: ''
			}
		},
		{
			id: 159,
			igdb_id: null,
			sgdb_id: null,
			moby_id: null,
			ss_id: null,
			ra_id: 7520,
			launchbox_id: null,
			hasheous_id: null,
			tgdb_id: null,
			platform_id: 11,
			platform_slug: 'nes',
			platform_fs_slug: 'nes',
			platform_name: 'Nintendo Entertainment System',
			platform_custom_name: '',
			platform_display_name: 'Nintendo Entertainment System',
			fs_name: 'streemerz-v02.nes',
			fs_name_no_tags: 'streemerz-v02',
			fs_name_no_ext: 'streemerz-v02',
			fs_extension: 'nes',
			fs_path: 'roms/nes',
			fs_size_bytes: 131088,
			name: 'Streemerz',
			slug: null,
			summary: '',
			alternative_names: [],
			youtube_video_id: null,
			metadatum: {
				rom_id: 159,
				genres: ['2D Platforming'],
				franchises: [],
				collections: [],
				companies: ['Faux Game Company', 'Mr. Podunkian'],
				game_modes: [],
				age_ratings: [],
				first_release_date: 1325376000000,
				average_rating: null
			},
			igdb_metadata: {},
			moby_metadata: {},
			ss_metadata: {},
			launchbox_metadata: {},
			hasheous_metadata: {},
			path_cover_small: '/assets/romm/resources/roms/11/159/cover/small.png?ts=2025-07-19 16:54:25',
			path_cover_large: '/assets/romm/resources/roms/11/159/cover/big.png?ts=2025-07-19 16:54:25',
			urlCover: 'https://cdn2.steamgriddb.com/grid/201f4c83c8e5b1451d87e44fe94aed0a.png',
			has_manual: false,
			path_manual: null,
			url_manual: '',
			is_unidentified: false,
			is_identified: true,
			revision: '',
			regions: [],
			languages: [],
			tags: [],
			crc_hash: 'dbfca8fb',
			md5_hash: 'ca57b36cd14291624e5864d33884535c',
			sha1_hash: 'd61e61c932e447712cb1bfdacd60c703ee31fd41',
			multi: false,
			files: [
				{
					id: 167,
					rom_id: 159,
					file_name: 'streemerz-v02.nes',
					file_path: 'roms/nes',
					file_size_bytes: 131088,
					full_path: 'roms/nes/streemerz-v02.nes',
					created_at: '2025-07-19T02:11:54+00:00',
					updated_at: '2025-07-19T02:11:54+00:00',
					last_modified: '2025-07-19T01:53:20+00:00',
					crc_hash: 'dbfca8fb',
					md5_hash: 'ca57b36cd14291624e5864d33884535c',
					sha1_hash: 'd61e61c932e447712cb1bfdacd60c703ee31fd41',
					category: null
				}
			],
			full_path: 'roms/nes/streemerz-v02.nes',
			created_at: '2025-07-19T02:11:47+00:00',
			updated_at: '2025-07-19T16:54:25+00:00',
			missing_from_fs: false,
			siblings: [],
			rom_user: {
				id: -1,
				user_id: -1,
				rom_id: -1,
				created_at: '2025-09-11T18:40:57.849553+00:00',
				updated_at: '2025-09-11T18:40:57.849553+00:00',
				last_played: null,
				note_raw_markdown: '',
				note_is_public: false,
				is_main_sibling: false,
				backlogged: false,
				now_playing: false,
				hidden: false,
				rating: 0,
				difficulty: 0,
				completion: 0,
				status: null,
				user__username: ''
			}
		},
		{
			id: 158,
			igdb_id: 30059,
			sgdb_id: 15816,
			moby_id: null,
			ss_id: 214643,
			ra_id: null,
			launchbox_id: null,
			hasheous_id: 257733,
			tgdb_id: null,
			platform_id: 11,
			platform_slug: 'nes',
			platform_fs_slug: 'nes',
			platform_name: 'Nintendo Entertainment System',
			platform_custom_name: '',
			platform_display_name: 'Nintendo Entertainment System',
			fs_name: 'owlia.nes',
			fs_name_no_tags: 'owlia',
			fs_name_no_ext: 'owlia',
			fs_extension: 'nes',
			fs_path: 'roms/nes',
			fs_size_bytes: 524304,
			name: 'The Legends of Owlia',
			slug: 'the-legends-of-owlia',
			summary:
				"The Legends of Owlia is Gradual Games' second release for the NES, now ported for your PC! It is an action-adventure game inspired by StarTropics, Crystalis, and the Legend of Zelda. Guide heroine Adlanniel and her owl friend Tyto to free the great owls and defeat Mermon king of the Mermen!!",
			alternative_names: ['Legends of Owlia'],
			youtube_video_id: null,
			metadatum: {
				rom_id: 158,
				genres: ['Adventure', 'Indie', 'Role-playing (RPG)'],
				franchises: [],
				collections: [],
				companies: ['Gradual Games', 'Gradual Games', 'Infinite Nes Lives'],
				game_modes: ['Single player'],
				age_ratings: [],
				first_release_date: 1359590400000,
				average_rating: null
			},
			igdb_metadata: {
				total_rating: '0.0',
				aggregated_rating: '0.0',
				first_release_date: 1359590400,
				youtube_video_id: null,
				genres: ['Role-playing (RPG)', 'Adventure', 'Indie'],
				franchises: [],
				alternative_names: ['Legends of Owlia'],
				collections: [],
				companies: ['Gradual Games', 'Infinite Nes Lives', 'Gradual Games'],
				game_modes: ['Single player'],
				age_ratings: [],
				platforms: [
					{
						igdb_id: 6,
						name: 'PC (Microsoft Windows)'
					},
					{
						igdb_id: 18,
						name: 'Nintendo Entertainment System'
					}
				],
				expansions: [],
				dlcs: [],
				remasters: [],
				remakes: [],
				expanded_games: [],
				ports: [],
				similar_games: [
					{
						id: 96217,
						name: 'Eternity: The Last Unicorn',
						slug: 'eternity-the-last-unicorn',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1k9j.jpg'
					},
					{
						id: 106987,
						name: 'Torchlight III',
						slug: 'torchlight-iii',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co2t2f.jpg'
					},
					{
						id: 28309,
						name: 'Tanzia',
						slug: 'tanzia',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/zlb0ljqmgn8tc8vv3mij.jpg'
					},
					{
						id: 80916,
						name: 'Omensight',
						slug: 'omensight',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co8jcc.jpg'
					},
					{
						id: 30245,
						name: 'Wanderlust Adventures',
						slug: 'wanderlust-adventures',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1i1l.jpg'
					},
					{
						id: 113360,
						name: 'Hytale',
						slug: 'hytale',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1r65.jpg'
					},
					{
						id: 105269,
						name: 'Gene Rain',
						slug: 'gene-rain',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1rfu.jpg'
					},
					{
						id: 25311,
						name: 'Star Control: Origins',
						slug: 'star-control-origins',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/rmzcpsfvnizymkhvd0qg.jpg'
					},
					{
						id: 35994,
						name: 'Survivalist',
						slug: 'survivalist',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co42qw.jpg'
					},
					{
						id: 111130,
						name: 'Apsulov: End of Gods',
						slug: 'apsulov-end-of-gods',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1h60.jpg'
					}
				]
			},
			moby_metadata: {},
			ss_metadata: {
				ss_score: '',
				first_release_date: 1464739200,
				alternative_names: ['Legends of Owlia The', 'The Legends of Owlia'],
				companies: ['Gradual Games', 'Gradual Games'],
				franchises: ['The Legend of Zelda'],
				game_modes: ['Single-player'],
				genres: ['Action / Adventure', 'Action']
			},
			launchbox_metadata: {},
			hasheous_metadata: {
				tosec_match: false,
				mame_arcade_match: false,
				mame_mess_match: false,
				nointro_match: false,
				redump_match: false,
				whdload_match: false,
				ra_match: false,
				fbneo_match: true
			},
			path_cover_small: '/assets/romm/resources/roms/11/158/cover/small.png?ts=2025-07-19 02:11:30',
			path_cover_large: '/assets/romm/resources/roms/11/158/cover/big.png?ts=2025-07-19 02:11:30',
			urlCover: 'https://cdn2.steamgriddb.com/grid/752239eae1f8df4bad90c73652e67b24.jpg',
			has_manual: true,
			path_manual: 'roms/11/158/manual/158.pdf',
			url_manual:
				'https://neoclone.screenscraper.fr/api2/mediaManuelJeu.php?devid=zurdi15&devpassword=xTJwoOFjOQG&softname=romm&ssid=arcaneasada&sspassword=Z4aKS34yLgnP8R6utsAUjzMrB&systemeid=3&jeuid=214643&media=manuel(wor)',
			is_unidentified: false,
			is_identified: true,
			revision: '',
			regions: [],
			languages: [],
			tags: [],
			crc_hash: '26858010',
			md5_hash: '2c853160353de6f1272ac503c2661223',
			sha1_hash: '406f293f6aa8ee93f42e12c4f991d7d593c78b44',
			multi: false,
			files: [
				{
					id: 166,
					rom_id: 158,
					file_name: 'owlia.nes',
					file_path: 'roms/nes',
					file_size_bytes: 524304,
					full_path: 'roms/nes/owlia.nes',
					created_at: '2025-07-19T02:11:30+00:00',
					updated_at: '2025-07-19T02:11:30+00:00',
					last_modified: '2025-07-19T01:53:20+00:00',
					crc_hash: '26858010',
					md5_hash: '2c853160353de6f1272ac503c2661223',
					sha1_hash: '406f293f6aa8ee93f42e12c4f991d7d593c78b44',
					category: null
				}
			],
			full_path: 'roms/nes/owlia.nes',
			created_at: '2025-07-19T02:11:05+00:00',
			updated_at: '2025-07-19T02:11:30+00:00',
			missing_from_fs: false,
			siblings: [],
			rom_user: {
				id: -1,
				user_id: -1,
				rom_id: -1,
				created_at: '2025-09-11T18:40:57.849927+00:00',
				updated_at: '2025-09-11T18:40:57.849927+00:00',
				last_played: null,
				note_raw_markdown: '',
				note_is_public: false,
				is_main_sibling: false,
				backlogged: false,
				now_playing: false,
				hidden: false,
				rating: 0,
				difficulty: 0,
				completion: 0,
				status: null,
				user__username: ''
			}
		},
		{
			id: 157,
			igdb_id: 48699,
			sgdb_id: null,
			moby_id: null,
			ss_id: 367600,
			ra_id: null,
			launchbox_id: null,
			hasheous_id: 257732,
			tgdb_id: null,
			platform_id: 11,
			platform_slug: 'nes',
			platform_fs_slug: 'nes',
			platform_name: 'Nintendo Entertainment System',
			platform_custom_name: '',
			platform_display_name: 'Nintendo Entertainment System',
			fs_name: 'nomolos.nes',
			fs_name_no_tags: 'nomolos',
			fs_name_no_ext: 'nomolos',
			fs_extension: 'nes',
			fs_path: 'roms/nes',
			fs_size_bytes: 524304,
			name: 'Nomolos: Storming the Catsle',
			slug: 'nomolos-storming-the-catsle',
			summary:
				"Nomolos is a platformer for the Nintendo Entertainment System. It is the first release of the retro studio Gradual Games \n  \n-Guide Nomolos through 12 action packed levels and defeat 4 of Boulder's most fearsome henchmen before finally confronting the evil Hippo in her lair, the Catsle. You will have to contend with dozens of Boulder's denizens, but fortunately powerful weapons and helpful powerups are laying around the realm that Nomolos can use to help him on his way.  \n  \n-Easy mode for novices, and two additional difficulty levels for those who like a little extra challenge.  \n  \n-Enjoy an all-baroque soundtrack with music by Domenico Scarlatti, Johann Sebastian Bach, Jean-Phillipe Rameau, Francois Couperin, and Antonio Francisco Javier Jose Soler Ramos.",
			alternative_names: ['Nomolos', 'Nomolos - Storming the CATsle'],
			youtube_video_id: null,
			metadatum: {
				rom_id: 157,
				genres: ['Platform'],
				franchises: [],
				collections: [],
				companies: ['Gradual Games', 'RetroUSB'],
				game_modes: ['Single player'],
				age_ratings: [],
				first_release_date: 1331769600000,
				average_rating: null
			},
			igdb_metadata: {
				total_rating: '0.0',
				aggregated_rating: '0.0',
				first_release_date: 1331769600,
				youtube_video_id: null,
				genres: ['Platform'],
				franchises: [],
				alternative_names: [],
				collections: [],
				companies: ['Gradual Games', 'RetroUSB'],
				game_modes: ['Single player'],
				age_ratings: [],
				platforms: [
					{
						igdb_id: 18,
						name: 'Nintendo Entertainment System'
					}
				],
				expansions: [],
				dlcs: [],
				remasters: [],
				remakes: [],
				expanded_games: [],
				ports: [],
				similar_games: [
					{
						id: 55190,
						name: 'Pikuniku',
						slug: 'pikuniku',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co2gb6.jpg'
					},
					{
						id: 57187,
						name: 'Crackle Cradle',
						slug: 'crackle-cradle',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1n6g.jpg'
					},
					{
						id: 113895,
						name: 'Havocado',
						slug: 'havocado',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1ko2.jpg'
					},
					{
						id: 120184,
						name: 'SolSeraph',
						slug: 'solseraph',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1ma1.jpg'
					},
					{
						id: 29032,
						name: 'Pepper Grinder',
						slug: 'pepper-grinder',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co5rgd.jpg'
					},
					{
						id: 204500,
						name: 'Adam & Eve',
						slug: 'adam-and-eve--1',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co6nrx.jpg'
					},
					{
						id: 143073,
						name: 'Rollie',
						slug: 'rollie',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co2rch.jpg'
					},
					{
						id: 141621,
						name: 'Coria and the Sunken City',
						slug: 'coria-and-the-sunken-city',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co2mjt.jpg'
					},
					{
						id: 20342,
						name: 'Toby: The Secret Mine',
						slug: 'toby-the-secret-mine',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1z4g.jpg'
					},
					{
						id: 24426,
						name: 'Forgotton Anne',
						slug: 'forgotton-anne',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1r68.jpg'
					}
				]
			},
			moby_metadata: {},
			ss_metadata: {
				ss_score: '',
				first_release_date: 1337040000,
				alternative_names: ['Nomolos - Storming the CATsle', 'Nomolos'],
				companies: ['retroUSB', 'Gradual Games'],
				franchises: [],
				game_modes: [],
				genres: []
			},
			launchbox_metadata: {},
			hasheous_metadata: {
				tosec_match: false,
				mame_arcade_match: false,
				mame_mess_match: false,
				nointro_match: false,
				redump_match: false,
				whdload_match: false,
				ra_match: false,
				fbneo_match: true
			},
			path_cover_small: '/assets/romm/resources/roms/11/157/cover/small.png?ts=2025-07-19 02:11:01',
			path_cover_large: '/assets/romm/resources/roms/11/157/cover/big.png?ts=2025-07-19 02:11:01',
			urlCover: 'https://images.igdb.com/igdb/image/upload/t_1080p/co2rbg.jpg',
			has_manual: false,
			path_manual: '',
			url_manual: '',
			is_unidentified: false,
			is_identified: true,
			revision: '',
			regions: [],
			languages: [],
			tags: [],
			crc_hash: '917154ac',
			md5_hash: '8b646231b9524264db8d47a3e62279aa',
			sha1_hash: 'eee4d50f2c85f3d450baf8e0d8a36e06a9a4d9ac',
			multi: false,
			files: [
				{
					id: 165,
					rom_id: 157,
					file_name: 'nomolos.nes',
					file_path: 'roms/nes',
					file_size_bytes: 524304,
					full_path: 'roms/nes/nomolos.nes',
					created_at: '2025-07-19T02:11:02+00:00',
					updated_at: '2025-07-19T02:11:02+00:00',
					last_modified: '2025-07-19T01:53:20+00:00',
					crc_hash: '917154ac',
					md5_hash: '8b646231b9524264db8d47a3e62279aa',
					sha1_hash: 'eee4d50f2c85f3d450baf8e0d8a36e06a9a4d9ac',
					category: null
				}
			],
			full_path: 'roms/nes/nomolos.nes',
			created_at: '2025-07-19T02:10:37+00:00',
			updated_at: '2025-07-19T02:11:01+00:00',
			missing_from_fs: false,
			siblings: [],
			rom_user: {
				id: -1,
				user_id: -1,
				rom_id: -1,
				created_at: '2025-09-11T18:40:57.850309+00:00',
				updated_at: '2025-09-11T18:40:57.850309+00:00',
				last_played: null,
				note_raw_markdown: '',
				note_is_public: false,
				is_main_sibling: false,
				backlogged: false,
				now_playing: false,
				hidden: false,
				rating: 0,
				difficulty: 0,
				completion: 0,
				status: null,
				user__username: ''
			}
		},
		{
			id: 156,
			igdb_id: 48355,
			sgdb_id: null,
			moby_id: null,
			ss_id: 166767,
			ra_id: null,
			launchbox_id: null,
			hasheous_id: null,
			tgdb_id: null,
			platform_id: 11,
			platform_slug: 'nes',
			platform_fs_slug: 'nes',
			platform_name: 'Nintendo Entertainment System',
			platform_custom_name: '',
			platform_display_name: 'Nintendo Entertainment System',
			fs_name: 'nes_virus_cleaner.nes',
			fs_name_no_tags: 'nes_virus_cleaner',
			fs_name_no_ext: 'nes_virus_cleaner',
			fs_extension: 'nes',
			fs_path: 'roms/nes',
			fs_size_bytes: 40976,
			name: 'NES Virus Cleaner',
			slug: 'nes-virus-cleaner',
			summary:
				'NES Virus Cleaner is pretty much a spoof of the NES Cleaning Kit. That thing barely helped clean the NES, just as NES Virus Cleaner doesn’t do much for removing “viruses” from your NES. You guide Clik, the hero, around inside your NES and grab viruses in the various spots they are placed. The ultimate goal is to get to the lockout chip and destroy Virii, the main virus. The obstacles in the game are electric bolts, electric sparks, disappearing blocks, a homing missile system, and of course, time. If you run out of time on a certain level, the game is over. If you get hit by an enemy, you will respawn at the point where you picked up the last virus. It’s a pretty simple concept overall. I tried to cover everything in the tutorial, but I did in fact miss the part about respawning at the last picked up virus. Oh well, things happen!',
			alternative_names: ['Nes Virus Cleaner', 'Nes Virus Cleaner'],
			youtube_video_id: 'HdkjCNqk91A',
			metadatum: {
				rom_id: 156,
				genres: ['Indie'],
				franchises: [],
				collections: [],
				companies: ['Second Dimension', 'Sly Dog Studios'],
				game_modes: ['Single player'],
				age_ratings: [],
				first_release_date: 1304467200000,
				average_rating: null
			},
			igdb_metadata: {
				total_rating: '0.0',
				aggregated_rating: '0.0',
				first_release_date: 1304467200,
				youtube_video_id: 'HdkjCNqk91A',
				genres: ['Indie'],
				franchises: [],
				alternative_names: [],
				collections: [],
				companies: ['Sly Dog Studios', 'Second Dimension'],
				game_modes: ['Single player'],
				age_ratings: [],
				platforms: [
					{
						igdb_id: 18,
						name: 'Nintendo Entertainment System'
					}
				],
				expansions: [],
				dlcs: [],
				remasters: [],
				remakes: [],
				expanded_games: [],
				ports: [],
				similar_games: [
					{
						id: 113895,
						name: 'Havocado',
						slug: 'havocado',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1ko2.jpg'
					},
					{
						id: 111130,
						name: 'Apsulov: End of Gods',
						slug: 'apsulov-end-of-gods',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1h60.jpg'
					},
					{
						id: 96217,
						name: 'Eternity: The Last Unicorn',
						slug: 'eternity-the-last-unicorn',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1k9j.jpg'
					},
					{
						id: 106987,
						name: 'Torchlight III',
						slug: 'torchlight-iii',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co2t2f.jpg'
					},
					{
						id: 37419,
						name: 'Dude Simulator',
						slug: 'dude-simulator',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co5ujo.jpg'
					},
					{
						id: 28309,
						name: 'Tanzia',
						slug: 'tanzia',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/zlb0ljqmgn8tc8vv3mij.jpg'
					},
					{
						id: 25646,
						name: "Don't Knock Twice",
						slug: 'dont-knock-twice',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1reg.jpg'
					},
					{
						id: 105233,
						name: 'Rogue Heist',
						slug: 'rogue-heist',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1m01.jpg'
					},
					{
						id: 32902,
						name: 'GentleMoon 2',
						slug: 'gentlemoon-2',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1rry.jpg'
					},
					{
						id: 80916,
						name: 'Omensight',
						slug: 'omensight',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co8jcc.jpg'
					}
				]
			},
			moby_metadata: {},
			ss_metadata: {
				ss_score: '',
				first_release_date: 1303776000,
				alternative_names: ['Nes Virus Cleaner', 'Nes Virus Cleaner'],
				companies: ['Airwalk', 'Sly Dog'],
				franchises: [],
				game_modes: [],
				genres: []
			},
			launchbox_metadata: {},
			hasheous_metadata: {},
			path_cover_small: '/assets/romm/resources/roms/11/156/cover/small.png?ts=2025-07-19 02:10:34',
			path_cover_large: '/assets/romm/resources/roms/11/156/cover/big.png?ts=2025-07-19 02:10:34',
			urlCover: 'https://images.igdb.com/igdb/image/upload/t_1080p/co2ndh.jpg',
			has_manual: false,
			path_manual: '',
			url_manual: '',
			is_unidentified: false,
			is_identified: true,
			revision: '',
			regions: [],
			languages: [],
			tags: [],
			crc_hash: '5faeb6bd',
			md5_hash: '0c46838be8df1b2209aec2a85063973f',
			sha1_hash: '8fe046a3b729f13be1ee837d4ebfaafcf51d89eb',
			multi: false,
			files: [
				{
					id: 164,
					rom_id: 156,
					file_name: 'nes_virus_cleaner.nes',
					file_path: 'roms/nes',
					file_size_bytes: 40976,
					full_path: 'roms/nes/nes_virus_cleaner.nes',
					created_at: '2025-07-19T02:10:34+00:00',
					updated_at: '2025-07-19T02:10:34+00:00',
					last_modified: '2025-07-19T01:53:20+00:00',
					crc_hash: '5faeb6bd',
					md5_hash: '0c46838be8df1b2209aec2a85063973f',
					sha1_hash: '8fe046a3b729f13be1ee837d4ebfaafcf51d89eb',
					category: null
				}
			],
			full_path: 'roms/nes/nes_virus_cleaner.nes',
			created_at: '2025-07-19T02:10:28+00:00',
			updated_at: '2025-07-19T02:10:34+00:00',
			missing_from_fs: false,
			siblings: [],
			rom_user: {
				id: -1,
				user_id: -1,
				rom_id: -1,
				created_at: '2025-09-11T18:40:57.850655+00:00',
				updated_at: '2025-09-11T18:40:57.850655+00:00',
				last_played: null,
				note_raw_markdown: '',
				note_is_public: false,
				is_main_sibling: false,
				backlogged: false,
				now_playing: false,
				hidden: false,
				rating: 0,
				difficulty: 0,
				completion: 0,
				status: null,
				user__username: ''
			}
		},
		{
			id: 155,
			igdb_id: 2951,
			sgdb_id: 36001,
			moby_id: null,
			ss_id: 1309,
			ra_id: null,
			launchbox_id: null,
			hasheous_id: 33456,
			tgdb_id: null,
			platform_id: 11,
			platform_slug: 'nes',
			platform_fs_slug: 'nes',
			platform_name: 'Nintendo Entertainment System',
			platform_custom_name: '',
			platform_display_name: 'Nintendo Entertainment System',
			fs_name: 'elite.nes',
			fs_name_no_tags: 'elite',
			fs_name_no_ext: 'elite',
			fs_extension: 'nes',
			fs_path: 'roms/nes',
			fs_size_bytes: 131088,
			name: 'Elite',
			slug: 'elite',
			summary:
				"Elite is a space trading video game, written and developed by David Braben and Ian Bell and originally published by Acornsoft for the BBC Micro and Acorn Electron computers in September 1984. Elite's open-ended game model, and revolutionary 3D graphics led to it being ported to virtually every contemporary home computer system, and earned it a place as a classic and a genre maker in gaming history. The game's title derives from one of the player's goals of raising their combat rating to the exalted heights of \"Elite\".\n\nElite was one of the first home computer games to use wire-frame 3D graphics with hidden line removal. It added graphics and twitch gameplay aspects to the genre established by the 1974 game Star Trader. Another novelty was the inclusion of The Dark Wheel, a novella by Robert Holdstock which gave players insight into the moral and legal codes to which they might aspire.",
			alternative_names: ['Elite', 'Elite'],
			youtube_video_id: '47HzgWqv_kk',
			metadatum: {
				rom_id: 155,
				genres: ['Shooter', 'Simulator', 'Strategy'],
				franchises: [],
				collections: ['Elite'],
				companies: [
					'Acornsoft',
					'Acornsoft',
					'David Braben',
					'Digital Integration',
					'Firebird',
					'Frontier Developments',
					'Hybrid Technology',
					'Ian Bell',
					'Imagineer',
					'Merlin Software U.K.',
					'Mr. Micro Ltd.',
					'Realtime Games Software Ltd.',
					'Torus'
				],
				game_modes: ['Single player'],
				age_ratings: ['L'],
				first_release_date: 464486400000,
				average_rating: 52.69
			},
			igdb_metadata: {
				total_rating: '80.38',
				aggregated_rating: '0.0',
				first_release_date: 464486400,
				youtube_video_id: '47HzgWqv_kk',
				genres: ['Shooter', 'Simulator', 'Strategy'],
				franchises: [],
				alternative_names: [],
				collections: ['Elite'],
				companies: [
					'Hybrid Technology',
					'Firebird',
					'Merlin Software U.K.',
					'Imagineer',
					'Mr. Micro Ltd.',
					'Realtime Games Software Ltd.',
					'Torus',
					'Acornsoft',
					'Frontier Developments',
					'David Braben',
					'Digital Integration',
					'Acornsoft',
					'Ian Bell'
				],
				game_modes: ['Single player'],
				age_ratings: [
					{
						rating: 'L',
						category: 'CLASS_IND',
						rating_cover_url: 'https://www.igdb.com/icons/rating_icons/class_ind/class_ind_l.png'
					}
				],
				platforms: [
					{
						igdb_id: 116,
						name: 'Acorn Archimedes'
					},
					{
						igdb_id: 69,
						name: 'BBC Microcomputer System'
					},
					{
						igdb_id: 15,
						name: 'Commodore C64/128/MAX'
					},
					{
						igdb_id: 26,
						name: 'ZX Spectrum'
					},
					{
						igdb_id: 63,
						name: 'Atari ST/STE'
					},
					{
						igdb_id: 134,
						name: 'Acorn Electron'
					},
					{
						igdb_id: 13,
						name: 'DOS'
					},
					{
						igdb_id: 155,
						name: 'Tatung Einstein'
					},
					{
						igdb_id: 16,
						name: 'Amiga'
					},
					{
						igdb_id: 75,
						name: 'Apple II'
					},
					{
						igdb_id: 25,
						name: 'Amstrad CPC'
					},
					{
						igdb_id: 18,
						name: 'Nintendo Entertainment System'
					},
					{
						igdb_id: 27,
						name: 'MSX'
					}
				],
				expansions: [],
				dlcs: [],
				remasters: [],
				remakes: [],
				expanded_games: [
					{
						id: 100209,
						name: 'Elite Plus',
						slug: 'elite-plus',
						type: 'expanded',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co2mwg.jpg'
					}
				],
				ports: [
					{
						id: 350143,
						name: 'Elite',
						slug: 'elite--1',
						type: 'port',
						cover_url: ''
					}
				],
				similar_games: [
					{
						id: 26574,
						name: 'Force of Nature',
						slug: 'force-of-nature',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1re9.jpg'
					},
					{
						id: 19249,
						name: 'Empyrion: Galactic Survival',
						slug: 'empyrion-galactic-survival',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co9rzw.jpg'
					},
					{
						id: 1877,
						name: 'Cyberpunk 2077',
						slug: 'cyberpunk-2077',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co7497.jpg'
					},
					{
						id: 37419,
						name: 'Dude Simulator',
						slug: 'dude-simulator',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co5ujo.jpg'
					},
					{
						id: 17379,
						name: 'Miscreated',
						slug: 'miscreated',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co3wn0.jpg'
					},
					{
						id: 25311,
						name: 'Star Control: Origins',
						slug: 'star-control-origins',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/rmzcpsfvnizymkhvd0qg.jpg'
					},
					{
						id: 44076,
						name: 'Last Day on Earth: Survival',
						slug: 'last-day-on-earth-survival',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1rgn.jpg'
					},
					{
						id: 3239,
						name: 'Space Engineers',
						slug: 'space-engineers',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1n1d.jpg'
					},
					{
						id: 111187,
						name: 'Eve: Echoes',
						slug: 'eve-echoes',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1rl1.jpg'
					},
					{
						id: 9552,
						name: 'Starmade',
						slug: 'starmade',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co2rf9.jpg'
					}
				]
			},
			moby_metadata: {},
			ss_metadata: {
				ss_score: '2.5',
				first_release_date: 662688000,
				alternative_names: ['Elite', 'Elite'],
				companies: ['Imagineer', 'Braben & Bell'],
				franchises: [],
				game_modes: [],
				genres: ['Simulation / SciFi', 'Simulation']
			},
			launchbox_metadata: {},
			hasheous_metadata: {
				tosec_match: true,
				mame_arcade_match: false,
				mame_mess_match: false,
				nointro_match: false,
				redump_match: false,
				whdload_match: false,
				ra_match: false,
				fbneo_match: false
			},
			path_cover_small: '/assets/romm/resources/roms/11/155/cover/small.png?ts=2025-07-19 02:10:21',
			path_cover_large: '/assets/romm/resources/roms/11/155/cover/big.png?ts=2025-07-19 02:10:21',
			urlCover: 'https://cdn2.steamgriddb.com/grid/0fd8c2c9a6e5516286350aa0a6c3e7be.png',
			has_manual: true,
			path_manual: 'roms/11/155/manual/155.pdf',
			url_manual:
				'https://neoclone.screenscraper.fr/api2/mediaManuelJeu.php?devid=zurdi15&devpassword=xTJwoOFjOQG&softname=romm&ssid=arcaneasada&sspassword=Z4aKS34yLgnP8R6utsAUjzMrB&systemeid=3&jeuid=1309&media=manuel(eu)',
			is_unidentified: false,
			is_identified: true,
			revision: '',
			regions: [],
			languages: [],
			tags: [],
			crc_hash: '54386491',
			md5_hash: '17e00ce36f1dac59f630066906ac54f1',
			sha1_hash: '17c4f91469931ea309bfff4faba3f3c34deed3c7',
			multi: false,
			files: [
				{
					id: 163,
					rom_id: 155,
					file_name: 'elite.nes',
					file_path: 'roms/nes',
					file_size_bytes: 131088,
					full_path: 'roms/nes/elite.nes',
					created_at: '2025-07-19T02:10:22+00:00',
					updated_at: '2025-07-19T02:10:22+00:00',
					last_modified: '2025-07-19T01:53:20+00:00',
					crc_hash: '54386491',
					md5_hash: '17e00ce36f1dac59f630066906ac54f1',
					sha1_hash: '17c4f91469931ea309bfff4faba3f3c34deed3c7',
					category: null
				}
			],
			full_path: 'roms/nes/elite.nes',
			created_at: '2025-07-19T02:10:14+00:00',
			updated_at: '2025-07-19T02:10:21+00:00',
			missing_from_fs: false,
			siblings: [],
			rom_user: {
				id: -1,
				user_id: -1,
				rom_id: -1,
				created_at: '2025-09-11T18:40:57.850987+00:00',
				updated_at: '2025-09-11T18:40:57.850987+00:00',
				last_played: null,
				note_raw_markdown: '',
				note_is_public: false,
				is_main_sibling: false,
				backlogged: false,
				now_playing: false,
				hidden: false,
				rating: 0,
				difficulty: 0,
				completion: 0,
				status: null,
				user__username: ''
			}
		},
		{
			id: 154,
			igdb_id: null,
			sgdb_id: null,
			moby_id: null,
			ss_id: null,
			ra_id: 4598,
			launchbox_id: null,
			hasheous_id: null,
			tgdb_id: null,
			platform_id: 11,
			platform_slug: 'nes',
			platform_fs_slug: 'nes',
			platform_name: 'Nintendo Entertainment System',
			platform_custom_name: '',
			platform_display_name: 'Nintendo Entertainment System',
			fs_name: 'dpadhero2.nes',
			fs_name_no_tags: 'dpadhero2',
			fs_name_no_ext: 'dpadhero2',
			fs_extension: 'nes',
			fs_path: 'roms/nes',
			fs_size_bytes: 262160,
			name: 'D-Pad Hero 2',
			slug: null,
			summary: '',
			alternative_names: [],
			youtube_video_id: null,
			metadatum: {
				rom_id: 154,
				genres: ['Rhythm'],
				franchises: [],
				collections: [],
				companies: ['Kent Hansen, Andreas Pedersen', 'Kent Hansen, Andreas Pedersen'],
				game_modes: [],
				age_ratings: [],
				first_release_date: 1273881600000,
				average_rating: null
			},
			igdb_metadata: {},
			moby_metadata: {},
			ss_metadata: {},
			launchbox_metadata: {},
			hasheous_metadata: {},
			path_cover_small: '/assets/romm/resources/roms/11/154/cover/small.png?ts=2025-07-19 16:54:09',
			path_cover_large: '/assets/romm/resources/roms/11/154/cover/big.png?ts=2025-07-19 16:54:09',
			urlCover: 'https://cdn2.steamgriddb.com/grid/31da1ee94ac96fc5ce3b9e742a12b31c.png',
			has_manual: false,
			path_manual: null,
			url_manual: '',
			is_unidentified: false,
			is_identified: true,
			revision: '',
			regions: [],
			languages: [],
			tags: [],
			crc_hash: '7dd2bc1f',
			md5_hash: '6e60832af3c6826c51f1d5517966f74f',
			sha1_hash: '9ccc3b3df7949a86058771ae7d7fdbed0b219565',
			multi: false,
			files: [
				{
					id: 162,
					rom_id: 154,
					file_name: 'dpadhero2.nes',
					file_path: 'roms/nes',
					file_size_bytes: 262160,
					full_path: 'roms/nes/dpadhero2.nes',
					created_at: '2025-07-19T02:10:02+00:00',
					updated_at: '2025-07-19T02:10:02+00:00',
					last_modified: '2025-07-19T01:53:20+00:00',
					crc_hash: '7dd2bc1f',
					md5_hash: '6e60832af3c6826c51f1d5517966f74f',
					sha1_hash: '9ccc3b3df7949a86058771ae7d7fdbed0b219565',
					category: null
				}
			],
			full_path: 'roms/nes/dpadhero2.nes',
			created_at: '2025-07-19T02:09:57+00:00',
			updated_at: '2025-07-19T16:54:09+00:00',
			missing_from_fs: false,
			siblings: [],
			rom_user: {
				id: -1,
				user_id: -1,
				rom_id: -1,
				created_at: '2025-09-11T18:40:57.851399+00:00',
				updated_at: '2025-09-11T18:40:57.851399+00:00',
				last_played: null,
				note_raw_markdown: '',
				note_is_public: false,
				is_main_sibling: false,
				backlogged: false,
				now_playing: false,
				hidden: false,
				rating: 0,
				difficulty: 0,
				completion: 0,
				status: null,
				user__username: ''
			}
		},
		{
			id: 153,
			igdb_id: null,
			sgdb_id: null,
			moby_id: null,
			ss_id: null,
			ra_id: null,
			launchbox_id: null,
			hasheous_id: 257730,
			tgdb_id: null,
			platform_id: 11,
			platform_slug: 'nes',
			platform_fs_slug: 'nes',
			platform_name: 'Nintendo Entertainment System',
			platform_custom_name: '',
			platform_display_name: 'Nintendo Entertainment System',
			fs_name: 'assimilate_full_dl.nes',
			fs_name_no_tags: 'assimilate_full_dl',
			fs_name_no_ext: 'assimilate_full_dl',
			fs_extension: 'nes',
			fs_path: 'roms/nes',
			fs_size_bytes: 262160,
			name: 'Assimilate',
			slug: null,
			summary: null,
			alternative_names: [],
			youtube_video_id: null,
			metadatum: {
				rom_id: 153,
				genres: [],
				franchises: [],
				collections: [],
				companies: [],
				game_modes: [],
				age_ratings: [],
				first_release_date: null,
				average_rating: null
			},
			igdb_metadata: {},
			moby_metadata: {},
			ss_metadata: {},
			launchbox_metadata: {},
			hasheous_metadata: {
				tosec_match: false,
				mame_arcade_match: false,
				mame_mess_match: false,
				nointro_match: false,
				redump_match: false,
				whdload_match: false,
				ra_match: false,
				fbneo_match: true
			},
			path_cover_small: '',
			path_cover_large: '',
			urlCover: '',
			has_manual: false,
			path_manual: '',
			url_manual: '',
			is_unidentified: false,
			is_identified: true,
			revision: '',
			regions: [],
			languages: [],
			tags: [],
			crc_hash: 'a2d504a8',
			md5_hash: '8fde56dfa8bed4c5e3200ed8bccda9a6',
			sha1_hash: 'fdf8d5deb8c1dd6a4c3cb92fa6744e423dad53fc',
			multi: false,
			files: [
				{
					id: 161,
					rom_id: 153,
					file_name: 'assimilate_full_dl.nes',
					file_path: 'roms/nes',
					file_size_bytes: 262160,
					full_path: 'roms/nes/assimilate_full_dl.nes',
					created_at: '2025-07-19T02:09:57+00:00',
					updated_at: '2025-07-19T02:09:57+00:00',
					last_modified: '2025-07-19T01:53:20+00:00',
					crc_hash: 'a2d504a8',
					md5_hash: '8fde56dfa8bed4c5e3200ed8bccda9a6',
					sha1_hash: 'fdf8d5deb8c1dd6a4c3cb92fa6744e423dad53fc',
					category: null
				}
			],
			full_path: 'roms/nes/assimilate_full_dl.nes',
			created_at: '2025-07-19T02:09:36+00:00',
			updated_at: '2025-07-19T02:09:57+00:00',
			missing_from_fs: false,
			siblings: [],
			rom_user: {
				id: -1,
				user_id: -1,
				rom_id: -1,
				created_at: '2025-09-11T18:40:57.854516+00:00',
				updated_at: '2025-09-11T18:40:57.854516+00:00',
				last_played: null,
				note_raw_markdown: '',
				note_is_public: false,
				is_main_sibling: false,
				backlogged: false,
				now_playing: false,
				hidden: false,
				rating: 0,
				difficulty: 0,
				completion: 0,
				status: null,
				user__username: ''
			}
		},
		{
			id: 152,
			igdb_id: 195518,
			sgdb_id: null,
			moby_id: null,
			ss_id: null,
			ra_id: 17751,
			launchbox_id: null,
			hasheous_id: 257728,
			tgdb_id: null,
			platform_id: 11,
			platform_slug: 'nes',
			platform_fs_slug: 'nes',
			platform_name: 'Nintendo Entertainment System',
			platform_custom_name: '',
			platform_display_name: 'Nintendo Entertainment System',
			fs_name: 'The Ninja of the 4 Seasons_V1.1.nes',
			fs_name_no_tags: 'The Ninja of the 4 Seasons_V1.1',
			fs_name_no_ext: 'The Ninja of the 4 Seasons_V1.1',
			fs_extension: 'nes',
			fs_path: 'roms/nes',
			fs_size_bytes: 524304,
			name: 'The Ninja of the 4 Seasons',
			slug: 'the-ninja-of-the-4-seasons',
			summary: 'The Ninja of the 4 Seasons is a homebrew platformer for the NES.',
			alternative_names: [],
			youtube_video_id: null,
			metadatum: {
				rom_id: 152,
				genres: ['Platform'],
				franchises: [],
				collections: [],
				companies: ['KoolDoob'],
				game_modes: ['Single player'],
				age_ratings: [],
				first_release_date: 1613260800000,
				average_rating: null
			},
			igdb_metadata: {
				total_rating: '0.0',
				aggregated_rating: '0.0',
				first_release_date: 1613260800,
				youtube_video_id: null,
				genres: ['Platform'],
				franchises: [],
				alternative_names: [],
				collections: [],
				companies: ['KoolDoob'],
				game_modes: ['Single player'],
				age_ratings: [],
				platforms: [
					{
						igdb_id: 18,
						name: 'Nintendo Entertainment System'
					}
				],
				expansions: [],
				dlcs: [],
				remasters: [],
				remakes: [],
				expanded_games: [],
				ports: [],
				similar_games: [
					{
						id: 195603,
						name: 'Wall Jump Ninja',
						slug: 'wall-jump-ninja',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co4lwb.jpg'
					},
					{
						id: 55190,
						name: 'Pikuniku',
						slug: 'pikuniku',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co2gb6.jpg'
					},
					{
						id: 57187,
						name: 'Crackle Cradle',
						slug: 'crackle-cradle',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1n6g.jpg'
					},
					{
						id: 20342,
						name: 'Toby: The Secret Mine',
						slug: 'toby-the-secret-mine',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1z4g.jpg'
					},
					{
						id: 29032,
						name: 'Pepper Grinder',
						slug: 'pepper-grinder',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co5rgd.jpg'
					},
					{
						id: 24426,
						name: 'Forgotton Anne',
						slug: 'forgotton-anne',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1r68.jpg'
					},
					{
						id: 120184,
						name: 'SolSeraph',
						slug: 'solseraph',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1ma1.jpg'
					},
					{
						id: 113895,
						name: 'Havocado',
						slug: 'havocado',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1ko2.jpg'
					},
					{
						id: 28070,
						name: 'Planet Alpha',
						slug: 'planet-alpha',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1r66.jpg'
					},
					{
						id: 56033,
						name: 'Dream Alone',
						slug: 'dream-alone',
						type: 'similar',
						cover_url: 'https://images.igdb.com/igdb/image/upload/t_1080p/co1red.jpg'
					}
				]
			},
			moby_metadata: {},
			ss_metadata: {},
			launchbox_metadata: {},
			hasheous_metadata: {
				tosec_match: false,
				mame_arcade_match: false,
				mame_mess_match: false,
				nointro_match: false,
				redump_match: false,
				whdload_match: false,
				ra_match: false,
				fbneo_match: true
			},
			path_cover_small: '/assets/romm/resources/roms/11/152/cover/small.png?ts=2025-07-19 02:09:31',
			path_cover_large: '/assets/romm/resources/roms/11/152/cover/big.png?ts=2025-07-19 02:09:31',
			urlCover: 'https://images.igdb.com/igdb/image/upload/t_1080p/co9uyt.jpg',
			has_manual: false,
			path_manual: '',
			url_manual: '',
			is_unidentified: false,
			is_identified: true,
			revision: '',
			regions: [],
			languages: [],
			tags: [],
			crc_hash: '3943cf5f',
			md5_hash: 'e70cc4059a441650aa78f7403e2d7ca5',
			sha1_hash: '6003f833d79e483502e2428e290d525dede21036',
			multi: false,
			files: [
				{
					id: 160,
					rom_id: 152,
					file_name: 'The Ninja of the 4 Seasons_V1.1.nes',
					file_path: 'roms/nes',
					file_size_bytes: 524304,
					full_path: 'roms/nes/The Ninja of the 4 Seasons_V1.1.nes',
					created_at: '2025-07-19T02:09:31+00:00',
					updated_at: '2025-07-19T02:09:31+00:00',
					last_modified: '2025-07-19T01:53:20+00:00',
					crc_hash: '3943cf5f',
					md5_hash: 'e70cc4059a441650aa78f7403e2d7ca5',
					sha1_hash: '6003f833d79e483502e2428e290d525dede21036',
					category: null
				}
			],
			full_path: 'roms/nes/The Ninja of the 4 Seasons_V1.1.nes',
			created_at: '2025-07-19T02:09:08+00:00',
			updated_at: '2025-07-19T02:09:31+00:00',
			missing_from_fs: false,
			siblings: [],
			rom_user: {
				id: -1,
				user_id: -1,
				rom_id: -1,
				created_at: '2025-09-11T18:40:57.854780+00:00',
				updated_at: '2025-09-11T18:40:57.854780+00:00',
				last_played: null,
				note_raw_markdown: '',
				note_is_public: false,
				is_main_sibling: false,
				backlogged: false,
				now_playing: false,
				hidden: false,
				rating: 0,
				difficulty: 0,
				completion: 0,
				status: null,
				user__username: ''
			}
		}
	]
}

export default function Home() {
	const {isAuthenticated} = useRommSession()
	const {data: roms, error} = useRoms()
	const {data: currentUser, error: userError} = useLoggedInUser()
	const navigate = useNavigate()

	useEffect(() => {
		const checkAuthentication = async () => {
			const isLoggedIn = await isAuthenticated()
			if (!isLoggedIn) {
				navigate('/login')
			}
		}

		checkAuthentication()
	}, [navigate, isAuthenticated])

	console.log({roms, currentUser, error, userError})

	return (
		<div>
			<div
				className='
					after:absolute
					after:w-screen
					after:h-screen
					after:bg-black
					after:opacity-85
					after:top-0
					after:left-0
					after:z-[-1]
				'
			>
				<div
					className='absolute w-screen h-screen top-0 left-0 bg-no-repeat bg-cover z-[-1]'
					style={{
						backgroundImage:
							'url("https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1030300/8e09f2b2eedd3fa9b4479dd5c26d8bdf60562478/ss_8e09f2b2eedd3fa9b4479dd5c26d8bdf60562478.600x338.jpg")'
					}}
				/>
				<div className='z-10 py-12 px-8 gap-9 flex flex-col'>
					<Heading variant={'h1'}>Welcome mockeduser</Heading>
					<div className='grid gap-8'>
						<ContinuePlaying roms={MOCK_ROMS.items as unknown as Rom[]} />
					</div>
				</div>
			</div>
		</div>
	)
}
