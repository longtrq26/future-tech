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
    <section className='mt-[26px] w-full lg:mt-0'>
      <div className='flex w-full flex-col lg:container lg:flex-row'>
        <div className='flex w-full flex-col gap-y-[30px] pt-[40px] lg:justify-between lg:border-r lg:border-dark-15 lg:pt-[100px]'>
          {/* Heading */}
          <div className='container flex flex-col gap-y-[14px] lg:max-w-none lg:gap-y-[20px] lg:px-0 lg:pr-[40px]'>
            <p className='font-kumbhSans text-[18px] font-medium leading-[1.2] tracking-[-0.03em] text-dark-40 lg:text-[22px]'>
              Your Journey to Tomorrow Begins Here
            </p>
            <div className='flex flex-col gap-y-[10px] lg:gap-y-[14px]'>
              <h2 className='font-kumbhSans text-[30px] leading-[1.2] tracking-[-0.03em] lg:text-[55px]'>
                Explore the Frontiers of Artificial Intelligence
              </h2>
              <p className='text-[14px] leading-[1.5] tracking-[-0.03em] text-grey-50 lg:text-[16px]'>
                Welcome to the epicenter of AI innovation. FutureTech AI News is your passport to a
                world where machines think, learn, and reshape the future.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className='w-full border-y border-dark-15 lg:mt-[100px]'>
            <div className='grid w-full grid-cols-3'>
              {STATS.map(stat => (
                <div
                  key={stat.label}
                  className='col-span-1 border-r border-dark-15 px-[20px] py-[20px] first:pl-[16px] last:border-none last:pr-[16px] lg:px-[40px] lg:py-[30px] lg:first:pl-0 lg:last:pr-[40px]'
                >
                  <p className='text-[24px] font-semibold leading-[1.5] tracking-[-0.03em] lg:text-[30px]'>
                    {stat.value}
                    <span className='text-yellow-55'>+</span>
                  </p>
                  <p className='text-[14px] leading-[1.5] tracking-[-0.03em] text-grey-60'>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='relative w-full overflow-hidden lg:max-w-[523px] lg:items-end lg:border-b lg:border-dark-15'>
          {/* Decoration */}
          <div className='absolute left-[-80px] top-[-10px] z-[-1] h-[286.9904px] w-[423.28px] rotate-[35.39deg] lg:left-[-100px] lg:top-[-30px] lg:h-[422.04px] lg:w-[622.4496px]'>
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
          <div className='flex h-full w-full flex-col justify-end gap-y-[20px] pb-[40px] pl-[40px] pr-[40px] pt-[100px] lg:pl-[50px] lg:pr-0'>
            {/* Customers */}
            <div className='flex w-fit items-center -space-x-[14px] rounded-[100px] border border-dark-15 bg-dark-10 p-[8px]'>
              {[1, 2, 3, 4].map((item, index) => (
                <div
                  key={index}
                  className='size-[40px] rounded-[42px] border border-dark-40 bg-dark-15 lg:size-[50px]'
                ></div>
              ))}
            </div>

            {/* Resources */}
            <div className='w-full space-y-[4px]'>
              <h6 className='text-[18px] leading-[1.5] tracking-[-0.03em] lg:text-[20px]'>
                Explore 1000+ resources
              </h6>
              <p className='text-[14px] leading-[1.5] tracking-[-0.03em] text-grey-60 lg:text-[16px]'>
                Over 1,000 articles on emerging tech trends and breakthroughs.
              </p>
            </div>

            <Link
              href={'#'}
              className='flex w-fit items-center justify-center gap-[4px] rounded-[8px] border border-dark-15 bg-dark-08 px-[20px] py-[14px] text-[14px] leading-[1.5] tracking-[-0.03em] text-grey-60'
            >
              Explore Resources
              <span className='flex size-[20px] items-center justify-center'>
                <ICLink className='size-[13.7504px] text-yellow-55' />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
