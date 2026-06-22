import {defineQuery} from 'next-sanity'

const categoryFields = `{
  _id,
  "slug": slug.current,
  title,
  headline,
  description,
  accentColor,
  order
}`

export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "projectCategory"] | order(order asc) ${categoryFields}
`)

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "category": category->${categoryFields},
    shortDescription,
    description,
    coverImage,
    gallery,
    technologies,
    liveUrl,
    publishedAt
  }
`)

export const PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "category": category->${categoryFields},
    shortDescription,
    description,
    coverImage,
    gallery,
    technologies,
    liveUrl,
    publishedAt
  }
`)
