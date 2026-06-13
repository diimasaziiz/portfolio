'use client'

import MDEditor from '@uiw/react-md-editor'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

import { Experience } from '@/types'

interface Props {
  experiences: Experience[]
}

export function ExperienceContent({ experiences = [] }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col border-x border-dotted border-base-background bg-muted-foreground">
      <div className="flex items-center gap-8 border-b border-dotted border-base-background p-3 transition-colors">
        <span className="text-4xl text-black md:text-5xl">Experiences</span>
      </div>

      <div className="grid grid-cols-3">
        <div className="border-r border-dotted border-base-background p-3">
          {hoveredIndex !== null && experiences[hoveredIndex] && (
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                },
              }}
            >
              <Image
                src={experiences[hoveredIndex].company_logo_url}
                alt={`logo-${experiences[hoveredIndex].company_name}`}
                height={100}
                width={
                  experiences[hoveredIndex].company_name === 'PT. Semesta Integrasi Digital'
                    ? 150
                    : 100
                }
              />
              <MDEditor.Markdown
                source={experiences[hoveredIndex].description}
                style={{
                  backgroundColor: 'transparent',
                  whiteSpace: 'pre-wrap',
                  color: 'inherit',
                  fontFamily: 'inherit',
                  marginTop: '12px',
                }}
              />
            </motion.div>
          )}
        </div>

        <div className="col-span-2">
          <div className="grid grid-cols-3 gap-3 border-b border-dotted border-base-background [&_h6]:p-3">
            <h6>YEAR</h6>
            <h6>COMPANY</h6>
            <h6>POSITION</h6>
          </div>

          {experiences.map(
            ({ start_date, end_date, is_current, company_name, location, position }, i) => (
              <div
                key={i}
                className="grid cursor-cell grid-cols-3 gap-3 border-b border-dotted border-base-background [&>div]:p-3 [&>p]:p-3"
                onMouseOver={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <p>
                  {' '}
                  {format(start_date, 'MMMM yyyy')} -{' '}
                  {is_current ? 'Present' : format(end_date!, 'MMMM yyyy')}
                </p>

                <div>
                  <p>{company_name}</p>

                  <p>{location}</p>
                </div>

                <p>{position}</p>
              </div>
            ),
          )}
          <div className="min-h-18"></div>
        </div>
      </div>
    </div>
  )
}
