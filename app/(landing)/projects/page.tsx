import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'
import { createClient } from '@/lib/supabase/client'
import type { Project } from '@/types'

export default async function Page() {
  /**
   * SETUP HOOKS
   */
  const supabase = createClient()

  const { data = [], error } = await supabase.from('projects').select('*')

  if (error) return null
  /**
   * RENDER SUCCESS STATE
   */
  return (
    <section className="relative flex min-h-screen w-screen pt-20">
      <div className="container mx-auto flex flex-1 flex-col justify-start gap-4 px-4 py-6">
        <h1 className="font-display text-6xl leading-[0.95] lg:text-7xl"> Projects </h1>
        <p className="mt-4 max-w-2xl text-base text-(--color-text-secondary) md:text-lg">
          {' '}
          A selection of products, platforms, and experiments I&apos;ve built over the years.{' '}
        </p>

        <div className="m mx-auto w-full pt-10">
          <BentoGrid>
            {data?.map((project: Project) => (
              <BentoCard key={project.id} {...project} />
            ))}
          </BentoGrid>
        </div>
      </div>
    </section>
  )
}
