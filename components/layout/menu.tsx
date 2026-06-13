import Link from 'next/link'

export default function LayoutMenu() {
  const menus = [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT', href: '/about' },
    { label: 'PROJECTS', href: '/projects' },
  ]

  return (
    <div className="flex flex-col items-start justify-center gap-4 px-8 py-6 md:flex-row md:items-center">
      {menus.map(({ label, href }, index) => (
        <Link
          className="flex items-center justify-center gap-4 transition-colors duration-300 hover:text-muted"
          key={index}
          href={href}
        >
          <p className="text-sm">{`0${index + 1}`}</p>
          <p className="text-5xl">{label}</p>
        </Link>
      ))}
    </div>
  )
}
