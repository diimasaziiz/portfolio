/* eslint-disable @next/next/no-img-element */
import { Marquee } from '@/components/ui/marquee'
import { cn } from '@/lib/utils'
import { Technology } from '@/types'

const ReviewCard = ({ icon_url, name }: Technology) => {
  return (
    <div
      className={cn(
        'relative flex h-full w-48 cursor-pointer overflow-hidden rounded-xl border p-4',
        // light styles
        'border-gray-950/10 bg-gray-950/1 hover:bg-gray-950/5',
        // dark styles
        'dark:border-gray-50/10 dark:bg-gray-50/10 dark:hover:bg-gray-50/15',
      )}
    >
      <div className="flex flex-1 flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={icon_url} loading="lazy" />
        <figure>
          <figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
        </figure>
      </div>
    </div>
  )
}

interface Props {
  technologies: Technology[]
}

export function BaseMarqueeTech({ technologies }: Props) {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee className={`[--duration:50s]`}>
        {technologies.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <Marquee reverse className={`[--duration:50s]`}>
        {technologies.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-[#f3f1f8] dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-[#f3f1f8] dark:from-background"></div>
    </div>
  )
}
