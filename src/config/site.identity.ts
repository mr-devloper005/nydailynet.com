export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'vxlk8azusk',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Nydailynet',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Independent media updates',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A simple newsroom-style publication for announcements, coverage, and media updates on Nydailynet.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'nydailynet.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://nydailynet.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || '',
} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const
