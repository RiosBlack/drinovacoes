# v2 Contact Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar a section `#contato` no `/v2` no estilo “Let’s work together” do Dennis Snellenberg, com CTA WhatsApp, pills, footer e i18n.

**Architecture:** Um componente cliente `ContactSection.tsx` montado após `AboutSection` em `page.tsx`. Asset estático em `public/v2/contact-portrait.jpg`. Strings em `translations.ts`. GSAP + ScrollTrigger para reveal e magnetic leve (desktop).

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind, GSAP/ScrollTrigger, next/image, pnpm.

## Global Constraints

- Fundo `#0A0A0A`, texto `#f5f5f7`, accent `#19E57B`
- CTA círculo → `https://wa.me/5575981414537`
- Sociais: somente Instagram (`https://www.instagram.com/drinovacoes/`) — sem LinkedIn
- Timezone `America/Bahia`
- EN padrão + PT
- Sem retrato cursor-follow
- Changelog + `AGENTS.md`

---

### Task 1: Asset + i18n

**Files:**
- Create: `public/v2/contact-portrait.jpg`
- Modify: `app/v2/_i18n/translations.ts`

- [x] Copiar a imagem enviada para `public/v2/contact-portrait.jpg`
- [x] Adicionar chaves `contact.*` (EN + PT) conforme a spec
- [x] Verificar TypeScript (`TranslationKey` deriva do objeto)

### Task 2: ContactSection

**Files:**
- Create: `app/v2/_components/ContactSection.tsx`
- Modify: `app/v2/page.tsx`
- Modify: `app/v2/_components/AboutSection.tsx` (remover fallback `#projetos` no scroll)

- [x] Implementar layout (headline + retrato, linha + círculo, pills, footer)
- [x] Relógio local com `Intl` + interval 60s
- [x] GSAP reveal + magnetic (`pointer: fine`, respect reduced motion)
- [x] Montar em `page.tsx` após About quando `preloaderDone`
- [x] About: scroll só para `#contato`

### Task 3: Docs

**Files:**
- Create: `changelogs/2026-11-17-v2-contact-section.md`
- Modify: `AGENTS.md`

- [x] Changelog + referência no `AGENTS.md`
- [x] Smoke: section visível em `/v2`, links WhatsApp/Instagram ok
