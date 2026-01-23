import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { smtpAdapter } from './config/adapters/smtp.adapter'
import { storageAdapter } from './config/adapters/storage.adapter'
import { env } from './config/env'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Administrative
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  // Security
  secret: env.PAYLOAD_SECRET,
  serverURL: env.NEXT_PUBLIC_APP_URL,
  cors: [env.NEXT_PUBLIC_APP_URL].filter(Boolean),
  csrf: [env.NEXT_PUBLIC_APP_URL].filter(Boolean),

  // Content Schema
  collections: [Users, Media],
  globals: [],

  // Editor & Image Processing
  editor: lexicalEditor(),
  sharp,

  // Adapters
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  email: smtpAdapter,

  // Plugins
  plugins: [storageAdapter],

  // Development & Meta
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
