import { Media as MediaPayload, User as UserPayload } from '@/payload-types'

export type User = Pick<
  UserPayload,
  'id' | 'name' | 'email' | 'role' | 'bio' | 'avatar' | 'createdAt' | '_verified'
>

export type Media = Pick<
  MediaPayload,
  'id' | 'url' | 'alt' | 'width' | 'height' | 'sizes' | 'blurHashUrl'
>
