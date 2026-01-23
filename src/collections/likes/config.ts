import { isAdminOrOwner } from '@/access'
import type { CollectionConfig } from 'payload'

export const Likes: CollectionConfig = {
  slug: 'likes',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['post', 'user', 'createdAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    delete: isAdminOrOwner,
    update: () => false, // Likes logic is binary (toggle), usually just create/delete. No update.
  },
  fields: [
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      defaultValue: ({ user }) => user?.id,
      admin: {
        readOnly: true,
      },
    },
  ],
  indexes: [
    {
      fields: ['post', 'user'],
      unique: true,
    },
  ],
}
