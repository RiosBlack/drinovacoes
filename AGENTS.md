# DR Inovações — AGENTS.md

## Resumo

Portfólio da empresa **DR Inovações** (desenvolvimento de software). Site minimalista inspirado no design da Apple, com animações GSAP/ScrollTrigger e scroll suave via Lenis.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Estilo:** Tailwind CSS
- **Animações:** GSAP + ScrollTrigger + Lenis
- **CMS:** Sanity (Studio standalone em `../studio-drinovações/`)
- **Package manager:** pnpm

## Estrutura

```
app/
  _components/portfolio/   # Componentes do novo portfólio
  hooks/useSmoothScroll.ts # Lenis + GSAP ticker
  data/portfolio.ts        # Dados estáticos do portfólio
  services/portfolio.ts    # Acesso aos projetos
  page.tsx                 # Home
  projetos/page.tsx        # Lista de projetos
  [id]/page.tsx            # Detalhe do projeto
sanity/client.ts           # Cliente Sanity (blog)
../studio-drinovações/     # Sanity Studio (standalone)
```

## Sanity

- **Project ID:** `d930rucp`
- **Dataset:** `production`
- **Conta CLI:** GitHub (`glinhas55@hotmail.com`)
- **Tipos:** `projectCategory` (categorias cadastráveis), `project` (referência à categoria), `post`

## Changelog

- [2026-06-22 — Highlights vídeo no hover](./changelogs/2026-06-22-highlights-video-hover.md)
- [2026-06-22 — Highlights com projetos por categoria](./changelogs/2026-06-22-highlights-projetos-categoria.md)
- [2026-06-17 — Setup Sanity CMS](./changelogs/2026-06-17-sanity-setup.md)
- [2026-06-16 — Redesign portfólio Apple](./changelogs/2026-06-16-portfolio-redesign.md)
