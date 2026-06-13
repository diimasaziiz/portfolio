'use client'

import Link from 'next/link'

import { Profile } from '@/types'

export function ProfileContent({ profile }: { profile: Profile }) {
  const socialMedias = profile.social_links ?? []
  const contacts = [
    { platform: 'email', url: 'mailto:diimasaziiz@gmail.com' },
    ...socialMedias,
    {
      platform: 'resume',
      url: 'https://drive.google.com/file/d/1fN75ZnT4f2CtihVIkVR35YmO9d4G1asV/view',
    },
  ]

  const defineLabel = (platform: string, url: string): string => {
    if (platform === 'resume') return 'download here'
    if (platform === 'email') return url.replace('mailto:', '')
    return url.replace('https://', '').replace('www.', '')
  }

  return (
    <>
      {/* Profile section */}
      <div className="grid grid-cols-[1fr_1.8fr] gap-8 border-x border-dotted border-base-background bg-white p-3">
        {/* Left: name + photo */}
        <div className="flex flex-col gap-6">
          <h1 className="font-serif text-5xl leading-tight font-light md:text-5xl">
            {profile.full_name}
          </h1>
        </div>

        {/* Right: bio */}
        <div className="flex flex-col justify-start gap-6 pt-2">
          <p
            className="text-lg leading-relaxed text-black/80"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            {profile.full_bio}
          </p>
        </div>
      </div>

      {/* Contact rows */}
      <div className="flex flex-col border-x border-dotted border-base-background bg-white">
        {contacts.map(({ platform, url }, index) => (
          <div
            key={index}
            className="group grid grid-cols-[1fr_1.8fr] items-center gap-8 border-dotted border-base-background p-3 transition-colors"
            style={{ borderBottomWidth: index < contacts.length - 1 ? '1px' : 'none' }}
          >
            <span className="font-serif text-4xl font-light text-black md:text-5xl">
              {(platform || '').toLowerCase()}
            </span>
            <Link
              className="w-fit"
              href={url}
              target={url.startsWith('http') || url.startsWith('mailto') ? '_blank' : undefined}
            >
              <span className="font-serif text-base text-black/60 hover:text-black md:text-lg">
                {defineLabel(platform, url)}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
