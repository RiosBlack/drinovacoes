# DR Inovações — AGENTS.md

## Resumo

Portfólio da empresa **DR Inovações** (desenvolvimento de software). Site minimalista inspirado no design da Apple, com animações GSAP/ScrollTrigger e scroll suave via Lenis.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Estilo:** Tailwind CSS
- **Animações:** GSAP + ScrollTrigger + Lenis
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
```

## Changelog

- [2026-06-16 — Redesign portfólio Apple](./changelogs/2026-06-16-portfolio-redesign.md)
