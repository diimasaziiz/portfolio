'use client'

import { format } from 'date-fns'
import { CopyrightIcon } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { Profile } from '@/types'

function NavLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="flex-1">
      <Link
        href={href}
        className="relative flex w-fit items-center justify-start"
        target="_blank"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.p
          className="relative w-fit overflow-hidden px-1 text-sm font-bold tracking-widest"
          animate={{ color: hovered ? 'var(--base-background)' : 'var(--base-white)' }}
          transition={{ duration: 0.15, delay: hovered ? 0.1 : 0 }}
        >
          <motion.span
            aria-hidden
            className="absolute inset-0 bg-base-white"
            initial={{ y: '100%' }}
            animate={{ y: hovered ? '0%' : '100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <span className="relative z-10">{label}</span>
        </motion.p>
      </Link>
    </div>
  )
}

export default function LayoutFooter({
  socialMedias = [],
}: {
  socialMedias: Profile['social_links']
}) {
  const ref = useRef<HTMLParagraphElement>(null)

  const rawSocialMedias = socialMedias ?? []
  const contacts = [
    { platform: 'email', url: 'mailto:diimasaziiz@gmail.com' },
    ...rawSocialMedias,
    {
      platform: 'resume',
      url: 'https://drive.google.com/file/d/1fN75ZnT4f2CtihVIkVR35YmO9d4G1asV/view',
    },
  ]

  useEffect(() => {
    const resize = () => {
      const el = ref.current
      if (!el) return
      const parent = el.parentElement!
      el.style.fontSize = '5rem' // reset to base
      const scale = parent.offsetWidth / el.scrollWidth
      el.style.fontSize = `${parseFloat(getComputedStyle(el).fontSize) * scale}px`
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <footer className="px-8 py-6">
      <div className="flex flex-col gap-3 md:flex-row [&_p]:flex-1 [&_p]:text-left [&_p]:text-xs [&_p]:tracking-widest [&_p]:md:text-center">
        {contacts.map((sc, i) => (
          <NavLink label={sc.platform.toUpperCase()} href={sc.url} key={i} />
        ))}
      </div>

      <div className="overflow-hidden">
        <p
          ref={ref}
          className="inline-block leading-none font-semibold tracking-tighter whitespace-nowrap"
          style={{ fontSize: '5rem', color: 'oklch(45% 0 0)' }}
        >
          DIMASABDULAZIZ
        </p>
      </div>

      <div
        className="flex items-center justify-start gap-2 text-xs text-muted"
        style={{ color: 'oklch(45% 0 0)' }}
      >
        <CopyrightIcon size={10} />
        <p>{format(new Date(), 'yyyy')} SANDEKALA. All rights reserved.</p>
      </div>
    </footer>
  )
}
