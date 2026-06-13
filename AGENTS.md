# Portfolio Project - AI Agent Documentation

This document provides comprehensive information about the portfolio project structure, conventions, and patterns for AI assistants.

## Project Overview

**Type**: Full-stack portfolio website with public landing pages and authenticated admin dashboard  
**Framework**: Next.js 16.2.4 (App Router with Turbopack)  
**Language**: TypeScript 5.9.3 (strict mode)  
**Styling**: Tailwind CSS v4 with OKLCH color space  
**Backend**: Supabase (PostgreSQL + Auth + Storage)  
**Package Manager**: Yarn

## Tech Stack

### Core Framework
- **Next.js 16.2.4** - App Router with Turbopack for development
- **React 19.2.4** - Latest React with Server Components
- **TypeScript 5.9.3** - Strict mode enabled

### UI & Styling
- **Tailwind CSS 4.2.1** - Using new v4 with PostCSS plugin
- **shadcn/ui** - base-nova style variant with @base-ui/react
- **Lucide React** - Icon library
- **class-variance-authority** - Component variants
- **clsx** + **tailwind-merge** - Conditional class names
- **next-themes** - Dark mode support
- **Motion** (Framer Motion v12) - Animations
- **Lenis** - Smooth scrolling (desktop only)

### Forms & Validation
- **react-hook-form** - Form state management
- **@hookform/resolvers** - Form validation resolvers
- **Zod** - Schema validation

### Data & State
- **SWR** - Client-side data fetching and caching
- **@tanstack/react-table** - Table components
- **Supabase** (@supabase/ssr, @supabase/supabase-js) - Backend services

### Content & Utilities
- **@uiw/react-md-editor** - Markdown editing
- **dompurify** - HTML sanitization
- **date-fns** - Date formatting
- **react-day-picker** - Date selection
- **remeda** - Functional utilities
- **sonner** - Toast notifications

## Directory Structure

```
portfolio/
├── app/                          # Next.js App Router
│   ├── (landing)/               # Public landing pages (route group)
│   │   ├── about/               # About page
│   │   ├── projects/            # Projects listing
│   │   │   └── [id]/           # Dynamic project detail page
│   │   ├── layout.tsx          # Landing layout with Lenis smooth scroll
│   │   └── page.tsx            # Homepage
│   ├── auth/                    # Authentication routes
│   │   ├── callback/           # OAuth callback handler
│   │   ├── error/              # Auth error page
│   │   └── login/              # Login page
│   ├── dashboard/               # Protected admin dashboard
│   │   ├── experiences/        # Manage work experiences
│   │   ├── profile/            # Manage profile
│   │   ├── projects/           # Manage projects
│   │   ├── technologies/       # Manage tech stack
│   │   ├── layout.tsx          # Dashboard layout with sidebar
│   │   └── page.tsx            # Dashboard home
│   ├── globals.css             # Global styles with Tailwind v4
│   ├── layout.tsx              # Root layout
│   ├── robots.ts               # Robots.txt generation
│   └── sitemap.ts              # Sitemap generation
├── components/
│   ├── base/                    # Reusable base components
│   │   ├── base-table.tsx      # TanStack Table wrapper
│   │   ├── base-md-editor.tsx  # Markdown editor wrapper
│   │   └── base-structured-data.tsx # JSON-LD structured data
│   ├── form/                    # Form components
│   ├── icon/                    # Custom icon components
│   │   ├── github.tsx
│   │   ├── linkedin.tsx
│   │   └── instagram.tsx
│   ├── layout/                  # Layout components
│   ├── ui/                      # shadcn/ui components (38 components)
│   │   ├── button.tsx
│   │   ├── sidebar.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── table.tsx
│   │   ├── calendar.tsx
│   │   ├── combobox.tsx
│   │   └── ... (31 more)
│   ├── theme-provider.tsx      # Theme context provider
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser Supabase client
│   │   ├── server.ts           # Server Supabase client
│   │   └── proxy.ts            # Supabase proxy
│   ├── utils.ts                # cn() utility function
│   └── seo.ts                  # SEO metadata generators
├── hooks/
│   └── use-mobile.ts           # Mobile breakpoint hook (768px)
├── types/
│   └── index.ts                # TypeScript interfaces (Profile, Project, Experience, Technology)
├── constants/
│   └── index.ts                # Constants (MENU, etc.)
└── public/                      # Static assets
```

## Code Conventions

### Component Structure

Components follow a consistent structure with comment sections:

