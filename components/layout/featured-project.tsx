import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'
import { Button } from '@/components/ui/button'
import { Project } from '@/types'

export default function FeaturedProject({ projects = [] }: { projects: Project[] }) {
  if (!projects.length) return
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl">Featured Project</h2>
      <div className="mx-auto">
        <BentoGrid>
          {projects.map((feature, idx) => (
            <BentoCard key={idx} {...feature} role="button" />
          ))}
        </BentoGrid>
      </div>
      <div className="mt-12 flex justify-center">
        <Link href="/projects">
          <Button variant="default" size={'lg'}>
            See more <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
