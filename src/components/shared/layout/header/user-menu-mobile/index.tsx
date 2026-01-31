import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Media } from '@/types'
import { useAuth } from '@/hooks/use-auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface UserMenuMobileProps {
  onClose: () => void
}

const UserMenuMobile = ({ onClose }: UserMenuMobileProps) => {
  const router = useRouter()
  const { user, logout, isLoading } = useAuth()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className='flex items-center gap-3 border-b border-[#262626] py-4'>
        <div className='h-10 w-10 animate-pulse rounded-full bg-[#333333]' />
        <div className='h-5 w-24 animate-pulse rounded bg-[#333333]' />
      </div>
    )
  }

  if (!user) {
    return (
      <div className='flex flex-col gap-2 border-b border-dark-15 py-[1rem]'>
        <Link
          href='/login'
          onClick={onClose}
          className='flex w-full items-center justify-center rounded-[0.5rem] bg-yellow-55 px-[2.125rem] py-[0.875rem] text-[0.875rem] font-medium leading-[1.71] text-dark-08'
        >
          Login
        </Link>
        <Link
          href='/register'
          onClick={onClose}
          className='flex w-full items-center justify-center rounded-[0.5rem] border border-dark-15 px-[2.125rem] py-[0.875rem] text-[0.875rem] font-medium leading-[1.71] text-white'
        >
          Create Account
        </Link>
      </div>
    )
  }

  const avatar = (
    user?.avatar && typeof user.avatar === 'object' ? user.avatar : null
  ) as Media | null
  const avatarUrl = avatar?.sizes?.thumbnail?.url || avatar?.url

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className='border-b border-dark-15 py-[1rem]'>
      {/* User info */}
      <div className='flex items-center gap-[0.625rem] rounded-[.375rem] py-[.625rem] text-[0.875rem] font-medium leading-[1.5]'>
        {/* Avatar */}
        <Avatar className='size-[2.5625rem]'>
          <AvatarImage src={avatarUrl || undefined} />
          <AvatarFallback className='text-[0.875rem] font-medium leading-[1.5] text-dark-08'>
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>

        {/* Name */}
        <div className='flex-1 overflow-hidden'>
          <p className='truncate text-[0.875rem] font-medium leading-[1.5] text-white'>
            {user.name}
          </p>
          <p className='truncate text-[0.875rem] font-medium leading-[1.5] text-dark-40'>
            {user.email}
          </p>
        </div>
      </div>

      {/* Menu items */}
      <div className='space-y-[1rem] py-[.625rem]'>
        <Link
          href='/profile'
          onClick={onClose}
          className='flex w-full items-center truncate text-[0.875rem] font-medium leading-[1.5] text-white'
        >
          Profile
        </Link>

        <button
          onClick={handleLogout}
          className='flex w-full items-center truncate text-[0.875rem] font-medium leading-[1.5] text-red-500'
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default UserMenuMobile
