import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Media } from './collections/media/config'
import { Users } from './collections/users/config'
import { smtpAdapter } from './config/adapters/smtp.adapter'
import { storageAdapter } from './config/adapters/storage.adapter'
import { env } from './config/env'
import { databaseAdapter } from './database/database.adapter'

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
  cors: [env.NEXT_PUBLIC_APP_URL, env.NEXT_PUBLIC_API_URL].filter((url): url is string => !!url),
  csrf: [env.NEXT_PUBLIC_APP_URL, env.NEXT_PUBLIC_API_URL].filter((url): url is string => !!url),

  // Content Schema
  collections: [Users, Media],
  globals: [],

  // Editor & Image Processing
  editor: lexicalEditor(),
  sharp,

  // Adapters
  db: databaseAdapter,
  email: smtpAdapter,

  // Plugins
  plugins: [storageAdapter],

  // GraphQL
  graphQL: {
    disable: true,
  },

  // Localization
  localization: {
    locales: ['en', 'vi'],
    defaultLocale: 'en',
    fallback: true,
  },

  // Development & Meta
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
