import { Fragment_Mono } from 'next/font/google'

import LayoutMain from '@/components/layout/main'
import LayoutNavbar from '@/components/layout/navbar'
const font = Fragment_Mono({
  subsets: ['latin'],
  weight: '400',
})

export default async function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={font.className}>
      <div className="relative" style={{ zIndex: 1 }}>
        <LayoutNavbar />
        {children}
      </div>
      <LayoutMain />
    </main>
  )
}
