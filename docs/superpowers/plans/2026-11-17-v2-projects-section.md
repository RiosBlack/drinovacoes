# v2 Projects Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the `/v2` projects section (mowa-style grid + category chips + Lenis scroll from hero CTA) backed by static JSON.

**Architecture:** Monolithic `ProjectsSection` reading `app/v2/_data/projects.json`; hero CTA uses `getLenis().scrollTo('#projetos')`; CSS + GSAP/ScrollTrigger only (no WebGL).

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind, GSAP + ScrollTrigger, Lenis (existing `useSmoothScroll`).

## Global Constraints

- Accent chip ativo: `#19E57B`
- Fundo section: `#0A0A0A`
- Card mídia: aspect `16/10`, radius `12px`
- Clique: `target="_blank"` + `rel="noopener noreferrer"`
- Sem WebGL / fisheye
- i18n via `app/v2/_i18n`
- Changelog + `AGENTS.md` obrigatórios
- Não commitar a menos que o usuário peça

---

### Task 1: Data + i18n

**Files:**
- Create: `app/v2/_data/projects.json`
- Modify: `app/v2/_i18n/translations.ts`
- Asset: `public/Automacao-com-IA.webm` (já renomeado de `Automação com IA.webm`)

- [x] **Step 1:** Criar JSON com categories + 4 projects (Site, E-commerce, Sistemas, Automacao-com-IA). `href` usar `https://www.instagram.com/drinovacoes/` como placeholder navegável até haver URLs reais.
- [x] **Step 2:** Adicionar chaves `projects.title`, `projects.description`, `projects.all`, `projects.categoryLabel`, `projects.open` em EN/PT.

### Task 2: ProjectsSection component

**Files:**
- Create: `app/v2/_components/ProjectsSection.tsx`

- [x] **Step 1:** Implementar header (título + seta), chips com `aria-pressed`, grid 2/1 cols, cards com video + meta + link.
- [x] **Step 2:** GSAP ScrollTrigger reveal; filtro com fade; vídeo play on viewport/hover; `prefers-reduced-motion`.

### Task 3: Wire page + hero Lenis

**Files:**
- Modify: `app/v2/page.tsx`
- Modify: `app/v2/_components/HeroSection.tsx`

- [x] **Step 1:** Montar `<ProjectsSection />` após o hero.
- [x] **Step 2:** CTA `#projetos` → `getLenis()?.scrollTo('#projetos')` com preventDefault.

### Task 4: Docs

**Files:**
- Create: `changelogs/2026-11-17-v2-projects-section.md`
- Modify: `AGENTS.md`

- [x] **Step 1:** Changelog + entrada no AGENTS.md (estrutura + changelog link).
- [x] **Step 2:** Verificar lint / página `/v2` carrega.
