import {createClient} from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'd930rucp'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-06-17',
  useCdn: false,
})
