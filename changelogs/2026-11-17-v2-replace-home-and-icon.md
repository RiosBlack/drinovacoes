# 2026-11-17 — v2 como home + ícone novo

## O que mudou

- A rota `/` passa a renderizar a experiência v2 (reexport de `app/v2/page.tsx`),
  substituindo o portfólio Apple antigo na home.
- `/v2` redireciona permanentemente para `/`.
- Favicon/ícone da página atualizado para o mark verde `logo-dr-mark.png`
  (`app/icon.png` + `app/apple-icon.png`); removido o `favicon.ico` antigo.

## Arquivos

- `app/page.tsx`
- `app/icon.png`, `app/apple-icon.png`
- `next.config.mjs` (redirect `/v2` → `/`)
- removido `app/favicon.ico`

## Nota

- Rotas `/projetos`, `/[id]` e `/politica-de-privacidade` permanecem.
