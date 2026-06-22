import { format } from 'date-fns'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

import BaseMDPreviewer from '@/components/base/base-md-previewer'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'
import { Project } from '@/types'

/**
 * SETUP LOCAL INTERFACE
 */
interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | number | undefined }>
}

const MAP_BACKGROUND_COLOR = {
  primary: 'bg-primary',
  secondary: 'bg-muted-foreground',
  featured: 'bg-muted',
}

export default async function Page({ params, searchParams }: Props) {
  /**
   * SETUP HOOKS
   */
  const { id } = await params
  const { type, order } = await searchParams
  const supabase = await createClient()
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .select('*, project_technologies(tech_id, technologies(name))')
    .maybeSingle<Project>()

  /**
   * SETUP STATE
   */
  const bgColor = MAP_BACKGROUND_COLOR[type as keyof typeof MAP_BACKGROUND_COLOR] ?? 'bg-primary'

  /**
   * SETUP COMPUTED
   */

  /**
   * SETUP FUNCTIONS
   */

  function formatIndex(index: number = 0): string {
    return String(Number(index) + 1).padStart(2, '0')
  }

  /**
   * SETUP EFFECTS
   */

  return (
    <div
      className="flex flex-col justify-between gap-8 overflow-hidden bg-base-white"
      style={{ minHeight: 'calc(100dvh - 56px)' }}
    >
      <section className="p-4 md:p-8">
        <Link href="/projects">
          <Button variant="link" className="px-0 text-base-background">
            <ArrowLeftIcon />
            <span>SEE ALL PROJECTS</span>
          </Button>
        </Link>
      </section>

      <div className="relative">
        {/* ── Tab notch ──────────────────────────────────────── */}
        <div
          className={`absolute bottom-[calc(100%-1px)] left-0 h-7.5 w-[56%] rounded-t pt-2 pl-4 ${bgColor}`}
          style={{
            clipPath: 'polygon(0 100%, 0 0, calc(100% - 22px) 0, 100% 100%)',
          }}
        >
          <span className="block text-sm">{formatIndex(order as number)}</span>
        </div>

        {/* ── Body ───────────────────────────────────────────── */}
        <div
          className={`relative z-10 flex h-full flex-col items-start justify-center gap-8 rounded-b-none pt-7 pb-4 md:pb-8 ${bgColor}`}
        >
          <div className="w-full border-b border-dotted border-base-background px-4 pb-4 md:px-8 md:pb-8">
            <h2 className="m-0 mb-5 text-4xl">{project?.title}</h2>
            <div>
              {project && (
                <div className="grid grid-cols-2">
                  <div>
                    <h3 className="text-zinc-500">Tech Stack</h3>
                    <p className="mt-1">
                      {project?.project_technologies?.map((v) => v.technologies.name).join(', ')}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-zinc-500">Date Published</h3>
                    <p className="mt-1">
                      {format(project?.date_published || new Date(), 'dd MMMM yyyy')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="px-4 md:px-8">
            <BaseMDPreviewer source={String(project?.content)} />
          </div>
        </div>
      </div>
    </div>
  )
}
