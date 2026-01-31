import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Media } from '@/types'
import { useAuth } from '@/hooks/use-auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const UserMenu = () => {
  const router = useRouter()
  const { user, logout, isLoading } = useAuth()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className='hidden h-[2.5625rem] w-[6.25rem] animate-pulse rounded-[0.375rem] bg-dark-15 lg:flex' />
    )
  }

  if (!user) {
    return (
      <Link
        href='/login'
        className='hidden items-center justify-center rounded-[.375rem] bg-yellow-55 px-[.875rem] py-[.625rem] text-[0.875rem] font-medium leading-[1.5] text-dark-08 lg:flex'
      >
        Login
      </Link>
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
    <div className='relative hidden lg:block'>
      {/* Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='flex items-center justify-center gap-[0.625rem] rounded-[.375rem] border border-dark-15 bg-dark-10 px-[.875rem] py-[.625rem] text-[0.875rem] font-medium leading-[1.5]'>
            {/* Avatar */}
            <Avatar className='size-[1.25rem]'>
              <AvatarImage src={avatarUrl || undefined} />
              <AvatarFallback className='text-[0.75rem] font-medium leading-[1.5] text-dark-08'>
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>

            {/* Name */}
            <span className='max-w-[4.6875rem] truncate text-[0.875rem] font-medium leading-[1.5]'>
              {user.name.split(' ').slice(0, 2).join(' ')}
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='mt-[0.5rem] max-w-[15.625rem] border-dark-15 bg-dark-10'>
          {/* User info */}
          <div className='border-b border-dark-15 px-[.875rem] py-[.625rem]'>
            <p className='truncate text-[0.875rem] font-medium leading-[1.5] text-white'>
              {user.name}
            </p>
            <p className='mt-[0.5rem] truncate text-[0.75rem] font-medium leading-[1.5] tracking-[-0.03em] text-dark-40'>
              {user.email}
            </p>
          </div>

          {/* Menu items */}
          <div className='space-y-[0.5rem] px-[.875rem] py-[.625rem]'>
            <Link
              href='/profile'
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UserMenu
