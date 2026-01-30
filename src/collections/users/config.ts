import { isAdmin, isAdminFieldLevel, isSelfOrAdmin, isSelfOrAdminFieldLevel } from '@/access'
import type { CollectionConfig } from 'payload'
import { env } from '@/config/env'
import { ROLE_OPTIONS, ROLES } from '@/access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: Number(env.PAYLOAD_JWT_EXPIRATION), // 3 hours
    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 minutes
    cookies: {
      secure: env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
    verify: {
      generateEmailHTML: args => {
        const { token, user } = args || {}
        const url = `${env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`
        return `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>Verify your email</h1>
            <p>Hi ${user?.name || 'User'},</p>
            <p>Thanks for signing up for Future Tech. Please verify your email address by clicking the link below:</p>
            <p>
              <a href="${url}" style="display: inline-block; background-color: #FFD11A; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Email</a>
            </p>
            <p>Or verify using this link: <a href="${url}">${url}</a></p>
            <p>If you didn't create an account, you can safely ignore this email.</p>
          </div>
        `
      },
    },
    forgotPassword: {
      generateEmailHTML: args => {
        const { token, user } = args || {}
        const url = `${env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`
        return `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>Reset your password</h1>
            <p>Hi ${user?.name || 'User'},</p>
            <p>We received a request to reset your password. Click the link below to choose a new one:</p>
            <p>
              <a href="${url}" style="display: inline-block; background-color: #FFD11A; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
            </p>
            <p>Or reset using this link: <a href="${url}">${url}</a></p>
            <p>If you didn't request a password reset, you can safely ignore this email.</p>
          </div>
        `
      },
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
    hidden: ({ user }) => user.role !== ROLES.ADMIN,
  },
  access: {
    read: () => true,
    create: () => true,
    update: isSelfOrAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      access: {
        read: isSelfOrAdminFieldLevel,
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'role',
      type: 'select',
      saveToJWT: true,
      required: true,
      defaultValue: ROLES.USER,
      options: ROLE_OPTIONS,
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
