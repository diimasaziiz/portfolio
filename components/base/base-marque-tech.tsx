/* eslint-disable @next/next/no-img-element */
'use client'

import { motion } from 'motion/react'

import { Marquee } from '@/components/ui/marquee'
import { cn } from '@/lib/utils'
import { Technology } from '@/types'

const ReviewCard = ({ icon_url, name }: Technology) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20, delay: 0.1 }}
      className={cn(
        'relative flex h-full w-48 cursor-pointer overflow-hidden rounded-xl border bg-white/10 p-4 backdrop-blur-md transition-colors duration-300 hover:shadow-[0_8_24px_var(--primary)]',
        // light styles
        'border-gray-950/10 bg-gray-950/1 hover:border-primary hover:shadow-primary',
        // dark styles
        'dark:border-gray-50/10 dark:bg-gray-50/10 dark:hover:border-primary dark:hover:shadow-primary',
      )}
    >
      <div className="flex flex-1 flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={icon_url} loading="lazy" />
        <figure>
          <figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
        </figure>
      </div>
    </motion.div>
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
