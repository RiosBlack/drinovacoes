# 2026-11-17 — Fix build Vercel (LetterGlitch props)

## Problema

Deploy `a9e5c0b` falhou no typecheck: `LetterGlitch` exigia `backgroundColor`,
`dpr` e `style` (props sem default no JSX → obrigatórias no TS).

## Correção

Defaults em `LetterGlitch.jsx`: `backgroundColor = null`, `dpr = 0`, `style = {}`.
