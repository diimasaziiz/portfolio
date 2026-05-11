/* eslint-disable @next/next/no-img-element */
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'

interface BentoGridProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
  className?: string
}

type BentoCardProps = Project & ComponentPropsWithoutRef<'div'>

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        'grid w-full auto-rows-[16rem] grid-cols-2 gap-4 lg:auto-rows-[22rem]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoCard = ({ id, title, className, description, image_url }: BentoCardProps) => (
  <Link
    href={`/projects/${id}`}
    className={cn(
      'group/card relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl lg:col-span-1',
      // light styles
      'bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
      // dark styles
      'transform-gpu dark:bg-background dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]',
      className,
    )}
  >
    <div>
      <img
        src={image_url}
        alt={title}
        className="absolute top-0 mask-[linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:20s]"
        loading="lazy"
      />
    </div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover/card:-translate-y-10">
      <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">{title}</h3>
      <p className="line-clamp-2 text-neutral-400 lg:line-clamp-3">{description}</p>
    </div>

    <div
      className={cn(
        'pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100',
      )}
    >
      <Button variant="ghost" size="sm" className="pointer-events-auto font-bold" role="button">
        View detail
        <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover/card:bg-black/3 group-hover/card:dark:bg-neutral-800/10" />
  </Link>
)

export { BentoCard, BentoGrid }