```typescript
'use client' // If client component

import statements...

interface/type definitions...

export function ComponentName() {
  /**
   * SETUP HOOKS
   */
  const hook1 = useHook1()
  
  /**
   * SETUP STATE
   */
  const [state, setState] = useState()
  
  /**
   * SETUP FUNCTIONS
   */
  const handleSomething = () => {}
  
  /**
   * SETUP EFFECTS
   */
  useEffect(() => {}, [])
  
  return (
    // JSX
  )
}
```

### Naming Conventions

- **Components**: PascalCase (e.g., `FormProfile`, `BaseTable`)
- **Files**: kebab-case (e.g., `form-profile.tsx`, `base-table.tsx`)
- **Functions**: camelCase (e.g., `createClient`, `generateMetadata`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MENU`, `DEFAULT_SEO_CONFIG`)
- **Interfaces/Types**: PascalCase (e.g., `Profile`, `Project`)

### Import Patterns

- Use absolute imports with `@/` prefix
- Imports are auto-sorted by `simple-import-sort` ESLint plugin
- Path aliases configured:
  - `@/components` → components/
  - `@/lib` → lib/
  - `@/hooks` → hooks/
  - `@/ui` → components/ui/
  - `@/utils` → lib/utils
  - `@/types` → types/
  - `@/constants` → constants/

Example import order:
```typescript
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/ui/button'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import type { Profile } from '@/types'
```

### Styling Approach

- **Tailwind CSS v4** with OKLCH color space
- Custom CSS variables for theming (defined in globals.css)
- Dark mode via `next-themes` with class-based strategy
- Use `cn()` utility for conditional classes:
  ```typescript
  import { cn } from '@/lib/utils'
  
  <div className={cn('base-class', condition && 'conditional-class')} />
  ```
- Component variants with CVA:
  ```typescript
  import { cva } from 'class-variance-authority'
  
  const variants = cva('base', {
    variants: {
      variant: {
        default: 'default-styles',
        outline: 'outline-styles'
      }
    }
  })
  ```

### TypeScript Patterns

- Strict mode enabled
- Interfaces for data models (see types/index.ts)
- Zod schemas for form validation
- Type-safe component props:
  ```typescript
  interface ComponentProps {
    title: string
    optional?: boolean
  }
  
  export function Component({ title, optional }: ComponentProps) {}
  ```

### Code Style Rules

- **NO COMMENTS** unless explicitly requested
- No semicolons (Prettier config)
- Single quotes
- 2-space indentation
- Trailing commas
- 100 character line width
- Use `'use client'` directive for client components
- Server Components by default

## Development Commands

```bash
# Development
yarn dev              # Start dev server with Turbopack

# Build
yarn build            # Production build
yarn start            # Start production server

# Code Quality
yarn lint             # Run ESLint
yarn format           # Format with Prettier
yarn typecheck        # TypeScript type checking
```

**IMPORTANT**: Always run `yarn lint` and `yarn typecheck` after making changes to ensure code quality.

## Data Models

### Profile
```typescript
interface Profile {
  id: string
  name: string
  bio: string
  avatar_url: string
  cv_url: string
  github_url: string
  linkedin_url: string
  instagram_url: string
  created_at: string
  updated_at: string
}
```

### Project
```typescript
interface Project {
  id: string
  title: string
  description: string
  content: string
  image_url: string
  demo_url: string
  github_url: string
  tech_stack: string[]
  is_featured: boolean
  created_at: string
  updated_at: string
}
```

### Experience
```typescript
interface Experience {
  id: string
  company: string
  position: string
  description: string
  start_date: string
  end_date: string | null
  is_current: boolean
  created_at: string
  updated_at: string
}
```

### Technology
```typescript
interface Technology {
  id: string
  name: string
  icon_url: string
  category: string
  created_at: string
  updated_at: string
}
```

## Common Patterns

### Supabase Client Usage

**Browser/Client Components**:
```typescript
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()
const { data, error } = await supabase.from('projects').select('*')
```

**Server Components/Actions**:
```typescript
import { createClient } from '@/lib/supabase/server'

const supabase = await createClient()
const { data, error } = await supabase.from('projects').select('*')
```

### Data Fetching Patterns

**Server-Side (Page Components)**:
```typescript
export default async function Page() {
  const supabase = await createClient()
  const { data: projects } = await supabase.from('projects').select('*')
  
  return <div>{/* render projects */}</div>
}
```

**Client-Side with SWR**:
```typescript
'use client'

import useSWR from 'swr'
import { createClient } from '@/lib/supabase/client'

const fetcher = async () => {
  const supabase = createClient()
  const { data } = await supabase.from('projects').select('*')
  return data
}

export function Component() {
  const { data, error, mutate } = useSWR('projects', fetcher)
  
  return <div>{/* render data */}</div>
}
```

### Authentication Patterns

**Check Auth Status**:
```typescript
const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()

if (!user) {
  redirect('/auth/login')
}
```

**Protected Routes**: Dashboard routes automatically check auth in layout.tsx

### Form Patterns

All forms use react-hook-form + Zod validation:

```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required')
})

