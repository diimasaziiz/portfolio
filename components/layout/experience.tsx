import { BriefcaseBusiness } from 'lucide-react'

import Timeline from '@/components/ui/timeline'
import { Experience } from '@/types'

export default function Experiences({ experiences }: { experiences: Experience[] }) {
  return (
    <section className="relative min-h-screen">
      <div className="container mx-auto flex flex-col gap-4 px-4 py-6 xl:flex-row">
        <div className="flex w-full flex-col items-start gap-4 xl:w-2/3">
          <div className="rounded-xl: border p-3">
            <BriefcaseBusiness />
          </div>
          <h2 className="xl::text-2xl text-xl font-bold">My Experiences</h2>
        </div>
        <Timeline items={experiences} />
      </div>
    </section>
  )
}
