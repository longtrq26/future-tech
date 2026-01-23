import path from 'path'
import { fileURLToPath } from 'url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { env } from '@/config/env'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const databaseAdapter = postgresAdapter({
  pool: {
    connectionString: env.DATABASE_URL,
    ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  },
  migrationDir: path.resolve(dirname, 'migrations'),
  prodMigrations: migrations,
  push: false,
})
