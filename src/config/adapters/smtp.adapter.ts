import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { env } from '../env'

export const smtpAdapter = nodemailerAdapter({
  defaultFromAddress: env.SMTP_FROM_ADDRESS,
  defaultFromName: env.SMTP_FROM_NAME,
  transport: {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD,
    },
  },
})
