# Layout de detalhe de projetos

**Data:** 2026-06-23

## O que foi feito

- Design system persistido em `design-system/dr-inovações/` com tokens adaptados à marca DR (Raleway, `#C9A227`, `#f5f5f7`)
- Override de página em `design-system/dr-inovações/pages/project-detail.md`
- Novos componentes em `app/_components/portfolio/project-detail/`:
  - Nav clara com blur ao scroll
  - Hero com categoria, título, data e CTA "Ver ao vivo"
  - Galeria visual-first (cover + grid)
  - Descrição, stack técnica com Simple Icons, CTA final
  - Animações GSAP com fallback para `prefers-reduced-motion`
- `app/[id]/page.tsx` refatorado — removido layout legado (roxo, Meteors, magicui)
- `generateMetadata()` para SEO por projeto
- Variáveis CSS `--project-*` em `globals.css`
- `cdn.simpleicons.org` adicionado ao `next.config.mjs`

## Arquivos alterados

- `design-system/dr-inovações/MASTER.md` (novo)
- `design-system/dr-inovações/pages/project-detail.md` (novo)
- `app/_components/portfolio/project-detail/*` (novos)
- `app/[id]/page.tsx`
- `app/globals.css`
- `next.config.mjs`

## Como testar

1. `pnpm dev` e abrir `http://localhost:3000/teste2`
2. Validar hero, galeria, tecnologias e CTAs
3. Testar responsivo em 375px / 768px / 1024px
