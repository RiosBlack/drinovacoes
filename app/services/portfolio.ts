import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'
import {
  CATEGORIES_QUERY,
  PROJECT_BY_SLUG_QUERY,
  PROJECTS_QUERY,
} from '@/sanity/queries'
import type {Project, ProjectCategory} from '@/app/types/portfolio'

type SanityCategoryDoc = {
  _id: string
  slug: string
  title: string
  headline: string
  description: string
  accentColor: string
  order: number
}

type SanityProjectDoc = {
  _id: string
  title: string
  slug: string
  category?: SanityCategoryDoc | null
  shortDescription: string
  description: string
  coverImage?: {asset?: {_ref: string}}
  gallery?: Array<{asset?: {_ref: string}}>
  technologies?: string[]
  liveUrl?: string
  publishedAt?: string
}

function formatDate(iso?: string): string {
  if (!iso) return ''
  return new Intl.DateTimeFormat('pt-BR', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso))
}

function mapCategory(doc: SanityCategoryDoc): ProjectCategory {
  return {
    id: doc._id,
    slug: doc.slug,
    title: doc.title,
    headline: doc.headline,
    description: doc.description,
    accentColor: doc.accentColor,
    order: doc.order,
  }
}

function mapProject(doc: SanityProjectDoc): Project | null {
  if (!doc.category?.slug) return null

  return {
    id: doc._id,
    slug: doc.slug,
    title: doc.title,
    category: mapCategory(doc.category),
    shortDescription: doc.shortDescription,
    description: doc.description,
    coverImage: doc.coverImage
      ? urlFor(doc.coverImage).width(800).height(600).fit('crop').url()
      : '',
    gallery: (doc.gallery ?? [])
      .filter(Boolean)
      .map((image) => urlFor(image).width(1400).fit('max').url()),
    technologies: doc.technologies ?? [],
    liveUrl: doc.liveUrl,
    publishedAt: formatDate(doc.publishedAt),
  }
}

export async function getCategories(): Promise<ProjectCategory[]> {
  const docs = await client.fetch<SanityCategoryDoc[]>(CATEGORIES_QUERY)
  return docs.map(mapCategory)
}

export async function getProjects(): Promise<Project[]> {
  const docs = await client.fetch<SanityProjectDoc[]>(PROJECTS_QUERY)
  return docs.map(mapProject).filter((project): project is Project => project !== null)
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const doc = await client.fetch<SanityProjectDoc | null>(PROJECT_BY_SLUG_QUERY, {
    slug,
  })
  return doc ? mapProject(doc) : null
}

/** @deprecated Use getProjects */
export async function getPortifolio(): Promise<Project[]> {
  return getProjects()
}

/** @deprecated Use getProjectBySlug */
export async function getPortifolioById(slug: string): Promise<Project[]> {
  const project = await getProjectBySlug(slug)
  return project ? [project] : []
}
