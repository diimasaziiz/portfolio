'use client'

import { useEffect, useRef, useState } from 'react'

import { ExperienceContent } from '@/components/about/experience-content'
import { SkillsetContent } from '@/components/about/skillset-content'
import { Experience, Profile, Technology } from '@/types'

import BasePaper from '../base/base-paper'
import { ProfileContent } from './profile-content'

interface Props {
  profile: Profile
  experiences: Experience[]
  technologies: Technology[]
}

export function DiaryInteraction({ profile, experiences, technologies }: Props) {
  const [state, setState] = useState<'initial' | 'showSkillset' | 'showExperience'>('initial')
  const [minHeight, setMinHeight] = useState(0)

  const experienceRef = useRef<HTMLDivElement>(null)
  const skillsetRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const Y_OFFSETS = { experience: 0, skillset: 106, profile: 212 }

  useEffect(() => {
    const refs = [
      { ref: experienceRef, offset: Y_OFFSETS.experience },
      { ref: skillsetRef, offset: Y_OFFSETS.skillset },
      { ref: profileRef, offset: Y_OFFSETS.profile },
    ]

    const updateHeight = () => {
      const total = Math.max(
        ...refs.map(({ ref, offset }) => (ref.current?.offsetHeight ?? 0) + offset),
      )
      setMinHeight(total)
    }

    const observers = refs.map(({ ref }) => {
      const observer = new ResizeObserver(updateHeight)
      if (ref.current) observer.observe(ref.current)
      return observer
    })

    updateHeight()

    return () => observers.forEach((o) => o.disconnect())
  }, [Y_OFFSETS.experience, Y_OFFSETS.profile, Y_OFFSETS.skillset])

  const paperPositions = {
    initial: {
      profile: { x: '0', y: Y_OFFSETS.profile },
      skillset: { x: '0', y: Y_OFFSETS.skillset },
      experience: { x: '0', y: Y_OFFSETS.experience },
    },
    showSkillset: {
      profile: { x: 'calc(100vw - 78px)', y: Y_OFFSETS.profile },
      skillset: { x: '0', y: Y_OFFSETS.skillset },
      experience: { x: '0', y: Y_OFFSETS.experience },
    },
    showExperience: {
      profile: { x: 'calc(100vw - 78px)', y: Y_OFFSETS.profile },
      skillset: { x: 'calc(100vw - 78px)', y: Y_OFFSETS.skillset },
      experience: { x: '0', y: Y_OFFSETS.experience },
    },
  }

  const positions = paperPositions[state]

  return (
    <div className="relative w-full transition-all duration-300" style={{ minHeight }}>
      <div ref={experienceRef} className="pointer-events-none invisible absolute w-fit">
        {/* ghost for measuring */}
      </div>

      <BasePaper
        ref={experienceRef}
        isFront={false}
        onClick={() => setState('showExperience')}
        animateProps={positions.experience}
        bgColor="default"
        section="EXPERIENCES"
        size="large"
      >
        <ExperienceContent experiences={experiences} />
      </BasePaper>

      <BasePaper
        ref={skillsetRef}
        isFront={state !== 'initial'}
        onClick={() => setState('showSkillset')}
        animateProps={positions.skillset}
        bgColor="primary"
        section="SKILLSETS"
        size="small"
      >
        <SkillsetContent technologies={technologies} />
      </BasePaper>

      <BasePaper
        ref={profileRef}
        isFront={true}
        onClick={() => {
          if (state !== 'initial') setState('initial')
        }}
        animateProps={positions.profile}
        size="medium"
        bgColor="white"
        section="PROFILE"
      >
        <ProfileContent profile={profile} />
      </BasePaper>
    </div>
  )
}
