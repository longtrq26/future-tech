import React from 'react'
import ICFuture from '@/components/icons/ic-future'
import ICResearch from '@/components/icons/ic-research'
import BrandSection from '@/components/shared/brand/section'

const FEATURES = [
  {
    icon: <ICFuture className='size-[40px]' />,
    label: 'Future Technology Blog',
    subLabel: 'Stay informed with our blog section dedicated to future technology.',
    features: [
      {
        label: 'Quantity',
        description: 'Over 1,000 articles on emerging tech trends and breakthroughs.',
      },
      {
        label: 'Variety',
        description: 'Articles cover fields like AI, robotics, biotechnology, and more.',
      },
      {
        label: 'Frequency',
        description: 'Fresh content added daily to keep you up to date.',
      },
      {
        label: 'Authoritative',
        description: 'Written by our team of tech experts and industry professionals.',
      },
    ],
  },
  {
    icon: <ICResearch />,
    label: 'Research Insights Blogs',
    subLabel: 'Dive deep into future technology concepts with our research section.',
    features: [
      {
        label: 'Depth',
        description: '500+ research articles for in-depth understanding.',
      },
      {
        label: 'Graphics',
        description: 'Visual aids and infographics to enhance comprehension.',
      },
      {
        label: 'Trends',
        description: 'Explore emerging trends in future technology research.',
      },
      {
        label: 'Contributors',
        description: 'Contributions from tech researchers and academics.',
      },
    ],
  },
]

const FeaturesSection = () => {
  return (
    <BrandSection
      title='FutureTech Features'
      subtitle='Unlock the Power of'
      hasButton={false}
      content={FEATURES.map((feature, index) => (
        <div key={index} className='w-full border-t border-t-dark-15'>
          <div className='container flex w-full flex-col lg:flex-row'>
            {/* Header */}
            <div className='flex flex-col gap-[20px] border-r-0 border-dark-15 py-[50px] lg:max-w-[413px] lg:gap-[40px] lg:border-r lg:pr-[60px]'>
              <div className='flex size-[50px] items-center justify-center lg:size-[60px]'>
                {feature.icon}
              </div>

              <div className='flex flex-col gap-[6px] lg:gap-[10px]'>
                <h3 className='font-kumbhSans text-[24px] font-semibold leading-[1.5] tracking-[-0.03em] lg:text-[30px]'>
                  {feature.label}
                </h3>
                <p className='text-[14px] leading-[1.5] tracking-[-0.03em] text-grey-60 lg:text-[16px]'>
                  {feature.subLabel}
                </p>
              </div>
            </div>

            <div className='grid grid-cols-1 gap-[10px] border-t border-dark-15 px-[16px] py-[30px] lg:grid-cols-2 lg:gap-[20px] lg:border-t-0 lg:px-0 lg:py-[60px] lg:pl-[60px]'>
              {feature.features.map((feature, index) => (
                <div
                  key={index}
                  className='flex flex-col gap-[4px] rounded-[10px] border border-dark-15 bg-dark-10 p-[24px] lg:gap-[16px] lg:p-[30px]'
                >
                  <p className='text-[18px] font-medium leading-[1.5] tracking-[-0.03em] lg:text-[20px]'>
                    {feature.label}
                  </p>
                  <p className='text-[14px] leading-[1.5] tracking-[-0.03em] text-grey-60 lg:text-[16px]'>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    />
  )
}

export default FeaturesSection