type FormData = z.infer<typeof schema>

export function FormComponent() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', description: '' }
  })
  
  const onSubmit = async (data: FormData) => {
    // Handle submission
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* form fields */}
      </form>
    </Form>
  )
}
```

### SEO Patterns

**Page Metadata**:
```typescript
import { generateMetadata as generateSEO } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEO({
    title: 'Page Title',
    description: 'Page description',
    path: '/page-path'
  })
}
```

**Structured Data**:
```typescript
import { BaseStructuredData } from '@/components/base/base-structured-data'

<BaseStructuredData type="Person" data={{
  name: profile.name,
  url: 'https://yoursite.com',
  sameAs: [profile.github_url, profile.linkedin_url]
}} />
```

## Routing Structure

### Public Routes (Landing)
- `/` - Homepage with hero, featured projects, tech stack
- `/about` - About page with bio and experience timeline
- `/projects` - Projects listing page
- `/projects/[id]` - Individual project detail page

### Auth Routes
- `/auth/login` - Login page (Supabase Auth UI)
- `/auth/callback` - OAuth callback handler
- `/auth/error` - Auth error page

### Protected Routes (Dashboard)
- `/dashboard` - Dashboard home
- `/dashboard/profile` - Edit profile
- `/dashboard/projects` - Manage projects (CRUD)
- `/dashboard/experiences` - Manage experiences (CRUD)
- `/dashboard/technologies` - Manage tech stack (CRUD)

## Key Files Reference

### Configuration Files
- `next.config.mjs` - Next.js config with Turbopack
- `tsconfig.json` - TypeScript config with path aliases
- `eslint.config.mjs` - ESLint config
- `.prettierrc` - Prettier config
- `components.json` - shadcn/ui config
- `postcss.config.mjs` - PostCSS config for Tailwind v4

### Core Application Files
- `app/layout.tsx` - Root layout with theme provider
- `app/globals.css` - Global styles, CSS variables, Tailwind directives
- `lib/supabase/client.ts` - Browser Supabase client
- `lib/supabase/server.ts` - Server Supabase client
- `lib/utils.ts` - cn() utility function
- `lib/seo.ts` - SEO metadata generators
- `types/index.ts` - All TypeScript interfaces
- `constants/index.ts` - App constants (menu items, etc.)

### Important Components
- `components/theme-provider.tsx` - Dark mode provider
- `components/base/base-table.tsx` - Reusable table component
- `components/base/base-md-editor.tsx` - Markdown editor wrapper

## Common Workflows

### Adding a New Feature
1. Check existing patterns in similar features
2. Create necessary types in `types/index.ts` if needed
3. Create components following naming conventions
4. Use existing UI components from `components/ui/`
5. Follow the component structure pattern (SETUP sections)
6. Run `yarn lint` and `yarn typecheck` before committing

### Adding a New Page
1. Create page in appropriate directory (`app/(landing)/` or `app/dashboard/`)
2. Add metadata with `generateMetadata()` function
3. Use Server Components by default, add `'use client'` only if needed
4. Add route to navigation if needed (update `constants/index.ts`)

### Adding a New Form
1. Create Zod schema for validation
2. Use react-hook-form with zodResolver
3. Follow existing form patterns in `components/form/`
4. Use shadcn/ui form components
5. Handle submission with Supabase client
6. Show toast notifications with sonner

### Working with Supabase
1. Use server client for Server Components
2. Use browser client for Client Components
3. Always handle errors from Supabase operations
4. Use SWR for client-side data fetching with caching
5. Mutate SWR cache after mutations for optimistic updates

## Best Practices

### Performance
- Use Server Components by default
- Add `'use client'` only when needed (hooks, events, browser APIs)
- Optimize images with Next.js Image component
- Use dynamic imports for heavy components
- Leverage SWR caching for repeated data fetches

### Security
- Never expose Supabase anon key (it's safe for client-side)
- Use Row Level Security (RLS) in Supabase
- Validate all inputs with Zod schemas
- Sanitize HTML content with dompurify
- Use environment variables for sensitive data

### Code Quality
- Always run `yarn lint` and `yarn typecheck` before committing
- Follow existing code patterns and conventions
- Use TypeScript strict mode - no `any` types
- Keep components small and focused
- Extract reusable logic into hooks or utilities

### Styling
- Use Tailwind utility classes
- Use `cn()` for conditional classes
- Follow existing color scheme (OKLCH variables)
- Ensure dark mode compatibility
- Use responsive design patterns (mobile-first)

### Git Workflow
- Write clear, descriptive commit messages
- Keep commits focused and atomic
- Test changes before committing
- Don't commit `.env` files or secrets

## How to Use This Documentation

### For AI Assistants
1. **Before starting work**: Read the Project Overview and Tech Stack sections
2. **When creating components**: Follow the Code Conventions and Component Structure patterns
3. **When working with data**: Refer to Data Models and Common Patterns sections
4. **When adding features**: Follow the Common Workflows section
5. **Before committing**: Always run `yarn lint` and `yarn typecheck`

### Quick Reference

**Most Important Commands**:
```bash
yarn dev          # Start development server
yarn lint         # Check code quality
yarn typecheck    # TypeScript validation
```

**Key Path Aliases**:
- `@/components` → `components/`
- `@/lib` → `lib/`
- `@/ui` → `components/ui/`
- `@/utils` → `lib/utils`

**Component Template**:
```typescript
'use client' // Only if needed

