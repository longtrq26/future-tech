import { isAdmin, isAdminFieldLevel, isSelfOrAdmin, isSelfOrAdminFieldLevel } from '@/access'
import type { CollectionConfig } from 'payload'
import { env } from '@/config/env'
import { ROLE_OPTIONS, ROLES } from '@/access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: Number(env.PAYLOAD_JWT_EXPIRATION), // 3 hours
    verify: true,
    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 minutes
    cookies: {
      secure: env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
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
