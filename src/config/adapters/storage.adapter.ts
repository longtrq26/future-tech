import { s3Storage } from '@payloadcms/storage-s3'
import { env } from '../env'

export const storageAdapter = s3Storage({
  collections: {
    media: {
      // Dùng Cloudflare R2, nên tắt prefix này để URL đẹp hơn
      prefix: '',
    },
  },
  bucket: env.S3_BUCKET_NAME,
  // Dùng R2 thì thường disable ACL vì R2 không hỗ trợ ACL 'public-read' theo cách của AWS
  acl: 'private',
  config: {
    endpoint: env.S3_ENDPOINT,
    credentials: {
      accessKeyId: env.S3_ACCESS_KEY_ID,
      secretAccessKey: env.S3_SECRET_ACCESS_KEY,
    },
    region: env.S3_REGION,
    // Bật lên nếu dùng MinIO hoặc endpoint không hỗ trợ subdomain virtual host
    forcePathStyle: true,
  },
})
