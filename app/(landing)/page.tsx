import FeaturedProject from '@/components/layout/featured-project'
import Hero from '@/components/layout/hero'
import { createClient } from '@/lib/supabase/client'

const USER_ID = process.env.NEXT_PUBLIC_USER_ID
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
      <Hero profileData={profileData} technologies={technologies} />
      <FeaturedProject projects={projects} />
    </>
  )
}
