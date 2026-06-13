import { Technology } from '@/types'

/**
 * SETUP LOCAL INTERFACE
 */
interface Props {
  technologies: Technology[]
}

export function SkillsetContent({ technologies = [] }: Props) {
  function formatIndex(index: number): string {
    return String(index + 1).padStart(2, '0')
  }

  return (
    <div className="flex flex-col border-x border-dotted border-base-background bg-primary">
      <div className="flex items-center gap-8 border-b border-dotted border-base-background p-3 transition-colors">
        <span className="text-4xl text-black md:text-5xl">Tech Stack</span>
      </div>
      {technologies.map(({ name }, index) => (
        <div
          key={index}
          className="flex items-center gap-12 border-dotted border-base-background p-3 transition-colors"
          style={{ borderBottomWidth: index < technologies.length - 1 ? '1px' : 'none' }}
        >
          <span className="text-4xl text-black md:text-5xl">{formatIndex(index)}</span>
          <span className="text-4xl text-black md:text-5xl">{name || ''}</span>
        </div>
      ))}
    </div>
  )
}
