import React, { RefObject } from 'react'
import Link from 'next/link'
import ICClose from '@/components/icons/ic-close'

interface TopBannerProps {
  wrapperRef: RefObject<HTMLDivElement | null>
  contentRef: RefObject<HTMLDivElement | null>
  onClose: () => void
}

const TopBanner = ({ wrapperRef, contentRef, onClose }: TopBannerProps) => {
  return (
    <div ref={wrapperRef} className='container w-full overflow-hidden bg-dark-08'>
      <div ref={contentRef} className='flex w-full items-center py-[0.875rem] lg:py-[0.75rem]'>
        <Link
          href={'/'}
          onClick={onClose}
          className='mx-auto text-center text-[0.75rem] leading-[1.5] tracking-[-0.03em] text-grey-60 underline lg:text-[0.875rem]'
        >
          Subscribe to our Newsletter For Blogs and Resources
        </Link>

        <button onClick={onClose} className='flex size-[1.25rem] items-center justify-center'>
          <ICClose className='size-[0.859rem] text-white' />
        </button>
      </div>
    </div>
  )
}

export default TopBanner
