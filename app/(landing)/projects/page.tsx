/**
 * SETUP LOCAL INTERFACE
 */

import { BaseFolderGrid } from '@/components/base/base-folder-grid'
import { createClient } from '@/lib/supabase/server'
import { Project } from '@/types'

export const revalidate = 60
export default async function Page() {
  /**
   * SETUP HOOKS
   */
  const supabase = await createClient()
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('date_published', { ascending: false })

  const featured = projects?.filter((p) => p.is_featured) || []
  const notFeatured = projects?.filter((p) => !p.is_featured) || []
  const sortedProjects = sortProjects(featured, notFeatured)
  /**
   * SETUP STATE
   */

  /**
   * SETUP COMPUTED
   */
  function sortProjects(featured: Project[], notFeatured: Project[]): Project[] {
    const result: Project[] = []
    let fi = 0
    let ni = 0

    for (let i = 0; fi < featured.length || ni < notFeatured.length; i++) {
      if ((i + 1) % 4 === 0 && fi < featured.length) {
        result.push(featured[fi++])
      } else if (ni < notFeatured.length) {
        result.push(notFeatured[ni++])
      } else {
        result.push(featured[fi++])
      }
    }

    return result
  }

  /**
   * SETUP FUNCTIONS
   */

  /**
   * SETUP EFFECTS
   */

  return (
    <div
      className="flex flex-col justify-between gap-8 overflow-hidden bg-base-white"
      style={{ minHeight: 'calc(100dvh - 56px)' }}
    >
      <section className="p-8">
        <h1 className="text-5xl">Projects</h1>
      </section>
      <BaseFolderGrid projects={sortedProjects} />
    </div>
  )
}
