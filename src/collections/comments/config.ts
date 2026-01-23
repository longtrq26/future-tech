import { isAdminOrOwner } from '@/access'
import type { CollectionConfig } from 'payload'
import { ROLES } from '@/access/roles'

export const Comments: CollectionConfig = {
  slug: 'comments',
  admin: {
    useAsTitle: 'content',
    defaultColumns: ['content', 'author', 'post', 'createdAt'],
    hidden: ({ user }) => user.role !== ROLES.ADMIN,
  },
  access: {
    read: () => true, // Publicly readable
    create: ({ req: { user } }) => Boolean(user), // Any logged in user
    update: isAdminOrOwner,
    delete: isAdminOrOwner,
  },
  fields: [
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      required: true,
      hasMany: false,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      defaultValue: ({ user }) => user?.id,
      admin: {
        readOnly: true,
      },
    },
  ],
}
