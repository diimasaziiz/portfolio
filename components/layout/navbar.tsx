/* eslint-disable @next/next/no-img-element */
'use client'

import { Menu, X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import Logo from '@/public/assets/logo.png'
import LogoMobile from '@/public/assets/logo-mobile.webp'

import { AnimatedThemeToggler } from '../ui/animated-theme-toggler'

const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const mainNavItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
  ]

  function checkActiveMenu(menuPath: string) {
    if (menuPath === '/') {
      return menuPath === '/' && pathname === '/'
    }

    return (pathname || '').startsWith(menuPath)
  }

  const handleNavClick = (path: string) => {
    router.push(path)
  }

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        isScrolled ? 'py-3' : 'py-5',
      )}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-center justify-between md:justify-center">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="rounded-full bg-white/90 p-2 text-zinc-600 md:hidden dark:bg-zinc-900/90 dark:text-zinc-400"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-1 rounded-full border border-zinc-200 bg-white/90 px-4 py-2 backdrop-blur-sm md:flex dark:border-zinc-800 dark:bg-zinc-900/90">
            {/* Logo */}
            <p
              className="cursor-pointer text-lg font-medium text-zinc-800 dark:text-zinc-200"
              onClick={() => handleNavClick('/')}
            >
              <img src={Logo.src} width={40} alt="Logo" />
            </p>

            {/* Divider */}
            <div className="mx-2 h-5 w-px bg-zinc-300 dark:bg-zinc-700"></div>

            {mainNavItems.map((item) => (
              <p
                key={item.name}
                onClick={() => handleNavClick(item.path)}
                className={cn(
                  'cursor-pointer rounded-md px-4 py-2 text-sm font-bold transition-colors',
                  checkActiveMenu(item.path)
                    ? 'text-primary dark:text-primary'
                    : 'text-zinc-500 hover:text-primary dark:text-zinc-500 dark:hover:text-primary',
                )}
              >
                {item.name}
              </p>
            ))}

            {/* Theme Toggle */}

            <AnimatedThemeToggler className="rounded-full border border-zinc-200 bg-white/90 p-2 text-zinc-600 backdrop-blur-sm transition-colors hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-400 dark:hover:text-zinc-200" />
          </nav>

          {/* Mobile Logo (centered) */}
          <div className="flex items-center md:hidden">
            <p
              className="cursor-pointer text-lg font-medium text-zinc-800 dark:text-zinc-200"
              onClick={() => handleNavClick('/')}
            >
              <img src={LogoMobile.src} width={200} alt="Logo" />
            </p>
          </div>

          <AnimatedThemeToggler className="rounded-full border border-zinc-200 bg-white/90 p-2 text-zinc-600 backdrop-blur-sm transition-colors hover:text-zinc-900 md:hidden dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-400 dark:hover:text-zinc-200" />
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="mt-4 overflow-hidden rounded-lg border border-zinc-200 bg-white/95 shadow-lg backdrop-blur-sm md:hidden dark:border-zinc-800 dark:bg-zinc-900/95"
          >
            <div className="space-y-2 p-2">
              {mainNavItems.map((item) => (
                <p
                  key={item.name}
                  onClick={() => {
                    handleNavClick(item.path)
                    setIsMobileMenuOpen(false)
                  }}
                  className={cn(
                    'flex cursor-pointer items-center rounded-md px-4 py-3 text-sm font-bold transition-colors',
                    checkActiveMenu(item.path)
                      ? 'bg-zinc-100 text-primary dark:bg-zinc-800 dark:text-primary'
                      : 'text-zinc-500 hover:bg-zinc-100 hover:text-primary dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-primary',
                  )}
                >
                  {item.name}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
