import { createClient } from '@/lib/supabase/server'

import LayoutFooter from './footer'
import { LayoutHero } from './hero'
import LayoutMenu from './menu'

export default async function LayoutMain() {
  /**
   * SETUP HOOKS
   */

  const supabase = await createClient()

  // Fetch profile
  const { data: profileData } = await supabase.from('profiles').select('*').single()

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
    <section className="sticky bottom-0 left-0 flex h-dvh w-screen flex-col justify-between bg-base-background text-base-white">
      <LayoutMenu />
      <LayoutHero />
      <LayoutFooter socialMedias={profileData?.social_links} />
    </section>
  )
}
