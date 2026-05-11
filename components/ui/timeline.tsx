/* eslint-disable @next/next/no-img-element */
'use client'

import MDEditor from '@uiw/react-md-editor'
import { format } from 'date-fns'

import { Experience } from '@/types'

export default function Timeline({ items }: { items: Experience[] }) {
  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <TimelineItem key={index} {...item} />
      ))}
    </div>
  )
}

const TimelineItem = ({
  position,
  company_logo_url,
  company_url,
  company_name,
  is_current,
  start_date,
  end_date,
  location,
  description,
}: Experience) => {
  return (
    <div className="group/timeline flex gap-4 xl:gap-8">
      <div className="flex flex-col items-center">
        <div className="h-2 w-2 rounded-full bg-foreground dark:bg-white"></div>
        <div className="-mt-1 w-[0.1px] flex-1 rounded-full bg-foreground/30 transition-all duration-700 dark:bg-white"></div>
      </div>
      <div>
        <div className="pb-2">
          <p className="text-lg font-bold">{position}</p>
          <div className="mt-1 flex flex-col gap-2 text-sm xl:flex-row xl:items-center">
            <a
              href={company_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-zinc-500 underline dark:text-zinc-300"
            >
              <img
                src={company_logo_url}
                alt={company_name}
                style={{
                  height: '16px',
                  width: 'auto',
                }}
                loading="lazy"
                draggable={false}
              />
              {company_name}
            </a>
            <div className="hidden h-[0.2px] w-3 rounded-full bg-foreground xl:block dark:bg-white"></div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="text-zinc-400">
                {format(start_date, 'dd MMMM yyyy')} -{' '}
                {is_current ? 'Present' : format(end_date!, 'dd MMMM yyyy')}
              </div>
              <div className="h-[0.2px] w-3 rounded-full bg-foreground dark:bg-white"></div>
              <div className="text-zinc-400">{location}</div>
            </div>
          </div>
          <div className="mt-3 leading-relaxed text-zinc-400">
            <MDEditor.Markdown
              source={description}
              style={{
                backgroundColor: 'transparent',
                whiteSpace: 'pre-wrap',
                color: 'inherit',
                fontFamily: 'inherit',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
