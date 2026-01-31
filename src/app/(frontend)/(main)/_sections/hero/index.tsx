import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ICLink from '@/components/icons/ic-link'

const STATS = [
  {
    label: 'Resources available',
    value: '300',
  },
  {
    label: 'Total Downloads',
    value: '12k',
  },
  {
    label: 'Active Users',
    value: '10k',
  },
]

const HeroSection = () => {
  return (
    <section className='mt-[1.625rem] flex w-full flex-col lg:mt-0 lg:flex-row'>
      <div className='flex w-full flex-col gap-y-[1.875rem] pt-[2.5rem] lg:justify-between lg:border-r lg:border-dark-15 lg:pt-[6.25rem]'>
        {/* Heading */}
        <div className='container flex flex-col gap-y-[.875rem] lg:gap-y-[1.25rem]'>
          <p className='font-kumbhSans text-[1.125rem] font-medium leading-[1.2] tracking-[-0.03em] text-dark-40 lg:text-[1.375rem]'>
            Your Journey to Tomorrow Begins Here
          </p>
          <div className='flex flex-col gap-y-[.625rem] lg:gap-y-[.875rem]'>
            <h2 className='font-kumbhSans text-[1.875rem] leading-[1.2] tracking-[-0.03em] lg:text-[3.4375rem]'>
              Explore the Frontiers of Artificial Intelligence
            </h2>
            <p className='text-[.875rem] leading-[1.5] tracking-[-0.03em] text-grey-50 lg:text-[1rem]'>
              Welcome to the epicenter of AI innovation. FutureTech AI News is your passport to a
              world where machines think, learn, and reshape the future.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className='w-full border-y border-dark-15 lg:mt-[6.25rem]'>
          <div className='grid w-full grid-cols-3'>
            {STATS.map(stat => (
              <div
                key={stat.label}
                className='col-span-1 border-r border-dark-15 px-[1.25rem] py-[1.25rem] first:pl-[1rem] last:border-none last:pr-[1rem] lg:px-[2.5rem] lg:py-[1.875rem] lg:first:pl-[5rem] lg:last:pr-[5rem]'
              >
                <p className='text-[1.5rem] font-semibold leading-[1.5] tracking-[-0.03em] lg:text-[1.875rem]'>
                  {stat.value}
                  <span className='text-yellow-55'>+</span>
                </p>
                <p className='text-[.875rem] leading-[1.5] tracking-[-0.03em] text-grey-60'>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='relative w-full overflow-hidden lg:max-w-[32.6875rem] lg:items-end lg:border-b lg:border-dark-15'>
        {/* Decoration */}
        <div className='absolute left-[-5rem] top-[-0.625rem] z-[-1] h-[17.9369rem] w-[26.455rem] rotate-[35.39deg] lg:left-[-6.25rem] lg:top-[-1.875rem] lg:h-[26.3775rem] lg:w-[38.9031rem]'>
          <Image
            src={'/hero-decoration.svg'}
            alt='Hero decoration'
            fill
            className='object-contain'
            priority
          />
          <div className='absolute inset-0 bg-dark-08/75' />
        </div>

        {/* CTA */}
        <div className='flex h-full w-full flex-col justify-end gap-y-[1.25rem] pb-[2.5rem] pl-[2.5rem] pr-[1rem] pt-[6.25rem] lg:pl-[3.125rem] lg:pr-[5rem]'>
          {/* Customers */}
          <div className='flex w-fit items-center -space-x-[.875rem] rounded-[6.25rem] border border-dark-15 bg-dark-10 p-[.5rem]'>
            {[1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className='size-[2.5rem] rounded-[2.625rem] border border-dark-40 bg-dark-15 lg:size-[3.125rem]'
              ></div>
            ))}
          </div>

          {/* Resources */}
          <div className='w-full space-y-[.25rem]'>
            <h6 className='text-[1.125rem] leading-[1.5] tracking-[-0.03em] lg:text-[1.25rem]'>
              Explore 1000+ resources
            </h6>
            <p className='text-[.875rem] leading-[1.5] tracking-[-0.03em] text-grey-60 lg:text-[1rem]'>
              Over 1,000 articles on emerging tech trends and breakthroughs.
            </p>
          </div>

          <Link
            href={'#'}
            className='flex w-fit items-center justify-center gap-[.25rem] rounded-[.5rem] border border-dark-15 bg-dark-08 px-[1.25rem] py-[.875rem] text-[.875rem] leading-[1.5] tracking-[-0.03em] text-grey-60'
          >
            Explore Resources
            <span className='flex size-[1.25rem] items-center justify-center'>
              <ICLink className='size-[.8594rem] text-yellow-55' />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
