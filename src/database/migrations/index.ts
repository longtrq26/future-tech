import * as migration_20260123_203533_create_users_and_media_collections from './20260123_203533_create_users_and_media_collections'
import * as migration_20260123_205141_create_core_content_collections from './20260123_205141_create_core_content_collections'

export const migrations = [
  {
    up: migration_20260123_203533_create_users_and_media_collections.up,
    down: migration_20260123_203533_create_users_and_media_collections.down,
    name: '20260123_203533_create_users_and_media_collections',
  },
  {
    up: migration_20260123_205141_create_core_content_collections.up,
    down: migration_20260123_205141_create_core_content_collections.down,
    name: '20260123_205141_create_core_content_collections',
  },
]
