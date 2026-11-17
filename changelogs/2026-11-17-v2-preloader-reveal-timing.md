# 2026-11-17 — v2 / Timing do preloader (fundo → conteúdo)

## Sequência desejada

1. Loading 0→100%
2. Cortina sobe revelando **só o fundo** (LetterGlitch)
3. Depois, o conteúdo do hero (retrato, título, CTAs) anima entrando

## Implementação

- `onBackground` — no início da subida da cortina → `showBackground`
- `onComplete` — cortina terminou → `showContent` + libera scroll + monta projetos
- Conteúdo `.hero-reveal` fica em `autoAlpha: 0` até `showContent`
- LetterGlitch monta cedo (aquece WebGL), mas só fica visível com `showBackground`
