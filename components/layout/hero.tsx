'use client'

import { motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

const CELL_SIZE = 52
const GAP = 1

interface Cell {
  id: string
  row: number
  col: number
}

export function LayoutHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const [cells, setCells] = useState<Cell[]>([])
  const [cols, setCols] = useState(0)

  const recalculate = useCallback((width: number, height: number) => {
    // 🔥 make grid square so rotation forms a perfect diamond
    const size = Math.min(width, height)

    const numCols = Math.floor((size + GAP) / (CELL_SIZE + GAP))
    const numRows = numCols // 👈 important: square grid

    if (numCols <= 0 || numRows <= 0) return

    setCols(numCols)

    const newCells: Cell[] = []
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        newCells.push({ id: `${r}-${c}`, row: r, col: c })
      }
    }

    setCells(newCells)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        recalculate(width - 150, height - 150)
      }
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [recalculate])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: cols > 0 ? `repeat(${cols}, ${CELL_SIZE}px)` : 'none',
          gap: `${GAP}px`,
          transform: 'rotate(45deg)',
          transformOrigin: 'center center',
          position: 'absolute',
        }}
      >
        {cells.map((cell) => {
          // Calculate distance from center for staggered animation
          const centerRow = cols / 2
          const centerCol = cols / 2
          const distance = Math.sqrt(
            Math.pow(cell.row - centerRow, 2) + Math.pow(cell.col - centerCol, 2),
          )

          return (
            <motion.div
              key={cell.id}
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                backgroundColor: '#555555',
              }}
              whileHover={{
                backgroundColor: '#f5f5f5',
                transition: { duration: 0.2 },
              }}
              transition={{
                opacity: { duration: 0.3, delay: distance * 0.02 },
                scale: { duration: 0.3, delay: distance * 0.02 },
                backgroundColor: { duration: 0.6 },
              }}
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'crosshair',
                borderRadius: '4px',
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
