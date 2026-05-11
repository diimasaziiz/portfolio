import { FileHeart, MailsIcon } from 'lucide-react'
import { JSX } from 'react'

import { Profile } from '@/types'

import { GitHub } from '../icon/github'
import { Instagram } from '../icon/instagram'
import { LinkedIn } from '../icon/linkedin'
import { Button } from './button'

interface Props {
  socialMedias: Profile['social_links']
}

const iconMap: Record<string, JSX.Element> = {
  github: <GitHub />,
  instagram: <Instagram />,
  linkedin: <LinkedIn />,
}

export default function Socmed({ socialMedias }: Props) {
  return (
    <div className="mt-3 flex">
      <Button variant="ghost" size="lg" className="text-zinc-400">
        <a
          href="mailto:diimasaziiz@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Email"
        >
          <MailsIcon />
        </a>
      </Button>
      {socialMedias.map((sc) => (
        <Button key={sc.icon} variant="ghost" size="lg" className="text-zinc-400">
          <a href={sc.url} target="_blank" rel="noopener noreferrer" aria-label={sc.platform}>
            {iconMap[sc.icon]}
          </a>
        </Button>
      ))}

      <Button variant="ghost" size="lg" className="text-zinc-400">
        <a
          href="https://drive.google.com/file/d/1fN75ZnT4f2CtihVIkVR35YmO9d4G1asV/view"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Curriculum Vitae"
        >
          <FileHeart />
        </a>
      </Button>
    </div>
  )
}
