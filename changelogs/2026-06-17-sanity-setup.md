# Sanity CMS — Setup inicial

**Data:** 2026-06-17

## O que foi feito

- Studio standalone em `../studio-drinovações/` (irmão de `drinovacoes/`)
- Projeto Sanity: **DrInovações** (`d930rucp`), dataset `production`
- Schema de blog: tipo `post` (título, slug, resumo, imagem, corpo)
- Schema de portfólio: tipo `project` (categoria, capa, galeria, tecnologias, link)
- Cliente Sanity em `sanity/client.ts` no app Next.js
- Variáveis em `.env.local`
- CORS configurado para `http://localhost:3000`

## Comandos úteis

```bash
# Studio (pasta studio-drinovações)
pnpm dev          # http://localhost:3333

# Next.js (pasta drinovacoes)
pnpm dev          # http://localhost:3000
```

## Login CLI

O projeto está na conta GitHub (`glinhas55@hotmail.com`). Para trocar de conta:

```bash
pnpm dlx sanity@latest logout
pnpm dlx sanity@latest login --provider github
```
