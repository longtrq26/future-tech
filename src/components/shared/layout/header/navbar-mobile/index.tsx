'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HEADER_LINKS } from '@/constants/navigation'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import UserMenuMobile from '../user-menu-mobile'

const NavbarMobile = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const topLineRef = useRef(null)
  const bottomLineRef = useRef(null)

  useGSAP(
    () => {
      if (!topLineRef.current || !bottomLineRef.current) return

      // (gap (button) + height (span)) / 2
      const moveY = 0.297

      if (isMenuOpen) {
        gsap.to(topLineRef.current, {
          y: `${moveY}rem`,
          rotation: 45,
          duration: 0.3,
          ease: 'power2.inOut',
        })
        gsap.to(bottomLineRef.current, {
          y: `-${moveY}rem`,
          rotation: -45,
          duration: 0.3,
          ease: 'power2.inOut',
        })
      } else {
        gsap.to([topLineRef.current, bottomLineRef.current], {
          y: 0,
          rotation: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        })
      }
    },
    { dependencies: [isMenuOpen] },
  )

  return (
    <div className='lg:hidden'>
      <Drawer direction='bottom' open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DrawerTrigger asChild>
          <button className='group flex size-[2rem] flex-col items-center justify-center gap-[0.5rem]'>
            <span ref={topLineRef} className='block h-[0.094rem] w-[1.75rem] bg-white' />
            <span ref={bottomLineRef} className='block h-[0.094rem] w-[1.75rem] bg-white' />
          </button>
        </DrawerTrigger>

        <DrawerContent className='flex w-full flex-col rounded-none border-none bg-dark-10'>
          <DrawerHeader className='sr-only'>
            <DrawerTitle>Menu</DrawerTitle>
          </DrawerHeader>

          <div className='container flex w-full flex-col'>
            {/* CTA */}
            <UserMenuMobile onClose={() => setIsMenuOpen(false)} />

            <nav className='flex w-full flex-col'>
              {HEADER_LINKS.map(item => {
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      'border-b border-dark-15 py-[1rem] text-[0.875rem] leading-[1.5] last:border-none',

                      isActive ? '' : 'text-grey-50',
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default NavbarMobile
