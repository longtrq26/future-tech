'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FOOTER_LINKS, RESOURCE_LINKS } from '@/constants/navigation'
import { cn } from '@/lib/utils'
import ICLink from '@/components/icons/ic-link'

const FooterNav = () => {
  const pathname = usePathname()

  return (
    <div className='flex w-full flex-col gap-[1.25rem] py-[2.5rem] lg:flex-row lg:gap-[3.125rem] lg:py-[3.75rem]'>
      {/* Links */}
      <div className='grid w-full grid-cols-2 gap-[1.25rem] lg:grid-cols-4 lg:gap-[3.125rem]'>
        {FOOTER_LINKS.map((item, index) => {
          const isActive = pathname === item.links[0].href

          return (
            <div key={index} className='col-span-1 flex flex-col gap-[1rem] lg:gap-[1.75rem]'>
              <h6 className='text-[1rem] font-medium leading-[1.3] tracking-[-0.03em] lg:text-[1.125rem]'>
                {item.heading}
              </h6>

              <div className='flex flex-col gap-[.5rem] lg:gap-[.75rem]'>
                {item.links.map((link, index) => {
                  return (
                    <div key={index} className='flex items-center gap-[.5rem]'>
                      <Link
                        href={link.href}
                        className={cn(
                          'text-[.875rem] leading-[1.3] tracking-[-0.03em]',
                          isActive ? '' : 'text-dark-40',
                        )}
                      >
                        {link.label}
                      </Link>

                      {link.isLatest && (
                        <span className='inline-block rounded-[.25rem] border border-transparent bg-origin-border px-[.625rem] py-[.125rem] text-[.75rem] leading-[1.5] tracking-[-0.03em] [background:linear-gradient(#1A1A1A,#1A1A1A)_padding-box,linear-gradient(45deg,#262626_65%,#FFD119_100%)_border-box]'>
                          New
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      {/* Resources */}
      <div className='flex flex-col gap-[1rem] lg:gap-[1.75rem]'>
        <h6 className='text-[1rem] font-medium leading-[1.3] tracking-[-0.03em] lg:text-[1.125rem]'>
          Resources
        </h6>

        <div className='flex flex-wrap items-center gap-[.75rem] lg:flex-col lg:items-start'>
          {RESOURCE_LINKS.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.href}
                className='flex items-center gap-[.25rem] rounded-[.375rem] border border-dark-15 px-[.875rem] py-[.5rem]'
              >
                <p className='text-[.875rem] leading-[1.5] tracking-[-0.03em] text-grey-60'>
                  {item.label}
                </p>

                <div className='flex size-[1.125rem] items-center justify-center'>
                  <ICLink className='size-[.774rem] text-[#FFD11A]' />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FooterNav
