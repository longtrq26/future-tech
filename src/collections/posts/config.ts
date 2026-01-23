import { isAdminOrOwner, isAdminOrWriter, readAccess } from '@/access'
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'category', 'status', 'publishedDate'],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: readAccess,
    create: isAdminOrWriter,
    update: isAdminOrOwner,
    delete: isAdminOrOwner,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      defaultValue: 'blog',
      options: [
        {
          label: 'Blog Post',
          value: 'blog',
        },
        {
          label: 'Podcast',
          value: 'podcast',
        },
        {
          label: 'Resource',
          value: 'resource',
        },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'content',
              type: 'richText',
            },
            {
              name: 'podcastLink',
              type: 'text',
              label: 'Podcast External Link',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'podcast',
              },
            },
            {
              name: 'resourceFile',
              type: 'upload',
              relationTo: 'media',
              label: 'Downloadable Resource (PDF)',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'resource',
              },
            },
          ],
        },
        {
          label: 'Meta',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              label: 'Meta Description',
            },
            {
              name: 'keywords',
              type: 'text',
              label: 'Meta Keywords',
            },
          ],
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      filterOptions: ({ id }) => {
        return {
          id: {
            not_equals: id,
          },
        }
      },
    },
  ],
}
