import './globals.css'

import { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { generateMetadata } from '@/lib/seo'
import { cn } from '@/lib/utils'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = generateMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn('antialiased', fontMono.variable, 'font-sans', geist.variable)}
    >
      <head>
        <link rel="canonical" href="https://diimasaziiz.bersuadiantara.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </head>
      <body>
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
