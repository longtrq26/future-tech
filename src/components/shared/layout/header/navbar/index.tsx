'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HEADER_LINKS } from '@/constants/navigation'
import { cn } from '@/lib/utils'
import NavbarMobile from '../navbar-mobile'
import UserMenu from '../user-menu'

const Navbar = () => {
  const pathname = usePathname()

  return (
    <div className='w-full border-b border-dark-15 bg-dark-10'>
      <div className='container flex w-full items-center justify-between py-[1.25rem]'>
        <Link
          href={'/'}
          className='relative h-[2.188rem] w-[7.827rem] lg:h-[2.5rem] lg:w-[8.946rem]'
        >
          <Image
            src={'/logo-mb.svg'}
            alt='Future Tech'
            fill
            priority
            className='object-contain lg:hidden'
          />
          <Image
            src={'/logo.svg'}
            alt='Future Tech'
            fill
            priority
            className='hidden object-contain lg:block'
          />
        </Link>

        {/* mobile */}
        <NavbarMobile />

        {/* desktop */}
        <nav className='hidden w-full items-center justify-center gap-[1.5rem] lg:flex'>
          {HEADER_LINKS.map(item => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-[.375rem] border border-transparent bg-transparent px-[1.125rem] py-[.625rem] text-[.875rem] font-medium leading-[1.5]',

                  isActive ? 'border-dark-20 bg-dark-08' : 'text-grey-50',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* CTA */}
        <UserMenu />
      </div>
    </div>
  )
}

export default Navbar
