'use client'

import clsx from 'clsx'
import { ReactNode } from 'react'

interface WrapperProps {
  children: ReactNode
  className?: string
}

export default function Wrapper({ children, className }: WrapperProps) {
  return (
    <div
      className={clsx(
        'relative min-h-screen overflow-hidden',
        // softer light mode
        'bg-[#f3f1f8] text-black',
        // dark mode
        'dark:bg-[#050510] dark:text-white',
        className,
      )}
    >
      {/* SOFT RADIAL BACKGROUND */}
      <div className="absolute inset-0">
        {/* top glow */}
        <div className="absolute top-[-15%] left-[-10%] h-[500px] w-[500px] rounded-full bg-[#5d0ec0]/10 blur-3xl dark:bg-[#5d0ec0]/20" />

        {/* bottom glow */}
        <div className="absolute right-[-10%] bottom-[-20%] h-[500px] w-[500px] rounded-full bg-violet-400/10 blur-3xl dark:bg-violet-500/20" />

        {/* center subtle glow */}
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5d0ec0]/5 blur-3xl dark:bg-[#5d0ec0]/10" />
      </div>

      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(93,14,192,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(93,14,192,0.04)_1px,transparent_1px)] bg-[size:72px_72px] dark:bg-[linear-gradient(to_right,rgba(93,14,192,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(93,14,192,0.08)_1px,transparent_1px)]" />

      {/* CIRCUIT SVG */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="opacity-[0.12] dark:opacity-[0.24]">
          {/* LEFT TOP */}
          <path d="M0 180H240L320 100H540" stroke="#5d0ec0" strokeWidth="2" />

          <path d="M0 320H180L260 240H440" stroke="#7c3aed" strokeWidth="2" />

          {/* LEFT BOTTOM */}
          <path d="M0 760H260L340 840H620" stroke="#5d0ec0" strokeWidth="2" />

          {/* RIGHT TOP */}
          <path d="M1920 220H1680L1580 120H1380" stroke="#7c3aed" strokeWidth="2" />

          {/* RIGHT MID */}
          <path d="M1920 520H1700L1600 620H1340" stroke="#5d0ec0" strokeWidth="2" />

          {/* RIGHT BOTTOM */}
          <path d="M1920 880H1620L1500 760H1240" stroke="#7c3aed" strokeWidth="2" />

          {/* DOTS */}
          <circle cx="320" cy="100" r="4" fill="#5d0ec0" />
          <circle cx="1580" cy="120" r="4" fill="#7c3aed" />
          <circle cx="340" cy="840" r="4" fill="#5d0ec0" />
          <circle cx="1500" cy="760" r="4" fill="#7c3aed" />

          {/* SMALL DETAILS */}
          <rect x="720" y="180" width="8" height="8" fill="#5d0ec0" />

          <rect x="1220" y="720" width="8" height="8" fill="#7c3aed" />

          <path d="M840 200H900" stroke="#5d0ec0" strokeWidth="3" strokeDasharray="8 8" />

          <path d="M1280 840H1340" stroke="#7c3aed" strokeWidth="3" strokeDasharray="8 8" />
        </g>
      </svg>

      {/* SOFT NOISE */}
      <div className="pointer-events-none absolute inset-0 [background-image:url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.025]" />

      {/* VIGNETTE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.03)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)]" />

      {/* CONTENT */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
