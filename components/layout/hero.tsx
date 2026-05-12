import Socmed from '@/components/ui/socmed'
import { Profile, Technology } from '@/types'

import { BaseMarqueeTech } from '../base/base-marque-tech'

interface Props {
  profileData: Profile
  technologies: Technology[]
}

function Hero({ profileData, technologies }: Props) {
  return (
    <div className="flex min-h-screen flex-col justify-around pt-20 md:pt-40">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-4">
            <span className="text-lg text-zinc-400 sm:text-xl">Hi,</span>
            <h1 className="mt-2 mb-6 text-4xl font-bold sm:text-6xl">
              I&apos;m {profileData?.full_name} 👋
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-zinc-400 sm:text-xl">
              {profileData?.bio}
            </p>
            <Socmed socialMedias={profileData?.social_links} />
          </div>
        </div>
      </div>
      <BaseMarqueeTech technologies={technologies} />
    </div>
  )
}

export default Hero
