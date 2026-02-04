import React from 'react'
import Link from 'next/link'
import { SOCIAL_LINKS } from '@/constants/navigation'

const FooterLegal = () => {
  return (
    <div className='container flex w-full flex-col gap-[1.25rem] border-t border-dark-15 py-[1.5rem]'>
      {/* Social links mobile */}
      <div className='flex w-full items-center justify-center gap-[0.875rem] lg:hidden'>
        {SOCIAL_LINKS.map(item => (
          <Link
            key={item.id}
            href={item.href}
            className='flex size-[1.25rem] shrink-0 items-center justify-center'
          >
            <item.Icon className='size-full text-white' />
          </Link>
        ))}
      </div>

      <div className='flex w-full flex-col items-center gap-[1.25rem] lg:flex-row lg:justify-between'>
        {/* Legal links */}
        <div className='flex shrink-0 items-center gap-[0.5rem]'>
          <Link
            href={'#'}
            className='text-[0.875rem] leading-[1.3] tracking-[-0.03em] text-dark-40'
          >
            Terms & Conditions
          </Link>

          <div className='h-[1.125rem] w-px bg-dark-15'></div>

          <Link
            href={'#'}
            className='text-[0.875rem] leading-[1.3] tracking-[-0.03em] text-dark-40'
          >
            Privacy Policy
          </Link>
        </div>

        {/* Social links desktop */}
        <div className='hidden w-full items-center justify-center gap-[0.875rem] lg:flex'>
          {SOCIAL_LINKS.map(item => (
            <Link
              key={item.id}
              href={item.href}
              className='flex size-[1.25rem] shrink-0 items-center justify-center'
            >
              <item.Icon className='size-full text-white' />
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p className='shrink-0 text-[0.875rem] leading-[1.3] tracking-[-0.03em] text-dark-40'>
          © 2024 FutureTech. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default FooterLegal
