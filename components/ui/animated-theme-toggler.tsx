'use client'

import { MoonIcon, SunDimIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

export const AnimatedThemeToggler = ({ className }: Props) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const { resolvedTheme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])

  if (!mounted) return <button className={cn(className, 'size-10.5')} />

  const isDarkMode = resolvedTheme === 'dark'

  const changeTheme = async () => {
    if (!buttonRef.current) return

    const nextTheme = isDarkMode ? 'light' : 'dark'

    // fallback for unsupported browsers
    if (!document.startViewTransition) {
      setTheme(nextTheme)
      return
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme)
      })
    }).ready

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect()

    const y = top + height / 2
    const x = left + width / 2

    const right = window.innerWidth - left
    const bottom = window.innerHeight - top

    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom))

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRad}px at ${x}px ${y}px)`],
      },
      {
        duration: 700,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      },
    )
  }

  return (
    <button
      ref={buttonRef}
      onClick={() => changeTheme()}
      aria-label="Toggle theme"
      className={cn(className)}
    >
      {isDarkMode ? <SunDimIcon /> : <MoonIcon />}
    </button>
  )
}
