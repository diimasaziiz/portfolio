import { DiaryInteraction } from '@/components/about/diary-interaction'
import { createClient } from '@/lib/supabase/server'
import { Experience, Technology } from '@/types'

export const revalidate = 60
export default async function Page() {
  const supabase = await createClient()

  // Fetch profile
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .single()

  // Fetch experiences
  const { data: experiencesData, error: experiencesError } = await supabase
    .from('experiences')
    .select('*')
    .order('start_date', { ascending: false })

  // Fetch technologies
  const { data: technologiesData, error: technologiesError } = await supabase
    .from('technologies')
    .select('*')

  if (profileError || experiencesError || technologiesError) {
    // In a real app, you might want to handle this better
    console.error('Error fetching data:', profileError, experiencesError, technologiesError)
  }

  return (
    <div
      className="flex flex-col gap-8 overflow-hidden bg-base-white pb-8"
      style={{ minHeight: 'calc(100dvh - 56px)' }}
    >
      <section className="p-4 md:p-8">
        <h1 className="text-5xl">About me</h1>
      </section>
      <DiaryInteraction
        experiences={experiencesData as Experience[]}
        technologies={technologiesData as Technology[]}
        profile={profileData}
      />
    </div>
  )
}
