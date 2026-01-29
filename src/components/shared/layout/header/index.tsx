'use client'

import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import Navbar from './navbar'
import TopBanner from './top-banner'

const Header = () => {
  const [showBanner, setShowBanner] = useState(true)
  const bannerWrapperRef = useRef<HTMLDivElement>(null)
  const bannerContentRef = useRef<HTMLDivElement>(null)

  const handleBannerClose = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setShowBanner(false)
      },
      defaults: {
        duration: 0.3,
        ease: 'power3.inOut',
      },
    })

    tl.to(
      bannerWrapperRef.current,
      {
        height: 0,
      },
      0,
    )
    tl.to(
      bannerContentRef.current,
      {
        y: '-100%',
      },
      0,
    )
  }

  return (
    <header className='sticky top-0 z-50 flex w-full flex-col'>
      {showBanner && (
        <TopBanner
          wrapperRef={bannerWrapperRef}
          contentRef={bannerContentRef}
          onClose={handleBannerClose}
        />
      )}
      <Navbar />
    </header>
  )
}

export default Header
