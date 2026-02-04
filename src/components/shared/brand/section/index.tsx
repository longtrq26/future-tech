import React from 'react'
import Link from 'next/link'
import ICLink from '@/components/icons/ic-link'

interface BrandSectionProps {
  title: string
  subtitle: string
  hasButton: boolean
  buttonLabel?: string
  buttonLink?: string
  content: React.ReactNode
}

const BrandSection = ({
  title,
  subtitle,
  hasButton,
  buttonLabel,
  buttonLink,
  content,
}: BrandSectionProps) => {
  return (
    <section className='w-full border-t border-dark-15'>
      {/* Heading */}
      <div className='w-full bg-dark-10'>
        <div className='container flex flex-col gap-[30px] py-[40px] lg:flex-row lg:items-center lg:justify-between'>
          <div className='flex flex-col gap-[10px]'>
            <span className='size-fit rounded-[4px] bg-dark-20 px-[8px] py-[4px] text-[14px] font-medium leading-[1.5] tracking-[-0.03em] lg:text-[16px]'>
              {subtitle}
            </span>

            <h3 className='font-kumbhSans text-[28px] font-medium leading-[1.3] tracking-[-0.03em] lg:text-[44px]'>
              {title}
            </h3>
          </div>

          {hasButton && (
            <Link
              href={buttonLink || '#'}
              className='flex items-center justify-center gap-[4px] rounded-[8px] border border-dark-15 bg-dark-08 px-[20px] py-[14px] text-[14px] leading-[1.5] tracking-[-0.03em] text-grey-60'
            >
              {buttonLabel}
              <span className='flex size-[20px] items-center justify-center'>
                <ICLink className='size-[13.75px] text-yellow-55' />
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Content */}
      {content}
    </section>
  )
}

export default BrandSection
