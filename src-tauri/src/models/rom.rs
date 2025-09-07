struct RomMetadatum {
    rom_id: i64,
    genres: Vec<String>
        franchises: Vec<String>,
        collections: Vec<String>,
        companies: Vec<String>,
        game_modes: Vec<String>,
        age_ratings: Vec<String>,
    first_release_date: i64,
    average_rating: i8,
}

pub struct Rom {
    id: i32,
    igdb_id: i64,
    sgdb_id: i64,
    moby_id: i64,
    ss_id: i64,
    ra_id: i64,
    launchbox_id: i64,
    hasheous_id: i64,
    tgdb_id: i64,
    platform_id: i16,
    platform_slug: String,
    platform_fs_slug: String,
    platform_name: String,
    platform_custom_name: String,
    platform_display_name: String,
    fs_name: String,
    fs_name_no_tags: String,
    fs_name_no_ext: String,
    fs_extension: String,
    fs_path: String,
    fs_size_bytes: i64,
    name: String,
    slug: String,
    summary: String,
    alternative_names: Vec<String>,
    youtube_video_id: String,
    metadatum: RomMetadatum,

}

  
  "igdb_metadata": {
    "total_rating": "string",
    "aggregated_rating": "string",
    "first_release_date": 0,
    "youtube_video_id": "string",
    "genres": [
      "string"
    ],
    "franchises": [
      "string"
    ],
    "alternative_names": [
      "string"
    ],
    "collections": [
      "string"
    ],
    "companies": [
      "string"
    ],
    "game_modes": [
      "string"
    ],
    "age_ratings": [
      {
        "rating": "string",
        "category": "string",
        "rating_cover_url": "string"
      }
    ],
    "platforms": [
      {
        "igdb_id": 0,
        "name": "string"
      }
    ],
    "expansions": [
      {
        "id": 0,
        "name": "string",
        "slug": "string",
        "type": "string",
        "cover_url": "string"
      }
    ],
    "dlcs": [
      {
        "id": 0,
        "name": "string",
        "slug": "string",
        "type": "string",
        "cover_url": "string"
      }
    ],
    "remasters": [
      {
        "id": 0,
        "name": "string",
        "slug": "string",
        "type": "string",
        "cover_url": "string"
      }
    ],
    "remakes": [
      {
        "id": 0,
        "name": "string",
        "slug": "string",
        "type": "string",
        "cover_url": "string"
      }
    ],
    "expanded_games": [
      {
        "id": 0,
        "name": "string",
        "slug": "string",
        "type": "string",
        "cover_url": "string"
      }
    ],
    "ports": [
      {
        "id": 0,
        "name": "string",
        "slug": "string",
        "type": "string",
        "cover_url": "string"
      }
    ],
    "similar_games": [
      {
        "id": 0,
        "name": "string",
        "slug": "string",
        "type": "string",
        "cover_url": "string"
      }
    ]
  },
  "moby_metadata": {
    "moby_score": "string",
    "genres": [
      "string"
    ],
    "alternate_titles": [
      "string"
    ],
    "platforms": [
      {
        "moby_id": 0,
        "name": "string"
      }
    ]
  },
  "ss_metadata": {
    "ss_score": "string",
    "first_release_date": 0,
    "alternative_names": [
      "string"
    ],
    "companies": [
      "string"
    ],
    "franchises": [
      "string"
    ],
    "game_modes": [
      "string"
    ],
    "genres": [
      "string"
    ]
  },
  "launchbox_metadata": {
    "first_release_date": 0,
    "max_players": 0,
    "release_type": "string",
    "cooperative": true,
    "youtube_video_id": "string",
    "community_rating": 0,
    "community_rating_count": 0,
    "wikipedia_url": "string",
    "esrb": "string",
    "genres": [
      "string"
    ],
    "companies": [
      "string"
    ],
    "images": [
      {
        "url": "string",
        "type": "string",
        "region": "string"
      }
    ]
  },
  "hasheous_metadata": {
    "tosec_match": true,
    "mame_arcade_match": true,
    "mame_mess_match": true,
    "nointro_match": true,
    "redump_match": true,
    "whdload_match": true,
    "ra_match": true,
    "fbneo_match": true
  },
  "path_cover_small": "string",
  "path_cover_large": "string",
  "url_cover": "string",
  "has_manual": true,
  "path_manual": "string",
  "url_manual": "string",
  "is_unidentified": true,
  "is_identified": true,
  "revision": "string",
  "regions": [
    "string"
  ],
  "languages": [
    "string"
  ],
  "tags": [
    "string"
  ],
  "crc_hash": "string",
  "md5_hash": "string",
  "sha1_hash": "string",
  "multi": true,
  "files": [
    {
      "id": 0,
      "rom_id": 0,
      "file_name": "string",
      "file_path": "string",
      "file_size_bytes": 0,
      "full_path": "string",
      "created_at": "2025-09-07T11:54:21.364Z",
      "updated_at": "2025-09-07T11:54:21.364Z",
      "last_modified": "2025-09-07T11:54:21.364Z",
      "crc_hash": "string",
      "md5_hash": "string",
      "sha1_hash": "string",
      "category": "dlc"
    }
  ],
  "full_path": "string",
  "created_at": "2025-09-07T11:54:21.364Z",
  "updated_at": "2025-09-07T11:54:21.364Z",
  "missing_from_fs": true,
  "merged_ra_metadata": {
    "first_release_date": 0,
    "genres": [
      "string"
    ],
    "companies": [
      "string"
    ],
    "achievements": [
      {
        "ra_id": 0,
        "title": "string",
        "description": "string",
        "points": 0,
        "num_awarded": 0,
        "num_awarded_hardcore": 0,
        "badge_id": "string",
        "badge_url_lock": "string",
        "badge_path_lock": "string",
        "badge_url": "string",
        "badge_path": "string",
        "display_order": 0,
        "type": "string"
      }
    ]
  },
  "merged_screenshots": [
    "string"
  ],
  "siblings": [
    {
      "id": 0,
      "name": "string",
      "fs_name_no_tags": "string",
      "fs_name_no_ext": "string",
      "sort_comparator": "string"
    }
  ],
  "rom_user": {
    "id": 0,
    "user_id": 0,
    "rom_id": 0,
    "created_at": "2025-09-07T11:54:21.365Z",
    "updated_at": "2025-09-07T11:54:21.365Z",
    "last_played": "2025-09-07T11:54:21.365Z",
    "note_raw_markdown": "string",
    "note_is_public": true,
    "is_main_sibling": true,
    "backlogged": true,
    "now_playing": true,
    "hidden": true,
    "rating": 0,
    "difficulty": 0,
    "completion": 0,
    "status": "incomplete",
    "user__username": "string"
  },
  "user_saves": [
    {
      "id": 0,
      "rom_id": 0,
      "user_id": 0,
      "file_name": "string",
      "file_name_no_tags": "string",
      "file_name_no_ext": "string",
      "file_extension": "string",
      "file_path": "string",
      "file_size_bytes": 0,
      "full_path": "string",
      "download_path": "string",
      "missing_from_fs": true,
      "created_at": "2025-09-07T11:54:21.365Z",
      "updated_at": "2025-09-07T11:54:21.365Z",
      "emulator": "string",
      "screenshot": {
        "id": 0,
        "rom_id": 0,
        "user_id": 0,
        "file_name": "string",
        "file_name_no_tags": "string",
        "file_name_no_ext": "string",
        "file_extension": "string",
        "file_path": "string",
        "file_size_bytes": 0,
        "full_path": "string",
        "download_path": "string",
        "missing_from_fs": true,
        "created_at": "2025-09-07T11:54:21.365Z",
        "updated_at": "2025-09-07T11:54:21.365Z"
      }
    }
  ],
  "user_states": [
    {
      "id": 0,
      "rom_id": 0,
      "user_id": 0,
      "file_name": "string",
      "file_name_no_tags": "string",
      "file_name_no_ext": "string",
      "file_extension": "string",
      "file_path": "string",
      "file_size_bytes": 0,
      "full_path": "string",
      "download_path": "string",
      "missing_from_fs": true,
      "created_at": "2025-09-07T11:54:21.365Z",
      "updated_at": "2025-09-07T11:54:21.365Z",
      "emulator": "string",
      "screenshot": {
        "id": 0,
        "rom_id": 0,
        "user_id": 0,
        "file_name": "string",
        "file_name_no_tags": "string",
        "file_name_no_ext": "string",
        "file_extension": "string",
        "file_path": "string",
        "file_size_bytes": 0,
        "full_path": "string",
        "download_path": "string",
        "missing_from_fs": true,
        "created_at": "2025-09-07T11:54:21.365Z",
        "updated_at": "2025-09-07T11:54:21.365Z"
      }
    }
  ],
  "user_screenshots": [
    {
      "id": 0,
      "rom_id": 0,
      "user_id": 0,
      "file_name": "string",
      "file_name_no_tags": "string",
      "file_name_no_ext": "string",
      "file_extension": "string",
      "file_path": "string",
      "file_size_bytes": 0,
      "full_path": "string",
      "download_path": "string",
      "missing_from_fs": true,
      "created_at": "2025-09-07T11:54:21.365Z",
      "updated_at": "2025-09-07T11:54:21.365Z"
    }
  ],
  "user_notes": [
    {
      "user_id": 0,
      "username": "string",
      "note_raw_markdown": "string"
    }
  ],
  "user_collections": [
    {
      "name": "string",
      "description": "string",
      "rom_ids": [
        0
      ],
      "rom_count": 0,
      "path_cover_small": "string",
      "path_cover_large": "string",
      "path_covers_small": [
        "string"
      ],
      "path_covers_large": [
        "string"
      ],
      "is_public": false,
      "is_favorite": false,
      "is_virtual": false,
      "is_smart": false,
      "created_at": "2025-09-07T11:54:21.365Z",
      "updated_at": "2025-09-07T11:54:21.365Z",
      "id": 0,
      "url_cover": "string",
      "user_id": 0,
      "user__username": "string"
    }
  ]
}
