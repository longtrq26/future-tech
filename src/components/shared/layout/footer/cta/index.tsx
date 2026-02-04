import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ICLink from '@/components/icons/ic-link'

const ITEMS = [
  {
    label: 'Resource Access',
    description:
      'Visitors can access a wide range of resources, including ebooks, whitepapers, reports.',
    link: '#',
  },
  {
    label: 'Community Forum',
    description:
      'Join our active community forum to discuss industry trends and collaborate with peers.',
    link: '#',
  },
  {
    label: 'Tech Events',
    description:
      'Stay updated on upcoming tech events, webinars and conferences to enhance your knowledge.',
    link: '#',
  },
]

const FooterCTA = () => {
  return (
    <div className='w-full border-t border-dark-15 bg-dark-10 py-[40px]'>
      <div className='container flex w-full flex-col gap-[40px]'>
        <div className='flex flex-col gap-[20px] lg:flex-row lg:gap-[60px]'>
          <div className='flex items-center gap-[20px]'>
            <div className='relative flex size-[60px] items-center justify-center lg:size-[120px]'>
              <Image src='/logo-icon.svg' alt='Future Tech' fill className='object-contain' />
            </div>

            <div className='w-fit rounded-[4px] bg-dark-20 px-[8px] py-[4px] text-[14px] leading-[1.5] tracking-[-0.03em] lg:hidden'>
              Learn, Connect, and Innovate
            </div>
          </div>

          <div className='flex flex-col gap-[10px]'>
            <div className='hidden w-fit rounded-[4px] bg-dark-20 px-[8px] py-[4px] text-[14px] leading-[1.5] tracking-[-0.03em] lg:block lg:text-[16px]'>
              Learn, Connect, and Innovate
            </div>
            <div className='flex flex-col gap-[4px] lg:gap-[20px]'>
              <h3 className='font-kumbhSans text-[28px] font-medium leading-[1.3] tracking-[-0.03em] lg:text-[44px]'>
                Be Part of the Future Tech Revolution
              </h3>
              <p className='text-[14px] leading-[1.5] tracking-[-0.03em] text-grey-50 lg:hidden lg:text-[16px]'>
                Immerse yourself in the world of future technology. Explore our comprehensive
                resources.
              </p>
              <p className='hidden text-[14px] leading-[1.5] tracking-[-0.03em] text-grey-50 lg:block lg:text-[16px]'>
                Immerse yourself in the world of future technology. Explore our comprehensive
                resources, connect with fellow tech enthusiasts, and drive innovation in the
                industry. Join a dynamic community of forward-thinkers.
              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-[10px] rounded-[10px] border-dark-15 bg-dark-08 p-[10px] lg:flex-row'>
          {ITEMS.map((item, index) => {
            return (
              <div
                key={index}
                className='flex w-full flex-col gap-[10px] rounded-[10px] border-dark-15 bg-dark-10 p-[24px] lg:gap-[16px] lg:p-[30px]'
              >
                <div className='flex items-center justify-between'>
                  <h6 className='text-[16px] font-semibold leading-[1.5] tracking-[-0.03em] lg:text-[18px]'>
                    {item.label}
                  </h6>

                  <Link
                    href={item.link}
                    className='flex size-[40px] items-center justify-center rounded-[100px] bg-yellow-55 p-[10px] lg:size-[44px] lg:p-[12px]'
                  >
                    <span className='flex size-[20px] items-center justify-center'>
                      <ICLink className='size-[13.75px] text-dark-08' />
                    </span>
                  </Link>
                </div>

                <p className='text-[14px] leading-[1.5] tracking-[-0.03em] text-grey-60 lg:text-[16px]'>
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FooterCTA
