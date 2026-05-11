'use client'

import MDEditor from '@uiw/react-md-editor'
import { format } from 'date-fns'
import { useParams } from 'next/navigation'
import useSWR from 'swr'

import { createClient } from '@/lib/supabase/client'
import { Project } from '@/types'

/**
 * SETUP LOCAL INTERFACE
 */

export default function Page() {
  /**
   * SETUP HOOKS
   */
  const supabase = createClient()
  const { id } = useParams()

  const fetcher = async (): Promise<Project> => {
    if (!id) throw new Error('Missing user id')

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .select('*, project_technologies(tech_id, technologies(name))')
      .maybeSingle()

    if (error) throw error
    return data
  }

  const { data: projectData } = useSWR<Project>(id ? ['profile-single', id] : null, fetcher)

  return (
    <section className="relative flex min-h-screen w-screen pt-20">
      <div className="container mx-auto flex flex-1 flex-col justify-start gap-4 px-4 py-6">
        <h2 className="mx-auto text-5xl font-bold md:text-6xl lg:text-7xl">{projectData?.title}</h2>
        <p className="mt-12 text-zinc-500">{projectData?.description}</p>

        {projectData && (
          <div className="mb-12 grid grid-cols-2">
            <div>
              <h3 className="text-zinc-500">Tech Stack</h3>
              <p className="mt-1">
                {projectData?.project_technologies.map((v) => v.technologies.name).join(', ')}
              </p>
            </div>
            <div>
              <h3 className="text-zinc-500">Date Published</h3>
              <p className="mt-1">
                {format(projectData?.date_published || new Date(), 'dd MMMM yyyy')}
              </p>
            </div>
          </div>
        )}

        <MDEditor.Markdown
          source={projectData?.content}
          style={{
            backgroundColor: 'transparent',
            whiteSpace: 'pre-wrap',
            color: 'inherit',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'inherit',
          }}
        />
      </div>
    </section>
  )
}
