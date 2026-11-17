# 2026-11-17 — v2 / Section de projetos (estilo mowa)

## O que mudou

- Nova section `#projetos` na rota `/v2`, inspirada na parte Projekte do [mowa.studio](https://mowa.studio/#projekte).
- Dados estáticos em `app/v2/_data/projects.json` (categorias + 4 projetos com vídeos de `public/`).
- Chips de categoria com contagem e filtro funcional; accent ativo `#19E57B`.
- Cards com vídeo 16:10, hover (overlay + seta), badge de categoria; clique abre `href` em nova aba.
- Reveal via GSAP/ScrollTrigger; CTA “Ver projetos” usa Lenis (`getLenis().scrollTo`).
- Asset renomeado: `Automação com IA.webm` → `Automacao-com-IA.webm` (path sem espaço).

## Arquivos

- `app/v2/_data/projects.json` (novo)
- `app/v2/_components/ProjectsSection.tsx` (novo)
- `app/v2/_components/HeroSection.tsx` (scroll Lenis no CTA)
- `app/v2/page.tsx` (monta a section)
- `app/v2/_i18n/translations.ts` (chaves `projects.*`)
- `app/_components/portfolio/ServicesSection.tsx` (path do vídeo atualizado)
- `docs/superpowers/specs/2026-11-17-v2-projects-section-design.md`
- `docs/superpowers/plans/2026-11-17-v2-projects-section.md`

## Iteração — efeitos Lusion Featured Work

Substituída a deformação estilo mowa pelos efeitos do [lusion.co](https://lusion.co/) Featured Work:

1. **Entrada** — card + footer fade/slide-up ao entrar no viewport
2. **Scroll “abrindo”** — `clip-path: inset(...)` do frame abre + imagem faz un-zoom (`scale 1.38 → 1`) no mesmo scrub; parallax leve em `yPercent`
3. **Hover** — zoom da mídia, parallax seguindo o mouse, seta desliza no título

Camadas: `frame` (clip) → `scrollLayer` (scale/parallax) → `hoverLayer` (mouse) → `video`.

## Fora de escopo (nesta entrega)

- WebGL/Three.js do Lusion (só efeitos DOM/GSAP)
- Carrossel flutuante de projetos no hero
- URLs reais por projeto (seed usa Instagram da DR como placeholder)
