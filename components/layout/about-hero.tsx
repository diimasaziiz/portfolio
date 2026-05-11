/* eslint-disable @next/next/no-img-element */
'use client'

import MDEditor from '@uiw/react-md-editor'

import { ShinyButton } from '@/components/ui/shiny-button'
import Socmed from '@/components/ui/socmed'
import Avatar from '@/public/assets/avatar.webp'
import { Profile } from '@/types'

const yearNow = new Date().getFullYear()
const yearExperience = yearNow - 2022

interface Props {
  profileData: Profile
}

function AboutHero({ profileData }: Props) {
  return (
    <section className="relative flex h-fit pt-20">
      <div className="container mx-auto flex h-fit flex-1 flex-col justify-evenly px-4 py-6">
        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="mx-auto text-6xl font-bold lg:text-7xl">
              {yearExperience} Years In Still Just{' '}
              <span className="text-primary">Getting Started</span>
            </h2>
            <div className="mt-3">
              <ShinyButton className="rounded-full bg-white/90 px-3.5 py-3 dark:bg-zinc-900/90">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-primary">
                    <img
                      src={Avatar.src}
                      alt="Irsyaad Budi Prasetianto"
                      className="h-full w-full rounded-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p className="mr-1 text-lg capitalize">{profileData.full_name}</p>
                </div>
              </ShinyButton>
            </div>
          </div>
          <div className="flex flex-col gap-4 text-lg sm:text-xl">
            <p>
              <b>{profileData.job_title}</b>
            </p>
            <MDEditor.Markdown
              source={profileData.full_bio}
              style={{
                backgroundColor: 'transparent',
                whiteSpace: 'pre-wrap',
                color: '#9f9fa9',
                fontFamily: 'inherit',
              }}
            />
            <Socmed socialMedias={profileData.social_links} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutHero
