export interface ProjectCategory {
  id: string
  slug: string
  title: string
  headline: string
  description: string
  accentColor: string
  order: number
}

export interface Project {
  id: string
  slug: string
  title: string
  category: ProjectCategory
  shortDescription: string
  description: string
  coverImage: string
  gallery: string[]
  technologies: string[]
  liveUrl?: string
  publishedAt: string
}

/** @deprecated Use Project — mantido para compatibilidade temporária */
export interface PortfolioItem {
  data: string
  Projeto?: string
  Capa?: string
  Foto1?: string
  Foto2?: string
  Foto3?: string
  Descricoes?: string
  Link?: string
  Tech1?: string
  Tech2?: string
  Tech3?: string
  Tech4?: string
  Tech5?: string
  Tech6?: string
  Index?: string
  DescricaoBreve?: string
  Miniatura?: string
}
