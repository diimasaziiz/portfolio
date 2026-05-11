import { Fragment_Mono } from 'next/font/google'

import Navbar from '@/components/layout/navbar'
import Wrapper from '@/components/wrapper'

const font = Fragment_Mono({
  subsets: ['latin'],
  weight: '400',
})

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={font.className}>
      <Wrapper>
        <Navbar />
        {children}
      </Wrapper>
    </main>
  )
}