import { useState } from 'react'
import { Button } from '@/ui/button'
import { cn } from '@/lib/utils'

interface ComponentProps {
  title: string
  className?: string
}

export function ComponentName({ title, className }: ComponentProps) {
  /**
   * SETUP HOOKS
   */
  const router = useRouter()
  
  /**
   * SETUP STATE
   */
  const [state, setState] = useState('')
  
  /**
   * SETUP FUNCTIONS
   */
  const handleClick = () => {
    // Handle click
  }
  
  /**
   * SETUP EFFECTS
   */
  useEffect(() => {
    // Side effects
  }, [])
  
  return (
    <div className={cn('base-class', className)}>
      <h1>{title}</h1>
      <Button onClick={handleClick}>Click me</Button>
    </div>
  )
}
```

**Supabase Query Pattern**:
```typescript
// Server Component
const supabase = await createClient()
const { data, error } = await supabase
  .from('table')
  .select('*')
  .eq('column', value)

// Client Component
const supabase = createClient()
const { data, error } = await supabase
  .from('table')
  .select('*')
  .eq('column', value)
```

# Database Schema

## Table `profiles`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `full_name` | `text` |  |
| `job_title` | `text` |  |
| `bio` | `text` |  Nullable |
| `full_bio` | `text` |  Nullable |
| `cv_url` | `text` |  Nullable |
| `email` | `text` |  Nullable |
| `avatar_url` | `text` |  Nullable |
| `social_links` | `jsonb` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |

## Table `experiences`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `company_name` | `text` |  |
| `company_logo_url` | `text` |  Nullable |
| `position` | `text` |  |
| `location` | `text` |  Nullable |
| `start_date` | `date` |  |
| `end_date` | `date` |  Nullable |
| `is_current` | `bool` |  Nullable |
| `description` | `text` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `company_url` | `text` |  Nullable |

## Table `projects`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `title` | `text` |  |
| `description` | `text` |  Nullable |
| `content` | `text` |  Nullable |
| `image_url` | `text` |  Nullable |
| `is_featured` | `bool` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `date_published` | `date` |  Nullable |

## Table `technologies`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `name` | `text` |  |
| `icon_url` | `text` |  Nullable |
| `created_at` | `timestamptz` |  |

## Table `project_technologies`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `project_id` | `uuid` | Primary |
| `tech_id` | `uuid` | Primary |


## Troubleshooting

### Common Issues

**TypeScript Errors**:
- Run `yarn typecheck` to see all errors
- Check `types/index.ts` for correct interfaces
- Ensure proper type imports

**Build Errors**:
- Check for missing dependencies in `package.json`
- Verify all imports use correct path aliases
- Ensure Server Components don't use client-only hooks

**Styling Issues**:
- Verify Tailwind classes are valid
- Check `cn()` utility usage for conditional classes
- Ensure dark mode classes are properly applied

**Supabase Connection Issues**:
- Check environment variables in `.env`
- Verify Supabase project is active
- Check network connectivity

### Verification Checklist
Before considering work complete:
- [ ] Code compiles without errors (`yarn build`)
- [ ] No TypeScript errors (`yarn typecheck`)
- [ ] No linting errors (`yarn lint`)
- [ ] Code follows project conventions
- [ ] All imports use `@/` path aliases
- [ ] Components follow SETUP section structure
- [ ] Forms use Zod validation
- [ ] Data fetching uses correct Supabase client
- [ ] Styling uses Tailwind classes and `cn()` utility

---

*Documentation last updated: 2026-05-20*  
*Project: Portfolio Website*  
*Framework: Next.js 16.2.4 with TypeScript*  
*Backend: Supabase*
