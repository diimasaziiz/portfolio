import { Metadata } from 'next'

import { StructuredDataComponent } from '@/components/base/base-structured-data'
import FeaturedProject from '@/components/layout/featured-project'
import Hero from '@/components/layout/hero'
import { DEFAULT_SEO_CONFIG, generateMetadata } from '@/lib/seo'
import { createClient } from '@/lib/supabase/client'

const USER_ID = process.env.NEXT_PUBLIC_USER_ID

export const metadata: Metadata = generateMetadata({
  title: 'Home',
  description: DEFAULT_SEO_CONFIG.description,
  openGraph: {
    title: DEFAULT_SEO_CONFIG.siteName,
    description: DEFAULT_SEO_CONFIG.description,
    type: 'website',
    url: DEFAULT_SEO_CONFIG.siteUrl,
  },
})

export default async function Page() {
  const supabase = createClient()

  const { data: profileData, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', USER_ID)
    .single()

  const { data: technologies, error: errorTech } = await supabase.from('technologies').select('*')
  const { data: projects, error: errorProjects } = await supabase
    .from('projects')
    .select('*')
    .is('is_featured', true)

  if (error || errorTech || errorProjects) return null

  return (
    <>
      <StructuredDataComponent profile={profileData} />
      <Hero profileData={profileData} technologies={technologies} />
      <FeaturedProject projects={projects} />
    </>
  )
}
