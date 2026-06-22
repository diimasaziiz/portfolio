/* eslint-disable @next/next/no-img-element */
'use client'

import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { memo, useState } from 'react'

import { Project } from '@/types'

function getCardColor(index: number): string {
  const pos = index % 4
  return pos === 0 || pos === 3 ? 'bg-primary' : 'bg-muted-foreground'
}

function getCardType(index: number, isFeatured: boolean): string {
  const pos = index % 4
  if (isFeatured) return 'featured'
  return pos === 0 || pos === 3 ? 'primary' : 'secondary'
}

function formatIndex(index: number): string {
  return String(index + 1).padStart(2, '0')
}

// ─── Single folder card ───────────────────────────────────────────────────────

interface FolderCardProps {
  project: Project
  index: number
  totalProjects: number
  isLastOdd?: boolean
}

const FolderCard = memo(function FolderCard({
  project,
  index,
  totalProjects,
  isLastOdd,
}: FolderCardProps) {
  const [hovered, setHovered] = useState(false)
  const { is_featured: isFeatured } = project
  const isRightSide = index % 2 === 1
  const bgColor = isFeatured ? 'bg-muted' : getCardColor(index)
  const wideClass = isFeatured && isRightSide ? 'md:-ml-[20%] md:w-[120%]' : ''

  // Reverse the delay: last project (highest index) shows first
  const delay = (totalProjects - 1 - index) * 0.1
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 24,
        delay,
      }}
      className={isLastOdd ? 'md:col-span-2' : ''}
    >
      <Link
        href={`/projects/${project.id}?type=${getCardType(index, isFeatured)}&order=${index}`}
        className="relative"
        style={{ zIndex: index }}
        tabIndex={0}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.div
          initial={{ y: 0 }}
          whileHover={{ y: -12 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={`relative -mb-3 h-40 ${wideClass}`}
        >
          {/* ── Tab notch ──────────────────────────────────────── */}
          <div
            className={`absolute bottom-[calc(100%-1px)] left-0 h-7.5 w-[56%] rounded-t pt-2 pl-4 ${bgColor} ${hovered ? '' : 'group-hover:bg-[rgb(235,235,235)] group-hover:text-muted!'}`}
            style={{
              clipPath: 'polygon(0 100%, 0 0, calc(100% - 22px) 0, 100% 100%)',
              zIndex: index,
            }}
          >
            <span className="block text-sm">{formatIndex(index)}</span>
          </div>

          {/* ── Tilt image popup ───────────────────────────────── */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                key="popup"
                initial={{ opacity: 0, y: 20, left: 40, rotate: 20 }}
                animate={{ opacity: 1, y: -20, left: 40, rotate: 20 }}
                exit={{ opacity: 0, y: 20, left: 40, rotate: 20 }}
                transition={{ type: 'spring', stiffness: 340, damping: 22 }}
                className="pointer-events-none absolute -top-10 w-full overflow-hidden rounded-sm"
                style={{ zIndex: index - 1, height: '160px', width: '380px' }} // ← fixed height clips the rest
              >
                <img
                  src={project.image_url}
                  alt={`${project.title} preview`}
                  className="h-full w-full object-cover object-top" // ← object-top shows the top portion
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Body ───────────────────────────────────────────── */}
          <div
            className={`relative z-10 flex h-full flex-col items-start justify-center rounded-b-none px-8 pt-7 pb-8 ${bgColor} ${hovered ? '' : 'group-hover:bg-[rgb(235,235,235)] group-hover:text-muted!'}`}
          >
            <h2 className="m-0 text-4xl">{project.title}</h2>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
})

// ─── Grid ─────────────────────────────────────────────────────────────────────

export function BaseFolderGrid({ projects = [] }: { projects?: Project[] }) {
  const isOddTotal = projects.length % 2 !== 0

  return (
    <div className="group grid w-full grid-cols-1 md:grid-cols-2">
      {projects.map((project, i) => (
        <FolderCard
          key={project.id}
          project={project}
          index={i}
          totalProjects={projects.length}
          isLastOdd={isOddTotal && i === projects.length - 1}
        />
      ))}
    </div>
  )
}
