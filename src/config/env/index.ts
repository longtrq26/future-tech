import { createEnv } from '@t3-oss/env-nextjs'
import z from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    DATABASE_URL: z.url(),

    PAYLOAD_SECRET: z.string().min(32),
    PAYLOAD_JWT_EXPIRATION: z.string(),

    S3_ENDPOINT: z.url(),
    S3_ACCESS_KEY_ID: z.string().min(1),
    S3_SECRET_ACCESS_KEY: z.string().min(1),
    S3_BUCKET_NAME: z.string().min(1),
    S3_REGION: z.string().default('auto'),

    SMTP_HOST: z.string().min(1),
    SMTP_PORT: z.coerce.number(),
    SMTP_USER: z.string().min(1),
    SMTP_PASSWORD: z.string().min(1),
    SMTP_SECURE: z.enum(['true', 'false']).transform(v => v === 'true'),

    SMTP_FROM_NAME: z.string().min(1),
    SMTP_FROM_ADDRESS: z.email(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.url(),
    NEXT_PUBLIC_API_URL: z.url(),
    NEXT_PUBLIC_S3_PUBLIC_URL: z.url(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,

    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    PAYLOAD_JWT_EXPIRATION: process.env.PAYLOAD_JWT_EXPIRATION,

    S3_ENDPOINT: process.env.S3_ENDPOINT,
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    S3_REGION: process.env.S3_REGION,

    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_SECURE: process.env.SMTP_SECURE,

    SMTP_FROM_NAME: process.env.SMTP_FROM_NAME,
    SMTP_FROM_ADDRESS: process.env.SMTP_FROM_ADDRESS,

    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_S3_PUBLIC_URL: process.env.NEXT_PUBLIC_S3_PUBLIC_URL,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
})
