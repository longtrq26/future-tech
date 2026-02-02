import React from 'react'
import Link from 'next/link'
import ICContributors from '@/components/icons/ic-contributors'
import ICLink from '@/components/icons/ic-link'
import ICNews from '@/components/icons/ic-news'
import ICReadership from '@/components/icons/ic-readership'

const HIGHLIGHTS = [
  {
    icon: <ICNews className='size-[1.5rem] lg:size-[2rem]' />,
    label: 'Latest News Updates',
    subLabel: 'Stay Current',
    description: 'Over 1,000 articles published monthly',
  },
  {
    icon: <ICContributors className='size-[1.5rem] lg:size-[2rem]' />,
    label: 'Expert Contributors',
    subLabel: 'Trusted Insights',
    description: '50+ renowned AI experts on our team',
  },
  {
    icon: <ICReadership className='size-[1.5rem] lg:size-[2rem]' />,
    label: 'Global Readership',
    subLabel: 'Worldwide Impact',
    description: '2 million monthly readers',
  },
]

const HighlightsSection = () => {
  return (
    <section className='w-full border-t border-dark-15'>
      <div className='container flex w-full flex-col lg:flex-row'>
        {HIGHLIGHTS.map((highlight, index) => (
          <div
            key={index}
            className='flex w-full flex-col gap-y-[.625rem] border-b border-dark-15 py-[1.875rem] first:pl-0 last:border-b-0 last:pr-0 lg:gap-y-[1.25rem] lg:border-b-0 lg:border-r lg:px-[3.125rem] lg:py-[2.5rem] lg:last:border-r-0'
          >
            <div className='flex flex-col gap-y-[1rem] lg:gap-y-[1.25rem]'>
              <div className='flex size-[1.875rem] items-center justify-center lg:size-[2.5rem]'>
                {highlight.icon}
              </div>
              <div className='flex items-center justify-between'>
                <div className='space-y-[.125rem]'>
                  <h6 className='text-[1rem] leading-[1.5] tracking-[-0.03em] lg:text-[1.125rem]'>
                    {highlight.label}
                  </h6>
                  <p className='text-[.875rem] leading-[1.5] tracking-[-0.03em] text-grey-50 lg:text-[1rem]'>
                    {highlight.subLabel}
                  </p>
                </div>
                <Link
                  href={'#'}
                  className='flex size-[2.5rem] items-center justify-center rounded-[6.25rem] bg-yellow-55 p-[.625rem] lg:size-[2.75rem] lg:p-[.75rem]'
                >
                  <div className='flex size-[1.25rem] items-center justify-center'>
                    <ICLink className='size-[.8594rem] text-dark-08' />
                  </div>
                </Link>
              </div>
            </div>

            <p className='font-kumbhSans text-[.875rem] leading-[1.5] tracking-[-0.03em] text-grey-60 lg:text-[1rem]'>
              {highlight.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HighlightsSection
