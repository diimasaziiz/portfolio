import AboutHero from '@/components/layout/about-hero'
import Experiences from '@/components/layout/experience'
import { createClient } from '@/lib/supabase/client'
import { Experience, Profile } from '@/types'

/**
 * SETUP LOCAL INTERFACE
 */
const USER_ID = process.env.NEXT_PUBLIC_USER_ID
export default async function Page() {
  /**
   * SETUP HOOKS
   */
  const supabase = createClient()

  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', USER_ID)
    .single()

  const { data: experiences } = await supabase
    .from('experiences')
    .select('*')
    .order('start_date', { ascending: false })

  /**
   * SETUP STATE
   */

  /**
   * SETUP COMPUTED
   */

  /**
   * SETUP FUNCTIONS
   */

  /**
   * SETUP EFFECTS
   */

  return (
    <>
      <AboutHero profileData={profileData} />
      <Experiences experiences={experiences as Experience[]} />
    </>
  )
}
