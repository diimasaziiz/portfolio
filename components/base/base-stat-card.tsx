'use client'

import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: number | string
  description?: string
  icon: React.ComponentType<{ className?: string }>
  color?: 'default' | 'secondary' | 'destructive' | 'outline'
  progress?: {
    value: number
    max: number
    label?: string
  }
  lastUpdated?: string // ISO date string
  onViewMore?: () => void
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  color = 'default',
  progress,
  lastUpdated,
  onViewMore,
}: StatCardProps) {
  const [loading, setLoading] = useState(false)

  const handleViewMore = async () => {
    setLoading(true)
    if (onViewMore) {
      await onViewMore()
    }
    setLoading(false)
  }

  return (
    <Card
      className={cn('border', {
        'border-primary': color === 'default',
        'border-muted': color === 'secondary',
        'border-destructive': color === 'destructive',
        border: color === 'outline',
      })}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon
              className={cn('h-5 w-5', {
                'text-primary': color === 'default',
                'text-muted-foreground': color === 'secondary',
                'text-destructive': color === 'destructive',
                'text-foreground': color === 'outline',
              })}
            />
            <div>
              <CardTitle className="text-sm">{title}</CardTitle>
              {description && <CardDescription className="text-xs">{description}</CardDescription>}
            </div>
          </div>
          {onViewMore && (
            <button
              onClick={handleViewMore}
              disabled={loading}
              className={cn('transition-opacity hover:opacity-80', {
                'opacity-50': loading,
              })}
              aria-label={`View more ${title.toLowerCase()}`}
            >
              {loading ? (
                <div className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              ) : (
                <svg
                  className="h-3 w-3 text-foreground/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 pt-0">
        <div className="text-2xl font-bold">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        {progress && (
          <div className="mt-4">
            <Progress value={progress.value} max={progress.max} className="h-1.5" />
            <p className="mt-1 text-center text-xs text-muted-foreground">
              {progress.label || `${progress.value}/${progress.max}`}
            </p>
          </div>
        )}
      </CardContent>

      {lastUpdated && (
        <CardFooter className="pt-2 text-xs text-muted-foreground">
          Updated {formatDistanceToNow(new Date(lastUpdated), { addSuffix: true })}
        </CardFooter>
      )}
    </Card>
  )
}
