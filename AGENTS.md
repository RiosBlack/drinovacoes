# DR Inovações — AGENTS.md

## Resumo

Portfólio da empresa **DR Inovações** (desenvolvimento de software). Site minimalista inspirado no design da Apple, com animações GSAP/ScrollTrigger e scroll suave via Lenis.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Estilo:** Tailwind CSS
- **Animações:** GSAP + ScrollTrigger + Lenis
- **CMS:** Notion API (portfólio de projetos)
- **Package manager:** pnpm

## Estrutura

```
app/
  _components/portfolio/   # Componentes do novo portfólio
  hooks/useSmoothScroll.ts # Lenis + GSAP ticker
  services/notion.ts       # Integração Notion
  page.tsx                 # Home
  projetos/page.tsx        # Lista de projetos
  [id]/page.tsx            # Detalhe do projeto
```

## Variáveis de ambiente

- `NOTION_API_KEY` — chave da API Notion para buscar projetos

## Changelog

- [2026-06-16 — Redesign portfólio Apple](./changelogs/2026-06-16-portfolio-redesign.md)
