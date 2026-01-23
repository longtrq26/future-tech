export const ROLES = {
  ADMIN: 'admin',
  WRITER: 'writer',
  USER: 'user',
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]

export const ROLE_OPTIONS = [
  { label: 'Admin', value: ROLES.ADMIN },
  { label: 'Writer', value: ROLES.WRITER },
  { label: 'User', value: ROLES.USER },
]
