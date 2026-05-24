'use client'

import { formatDistanceToNow } from 'date-fns'
import { BriefcaseIcon, CodeIcon, FileTextIcon, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import useSWR from 'swr'

import { StatCard } from '@/components/base/base-stat-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { createClient } from '@/lib/supabase/client'
import type { Experience, Profile, Project, Technology } from '@/types'

const USER_ID = process.env.NEXT_PUBLIC_USER_ID

interface DashboardStats {
  totalProjects: number
  featuredProjects: number
  totalTechnologies: number
  totalExperiences: number
  currentExperience: Experience | null
  profileCompletion: number
  missingFields: string[]
}

function calculateProfileCompletion(profile: Profile | null): {
  percentage: number
  missingFields: string[]
} {
  if (!profile) return { percentage: 0, missingFields: ['Profile not created'] }

  const requiredFields = ['full_name', 'bio', 'avatar_url']
  const optionalFields = ['cv_url', 'email']

  let requiredScore = 0
  const missing: string[] = []

  requiredFields.forEach((field) => {
    const value = profile[field as keyof Profile]
    if (value) {
      requiredScore += 1
    } else {
      missing.push(field.replace(/_/g, ' '))
    }
  })

  let optionalScore = 0
  optionalFields.forEach((field) => {
    const value = profile[field as keyof Profile]
    if (value) {
      optionalScore += 1
    }
  })

  const requiredPercentage = (requiredScore / requiredFields.length) * 60
  const optionalPercentage = (optionalScore / optionalFields.length) * 40
  const total = Math.round(requiredPercentage + optionalPercentage)

  return { percentage: total, missingFields: missing }
}

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()

  const fetcher = async (key: string) => {
    if (key === 'profile') {
      if (!USER_ID) throw new Error('Missing user id')
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', USER_ID)
        .maybeSingle()
      if (error) throw error
      return data
    }

    if (key === 'projects') {
      const { data, error } = await supabase.from('projects').select('*').overrideTypes<Project[]>()
      if (error) throw error
      return data ?? []
    }

    if (key === 'technologies') {
      const { data, error } = await supabase
        .from('technologies')
        .select('*')
        .overrideTypes<Technology[]>()
      if (error) throw error
      return data ?? []
    }

    if (key === 'experiences') {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('start_date', { ascending: false })
        .overrideTypes<Experience[]>()
      if (error) throw error
      return data ?? []
    }
  }

  const { data: profile, isLoading: profileLoading } = useSWR<Profile>(
    USER_ID ? 'profile' : null,
    fetcher,
  )
  const { data: projects = [], isLoading: projectsLoading } = useSWR<Project[]>('projects', fetcher)
  const { data: technologies = [], isLoading: techLoading } = useSWR<Technology[]>(
    'technologies',
    fetcher,
  )
  const { data: experiences = [], isLoading: expLoading } = useSWR<Experience[]>(
    'experiences',
    fetcher,
  )

  const stats = useMemo<DashboardStats>(() => {
    const { percentage, missingFields } = calculateProfileCompletion(profile || null)
    const currentExp = experiences.find((e) => e.is_current) || null
    const featuredCount = projects.filter((p) => p.is_featured).length

    return {
      totalProjects: projects.length,
      featuredProjects: featuredCount,
      totalTechnologies: technologies.length,
      totalExperiences: experiences.length,
      currentExperience: currentExp,
      profileCompletion: percentage,
      missingFields,
    }
  }, [profile, projects, technologies, experiences])

  const isLoading = profileLoading || projectsLoading || techLoading || expLoading

  if (isLoading || !stats) {
    return (
      <div className="container mx-auto py-10">
        <Skeleton className="mb-8 h-10 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {profile?.full_name || 'Developer'}</h1>
        <p className="text-muted-foreground">Here is your portfolio overview</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Projects"
          value={stats.totalProjects}
          description={`${stats.featuredProjects} featured`}
          icon={CodeIcon}
          color="default"
          onViewMore={() => router.push('/dashboard/projects')}
          lastUpdated={projects[0]?.created_at}
        />

        <StatCard
          title="Technologies"
          value={stats.totalTechnologies}
          description="In your stack"
          icon={Zap}
          color="default"
          onViewMore={() => router.push('/dashboard/technologies')}
          lastUpdated={technologies[0]?.created_at}
        />

        <StatCard
          title="Experiences"
          value={stats.totalExperiences}
          description={stats.currentExperience ? 'Currently employed' : 'Total roles'}
          icon={BriefcaseIcon}
          color="default"
          onViewMore={() => router.push('/dashboard/experiences')}
          lastUpdated={experiences[0]?.created_at}
        />

        <StatCard
          title="Profile"
          value={`${stats.profileCompletion}%`}
          description="Completion"
          icon={FileTextIcon}
          color={stats.profileCompletion === 100 ? 'default' : 'outline'}
          progress={{
            value: stats.profileCompletion,
            max: 100,
          }}
          onViewMore={() => router.push('/dashboard/profile')}
          lastUpdated={profile?.created_at}
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Button
            variant="outline"
            className="h-auto flex-col items-start justify-start p-4"
            onClick={() => router.push('/dashboard/profile')}
          >
            <FileTextIcon className="mb-2 h-5 w-5" />
            <span className="font-semibold">Edit Profile</span>
            <span className="text-xs text-muted-foreground">Update your info</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex-col items-start justify-start p-4"
            onClick={() => router.push('/dashboard/projects')}
          >
            <CodeIcon className="mb-2 h-5 w-5" />
            <span className="font-semibold">Manage Projects</span>
            <span className="text-xs text-muted-foreground">Add or edit projects</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex-col items-start justify-start p-4"
            onClick={() => router.push('/dashboard/experiences')}
          >
            <BriefcaseIcon className="mb-2 h-5 w-5" />
            <span className="font-semibold">Manage Experiences</span>
            <span className="text-xs text-muted-foreground">Update work history</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex-col items-start justify-start p-4"
            onClick={() => router.push('/dashboard/technologies')}
          >
            <Zap className="mb-2 h-5 w-5" />
            <span className="font-semibold">Manage Tech Stack</span>
            <span className="text-xs text-muted-foreground">Add technologies</span>
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Projects</CardTitle>
            <CardDescription>Latest 3 projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.length === 0 ? (
              <p className="text-sm text-muted-foreground">No projects yet</p>
            ) : (
              projects.slice(0, 3).map((project) => (
                <div
                  key={project.id}
                  className="flex cursor-pointer items-start justify-between gap-2 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                  onClick={() => router.push('/dashboard/projects')}
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{project.title}</p>
                    <div className="mt-1 flex items-center gap-2">
                      {project.is_featured && (
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          Featured
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Current Experience */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Role</CardTitle>
            <CardDescription>Your active position</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.currentExperience ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold">{stats.currentExperience.position}</p>
                  <p className="text-sm text-muted-foreground">
                    {stats.currentExperience.company_name}
                  </p>
                </div>
                {stats.currentExperience.location && (
                  <p className="text-xs text-muted-foreground">
                    📍 {stats.currentExperience.location}
                  </p>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => router.push('/dashboard/experiences')}
                >
                  View All Experiences
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">No current role set</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => router.push('/dashboard/experiences')}
                >
                  Add Experience
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tech Stack Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tech Stack</CardTitle>
            <CardDescription>Top technologies</CardDescription>
          </CardHeader>
          <CardContent>
            {technologies.length === 0 ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">No technologies added</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => router.push('/dashboard/technologies')}
                >
                  Add Technology
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {technologies.slice(0, 5).map((tech) => (
                    <div
                      key={tech.id}
                      className="flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs"
                    >
                      {tech.icon_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={tech.icon_url} alt={tech.name} className="h-3.5 w-3.5" />
                      )}
                      <span>{tech.name}</span>
                    </div>
                  ))}
                </div>
                {technologies.length > 5 && (
                  <p className="text-xs text-muted-foreground">+{technologies.length - 5} more</p>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => router.push('/dashboard/technologies')}
                >
                  View All
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Profile Completion Alert */}
      {stats.profileCompletion < 100 && (
        <Card className="mt-8 border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950">
          <CardHeader>
            <CardTitle className="text-base">Complete Your Profile</CardTitle>
            <CardDescription>
              You&apos;re {stats.profileCompletion}% complete. Add the missing information to
              improve your portfolio.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.missingFields.map((field) => (
                <p key={field} className="text-sm text-muted-foreground">
                  • {field}
                </p>
              ))}
            </div>
          </CardContent>
          <div className="border-t px-6 py-4">
            <Button size="sm" onClick={() => router.push('/dashboard/profile')}>
              Complete Profile
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
