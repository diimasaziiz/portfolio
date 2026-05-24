import { Metadata } from 'next'

import OGImage from '@/public/og-image.png'

export const DEFAULT_SEO_CONFIG = {
  siteName: 'Dimas Abdul Aziz - Portfolio',
  siteUrl: 'https://diimasaziiz.bersuadiantara.com',
  description:
    'Software Engineer based in Indonesia 🇮🇩. Focused on building impactful, user-centered applications—crafting seamless interfaces backed by solid and scalable systems.',
  keywords: [
    'Dimas Abdul Aziz',
    'diimasaziiz',
    'Dimas Aziz',
    'Dimas Abdul Aziz portfolio',
    'Dimas Abdul Aziz software engineer',
    'software engineer',
    'frontend developer',
    'React developer',
    'Next.js developer',
    'web developer',
    'JavaScript',
    'TypeScript',
    'frontend engineer',
    'UI developer',
    'web development',
    'portfolio',
    'projects',
    'full-stack developer',
    'modern web development',
    'responsive design',
  ],
  author: 'Dimas Abdul Aziz',
  twitterHandle: '@diimasaziiz',
  ogImage: OGImage.src,
}

export const generateMetadata = (overrides?: Partial<Metadata>): Metadata => {
  const baseUrl = DEFAULT_SEO_CONFIG.siteUrl

  return {
    title: {
      default: DEFAULT_SEO_CONFIG.siteName,
      template: `%s | ${DEFAULT_SEO_CONFIG.siteName}`,
    },
    description: DEFAULT_SEO_CONFIG.description,
    keywords: DEFAULT_SEO_CONFIG.keywords,
    authors: [{ name: DEFAULT_SEO_CONFIG.author }],
    creator: DEFAULT_SEO_CONFIG.author,
    metadataBase: new URL(baseUrl),
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: baseUrl,
      siteName: DEFAULT_SEO_CONFIG.siteName,
      title: DEFAULT_SEO_CONFIG.siteName,
      description: DEFAULT_SEO_CONFIG.description,
      images: [
        {
          url: `${baseUrl}${DEFAULT_SEO_CONFIG.ogImage}`,
          width: 1200,
          height: 630,
          alt: DEFAULT_SEO_CONFIG.siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: DEFAULT_SEO_CONFIG.siteName,
      description: DEFAULT_SEO_CONFIG.description,
      images: [`${baseUrl}${DEFAULT_SEO_CONFIG.ogImage}`],
      creator: DEFAULT_SEO_CONFIG.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    alternates: {
      canonical: baseUrl,
    },
    ...overrides,
  }
}

export interface StructuredData {
  '@context': string
  '@type': string
  [key: string]: unknown
}

export const generatePersonSchema = (profile: {
  full_name?: string
  bio?: string
  email?: string
  social_links?: Record<string, string>
}): StructuredData => {
  const baseUrl = DEFAULT_SEO_CONFIG.siteUrl

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.full_name || DEFAULT_SEO_CONFIG.author,
    description: profile.bio || DEFAULT_SEO_CONFIG.description,
    email: profile.email,
    image: `${baseUrl}/avatar.webp`,
    url: baseUrl,
    sameAs: profile.social_links ? Object.values(profile.social_links) : [],
  }
}

export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>,
): StructuredData => {
  const baseUrl = DEFAULT_SEO_CONFIG.siteUrl

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  }
}

export const generateOrganizationSchema = (): StructuredData => {
  const baseUrl = DEFAULT_SEO_CONFIG.siteUrl

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: DEFAULT_SEO_CONFIG.siteName,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: DEFAULT_SEO_CONFIG.description,
    sameAs: [],
  }
}
