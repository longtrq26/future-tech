import { isAdminOrOwner, isAdminOrWriter } from '@/access'
import { generateBlurHashUrl, isEligibleForBlurHashUrl } from '@/utils/generate-blur-hash-url'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'media',
    formatOptions: {
      format: 'webp',
      options: { quality: 80 },
    },
    adminThumbnail: 'adminThumbnail',
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif',
      'application/pdf',
      'video/mp4',
      'video/webm',
      'video/ogg',
      'video/quicktime',
    ],
    imageSizes: [
      {
        name: 'adminThumbnail',
        width: 150,
        height: 150,
      },
      {
        name: 'thumbnail',
        width: 400,
        height: 400,
        position: 'center',
      },
      {
        name: 'card',
        width: 768,
        height: undefined, // Giữ nguyên tỷ lệ, chỉ resize width
        position: 'center',
      },
      {
        name: 'featured',
        width: 1200,
        height: 675, // Tỷ lệ 16:9
        position: 'center',
      },
    ],
  },
  access: {
    read: () => true,
    create: isAdminOrWriter,
    update: isAdminOrOwner,
    delete: isAdminOrOwner,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      label: 'BlurHashUrl (only for images)',
      name: 'blurHashUrl',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        // Luôn chạy nếu có file mới được upload (kể cả lúc update/replace ảnh)
        const file = req.file

        // Nếu không có file (chỉ sửa alt text) hoặc file không phải ảnh (PDF) -> Bỏ qua
        if (!file || !isEligibleForBlurHashUrl(file.mimetype)) {
          data.blurHashUrl = null
          return data
        }

        try {
          const base64 = await generateBlurHashUrl(file.data)
          if (base64) {
            data.blurHashUrl = base64
            // Log dạng debug để đỡ rác console production
            req.payload.logger.info(`Generated blurhash for image: ${file.name}`)
          }
        } catch (error) {
          req.payload.logger.error({
            msg: 'Failed to generate blurhash',
            error,
            file: file.name,
          })
        }

        return data
      },
    ],
  },
}
