# Hero — espaçamento do texto no scroll do stack

**Data:** 2026-06-23

## Problema

Durante o scroll dos 3 dashboards no hero, o subtítulo sobrepunha visualmente a linha "em tecnologia." por:

- Altura fixa do viewport do stack (`calc(100svh - 24rem)`) que não se adaptava ao espaço real do texto
- Espaçamento insuficiente entre as linhas do título (fonte Bitcount pixelada)
- Parallax GSAP no `.hero-title` ativo enquanto o scroll da página estava bloqueado

## Solução

- Agrupamento do copy do hero em `.hero-copy` com `gap` consistente
- Segunda linha do título em `display: block` com `mt-2/md:mt-3`
- Área do stack com altura fixa `clamp()` (comportamento original do empilhamento)
- `contain: paint` e `isolation: isolate` no viewport do stack
- Remoção de `transform-style: preserve-3d` nos cards
- Parallax do título desabilitado enquanto `data-scroll-locked="true"`
- Estado final do stack preservado ao congelar (`frozen`): sem reset do efeito, `scrollTop` fixado no fim e transforms mantidos

## Arquivos

- `app/_components/portfolio/Hero.tsx`
- `app/_components/portfolio/ScrollStack.css`
- `app/_components/portfolio/PortfolioAnimations.tsx`
