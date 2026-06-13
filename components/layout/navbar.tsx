'use client'

import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const menus = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/about' },
  { label: 'PROJECTS', href: '/projects' },
]

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col bg-primary"
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-dotted border-base-background px-8 py-4">
        <span className="font-mono text-sm tracking-widest">DIMASABDULAZIZ</span>
        <button onClick={onClose} className="font-mono text-sm tracking-widest">
          CLOSE
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex flex-1 flex-col justify-center">
        {menus.map(({ label, href }, i) => (
          <div
            key={href}
            className="overflow-hidden border-b border-dotted border-base-background px-6"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{
                delay: 0.2 + i * 0.07,
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              <Link
                href={href}
                onClick={onClose}
                className="block py-4 font-serif text-5xl text-black"
              >
                {label}
              </Link>
            </motion.div>
          </div>
        ))}
      </nav>

      {/* Bottom bar */}
      <div className="border-t border-dotted border-base-background px-6 py-4 text-center">
        <span className="font-mono text-sm tracking-widest">MENU</span>
      </div>
    </motion.div>
  )
}

function NavLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="flex-1">
      <Link
        href={href}
        className="relative flex w-fit items-center justify-start"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.p
          className="relative w-fit overflow-hidden px-1 text-sm font-bold tracking-widest"
          animate={{ color: hovered ? 'var(--base-white)' : 'var(--base-background)' }}
          transition={{ duration: 0.15, delay: hovered ? 0.1 : 0 }}
        >
          <motion.span
            aria-hidden
            className="absolute inset-0 bg-black"
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

// Animated MENU ↔ CLOSE toggle
function MenuToggle({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="relative overflow-hidden font-mono text-sm tracking-widest md:hidden"
      style={{ height: '1.2em', minWidth: '3.5rem' }}
    >
      {/* MENU label */}
      <motion.span
        className="absolute inset-0 flex items-center justify-end"
        animate={{ y: isOpen ? '-100%' : '0%', opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
      >
        MENU
      </motion.span>

      {/* CLOSE label */}
      <motion.span
        className="absolute inset-0 flex items-center justify-end"
        animate={{ y: isOpen ? '0%' : '100%', opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
      >
        CLOSE
      </motion.span>
    </button>
  )
}

export default function LayoutNavbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  if (pathname === '/') return null

  return (
    <>
      <div className="sticky top-0 z-10 flex items-center justify-between bg-base-white px-8 py-4">
        {/* Desktop nav */}
        <div className="hidden flex-1 items-center gap-4 md:flex">
          {menus.map(({ label, href }) => (
            <NavLink key={href} label={label} href={href} />
          ))}
        </div>

        {/* Mobile */}
        <span className="font-mono text-sm tracking-widest md:hidden">DIMASABDULAZIZ</span>
        <MenuToggle isOpen={menuOpen} onToggle={() => setMenuOpen((v) => !v)} />
      </div>

      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
