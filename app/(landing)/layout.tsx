'use client'

import Lenis from 'lenis'
import { Fragment_Mono } from 'next/font/google'
import { useEffect, useState } from 'react'

import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'
import Preloader from '@/components/pre-loader'
import Wrapper from '@/components/wrapper'

const font = Fragment_Mono({
  subsets: ['latin'],
  weight: '400',
})

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (window.innerWidth > 768) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

      return () => {
        lenis.destroy()
      }
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) {
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [isLoaded])
  return (
    <main className={font.className}>
      <Preloader onComplete={() => setIsLoaded(true)} />
      <Wrapper>
        <Navbar />
        {children}
        <Footer />
      </Wrapper>
    </main>
  )
}
