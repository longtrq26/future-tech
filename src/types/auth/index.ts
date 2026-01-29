import { User } from '@/payload-types'

export type AuthUser = Pick<
  User,
  'id' | 'name' | 'email' | 'role' | 'bio' | 'avatar' | 'createdAt' | '_verified'
>
