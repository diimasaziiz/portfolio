import { generateOrganizationSchema, generatePersonSchema, StructuredData } from '@/lib/seo'
import { Profile } from '@/types'

interface StructuredDataProps {
  profile?: Profile
  includeOrganization?: boolean
}

export function StructuredDataComponent({
  profile,
  includeOrganization = true,
}: StructuredDataProps) {
  const schemas: StructuredData[] = []

  // Add Organization schema
  if (includeOrganization) {
    schemas.push(generateOrganizationSchema())
  }

  // Add Person schema if profile data exists
  if (profile) {
    const socialLinks = profile.social_links
      ? profile.social_links.reduce(
          (acc, link) => ({
            ...acc,
            [link.platform]: link.url,
          }),
          {},
        )
      : {}

    schemas.push(
      generatePersonSchema({
        full_name: profile.full_name,
        bio: profile.bio,
        email: profile.email,
        social_links: socialLinks,
      }),
    )
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
