'use client'

import { motion } from 'motion/react'
import { forwardRef } from 'react'

import Hole from '../ui/hole'

/**
 * SETUP LOCAL INTERFACE
 */
interface Props {
  children: React.ReactNode
  section: string
  size: keyof typeof sizes
  bgColor: keyof typeof bgColors
  isFront: boolean
  onClick: () => void
  animateProps: { x: string; y: number }
}

const sizes = {
  small: 'max-w-166.25',
  medium: 'max-w-220',
  large: 'max-w-360',
}
const bgColors = {
  white: 'bg-white',
  primary: 'bg-primary',
  default: 'bg-muted-foreground',
}

const BasePaper = forwardRef<HTMLDivElement, Props>(function BasePaper(
  { children, section, bgColor, size, animateProps, isFront, onClick },
  ref,
) {
  /**
   * SETUP STATE
   */
  const sizeClass = sizes[size]
  const bgColorClass = bgColors[bgColor]

  return (
    <motion.div
      ref={ref}
      className="w-fit cursor-pointer"
      animate={{
        x: animateProps.x,
        y: animateProps.y,
      }}
      style={{
        zIndex: isFront ? 3 : 1,
        position: 'absolute',
      }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 1.2 }}
      whileHover={{ y: animateProps.y - 20 }}
      onClick={onClick}
    >
      <div className={`relative w-full bg-transparent ${sizeClass}`}>
        <div className="relative overflow-hidden rounded-md bg-transparent px-8">
          {/* Left side */}
          <div className="absolute top-0 left-0 flex h-full w-8 flex-col justify-between">
            <div className="h-8.25 border-b border-dotted border-base-background">
              <Hole fill={bgColor} />
            </div>
            <div className={`flex-1 ${bgColorClass}`}></div>
            <Hole fill={bgColor} />
            <div className={`flex-1 ${bgColorClass}`}></div>
            <Hole fill={bgColor} />
            <div className={`flex-1 ${bgColorClass}`}></div>
            <Hole fill={bgColor} />
            <div className={`flex-1 ${bgColorClass}`}></div>
            <div className="h-8.25 border-t border-dotted border-base-background">
              <Hole fill={bgColor} />
            </div>
          </div>

          {/* Right side */}
          <div
            className={`absolute top-0 right-0 flex h-full w-8 flex-col justify-between ${bgColorClass}`}
          >
            <div className="h-8.25 border-b border-dotted border-base-background p-2"></div>
            <div className="h-8.25 border-t border-dotted border-base-background p-2"></div>
          </div>

          {/* Top label */}
          <div
            className={`flex items-center justify-between border-x border-b border-dotted border-base-background ${bgColorClass} p-2`}
          >
            <span className="h-2 w-2 bg-black" />
            <span className="font-mono text-xs tracking-widest">{section}</span>
            <span className="h-2 w-2 bg-black" />
          </div>

          {/* Body */}
          {children}

          {/* Bottom label */}
          <div
            className={`flex items-center justify-between border-x border-t border-dotted border-base-background ${bgColorClass} p-2`}
          >
            <span className="h-2 w-2 bg-black" />
            <span className="font-mono text-xs tracking-widest">{section}</span>
            <span className="h-2 w-2 bg-black" />
          </div>
        </div>
      </div>
    </motion.div>
  )
})

export default BasePaper
