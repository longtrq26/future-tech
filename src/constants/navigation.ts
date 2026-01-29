import ICGroup from '@/components/icons/ic-group'
import ICLinkedin from '@/components/icons/ic-linkedin'
import ICTwitter from '@/components/icons/ic-twitter'

export const HEADER_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'News', href: '/news' },
  { label: 'Podcasts', href: '/podcasts' },
  { label: 'Resources', href: '/resources' },
]

export const FOOTER_LINKS = [
  {
    heading: 'Home',
    links: [
      {
        label: 'Features',
        href: '/features',
        isLatest: false,
      },
      {
        label: 'Blogs',
        href: '/blogs',
        isLatest: false,
      },
      {
        label: 'Resources',
        href: '/resources',
        isLatest: true,
      },
      {
        label: 'Testimonials',
        href: '/testimonials',
        isLatest: false,
      },
      {
        label: 'Contact Us',
        href: '/contact-us',
        isLatest: false,
      },
      {
        label: 'Newsletter',
        href: '/newsletter',
        isLatest: false,
      },
    ],
  },
  {
    heading: 'News',
    links: [
      {
        label: 'Trending Stories',
        href: '/trending-stories',
        isLatest: false,
      },
      {
        label: 'Featured Videos',
        href: '/featured-videos',
        isLatest: false,
      },
      {
        label: 'Technology',
        href: '/technology',
        isLatest: false,
      },
      {
        label: 'Health',
        href: '/health',
        isLatest: false,
      },
      {
        label: 'Politics',
        href: '/politics',
        isLatest: false,
      },
      {
        label: 'Environment',
        href: '/environment',
        isLatest: false,
      },
    ],
  },
  {
    heading: 'Podcasts',
    links: [
      {
        label: 'AI Revolution',
        href: '/ai-revolution',
        isLatest: false,
      },
      {
        label: 'AI Revolution',
        href: '/ai-revolution',
        isLatest: true,
      },
      {
        label: 'TechTalk AI',
        href: '/techtalk-ai',
        isLatest: false,
      },
      {
        label: 'Health',
        href: '/health',
        isLatest: false,
      },
      {
        label: 'AI Conversations',
        href: '/ai-conversations',
        isLatest: false,
      },
    ],
  },
  {
    heading: 'Blogs',
    links: [
      {
        label: 'Quantum Computing',
        href: '/quantum-computing',
        isLatest: false,
      },
      {
        label: 'AI Ethics',
        href: '/ai-ethics',
        isLatest: false,
      },
      {
        label: 'Space Exploration',
        href: '/space-exploration',
        isLatest: false,
      },
      {
        label: 'Biotechnology',
        href: '/biotechnology',
        isLatest: true,
      },
      {
        label: 'Renewable Energy',
        href: '/renewable-energy',
        isLatest: false,
      },
      {
        label: 'Biohacking',
        href: '/biohacking',
        isLatest: false,
      },
    ],
  },
]

export const RESOURCE_LINKS = [
  {
    label: 'Whitepapers',
    href: '/whitepapers',
  },
  {
    label: 'Ebooks',
    href: '/ebooks',
  },
  {
    label: 'Reports',
    href: '/reports',
  },
  {
    label: 'Research Papers',
    href: '/research-papers',
  },
]

export const SOCIAL_LINKS = [
  {
    id: 'tw',
    label: 'Twitter',
    Icon: ICTwitter,
    href: 'https://twitter.com/',
  },
  {
    id: 'gr',
    label: 'Group',
    Icon: ICGroup,
    href: 'https://group.com/',
  },
  {
    id: 'li',
    label: 'Linkedin',
    Icon: ICLinkedin,
    href: 'https://linkedin.com/',
  },
]
