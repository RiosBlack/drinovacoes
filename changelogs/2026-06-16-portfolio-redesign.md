# Redesign portfólio estilo Apple

**Data:** 2026-06-16

## O que mudou

- Home completamente redesenhada com visual minimalista (preto/branco/cinza + dourado `#C9A227`)
- Tipografia Inter (similar à SF Pro da Apple)
- Animações GSAP ScrollTrigger: hero parallax, highlights com pin+scrub, headlines com scrub, reveals em batch
- Scroll suave com Lenis integrado ao GSAP ticker
- Novos componentes em `app/_components/portfolio/`
- Página `/projetos` atualizada para o mesmo visual
- Integração Notion mantida para listagem de projetos
- Background interativo `DotField` (React Bits) no hero, com cores douradas alinhadas à marca
- Hero com scroll bloqueado na página até o terceiro dashboard; wheel/touch anima apenas o stack interno; animação termina com 3 cards empilhados (sem fase extra de subida); ao congelar, scroll da página libera imediatamente
- Ajuste de espaçamento do hero (redução ~70% entre CTAs e stack de dashboards) e correção de CLS nas imagens do stack
- Correção do salto visual no reload: CSS inicial com container queries + `stackPosition` reduzido para 18% + inicialização do ScrollStack apenas após medição do container

## Arquivos principais

- `app/page.tsx`
- `app/_components/portfolio/*`
- `app/hooks/useSmoothScroll.ts`
- `app/globals.css`
- `app/layout.tsx`
