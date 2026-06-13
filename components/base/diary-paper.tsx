'use client'

import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

interface DiaryPaperProps {
  className?: string
  children: React.ReactNode
  backgroundColor: string
  width?: 'full' | 'medium' | 'small'
  isFront: boolean
  onClick: () => void
  animateProps: { x: number; y: number }
}

export function DiaryPaper({
  className,
  children,
  backgroundColor,
  width = 'full',
  isFront = false,
  onClick,
  animateProps,
}: DiaryPaperProps) {
  const widthClasses = {
    full: 'w-full',
    medium: 'w-[80%]',
    small: 'w-[60%]',
  }

  return (
    <motion.div
      className={cn(
        'relative cursor-pointer overflow-hidden rounded-lg shadow-lg',
        widthClasses[width],
        className,
      )}
      style={{
        backgroundColor,
        left: `${animateProps.x}%`,
        y: animateProps.y,
        zIndex: isFront ? 3 : 1,
        position: 'absolute', // Changed to absolute to allow stacking
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      whileHover={{ y: animateProps.y - 10 }}
      onClick={onClick}
    >
      {/* Ring binder holes */}
      <div className="pointer-events-none absolute top-0 left-3 h-full w-4">
        <div className="flex h-full flex-col justify-around py-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-3 w-3 rounded-full border border-gray-300 bg-transparent" />
          ))}
        </div>
      </div>

      {/* Dotted lines background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(transparent 98%, #ccc 2%)`,
          backgroundSize: '100% 24px',
        }}
      />

      {/* Paper texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C9C9C' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative p-6 pl-12">{children}</div>
    </motion.div>
  )
}
