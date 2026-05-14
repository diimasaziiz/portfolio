'use client'

import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
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
          <motion.div
            className="h-fit w-fit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Button variant="default" size={'lg'}>
              See more <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </Link>
      </div>
    </section>
  )
}
