import { format } from 'date-fns'
import { CopyrightIcon } from 'lucide-react'

export default function Footer() {
  return (
    <div className="mx-auto flex items-center justify-center gap-2 py-4 text-xs">
      <CopyrightIcon size={10} />
      <p> {format(new Date(), 'yyyy')} Sandekala. All rights reserved.</p>
    </div>
  )
}
