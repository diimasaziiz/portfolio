import { ActivityIcon, FolderRoot, House, Settings, User } from 'lucide-react'

export const MENU = [
  {
    label: 'Main',
    items: [
      {
        title: 'Home',
        icon: House,
        href: '/dashboard',
      },
    ],
  },
  {
    label: 'Settings',
    items: [
      {
        title: 'Profile',
        icon: User,
        href: '/dashboard/profile',
      },
      {
        title: 'Experience',
        icon: ActivityIcon,
        href: '/dashboard/experiences',
      },
      {
        title: 'Projects',
        icon: FolderRoot,
        href: '/dashboard/projects',
      },
    ],
  },
  {
    label: 'Master Data',
    items: [
      {
        title: 'Technologies',
        icon: Settings,
        href: '/dashboard/technologies',
      },
    ],
  },
]
