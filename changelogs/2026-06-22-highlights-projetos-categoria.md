# Highlights — projetos por categoria

**Data:** 2026-06-22

## O que foi feito

### Sanity Studio (`../studio-drinovações/`)

- Novo tipo `projectCategory` com: nome, slug, título do painel, descrição, cor e ordem
- Campo `category` em `project` alterado de `string` fixa para `reference` → `projectCategory`
- Menu do Studio reorganizado: Categorias, Projetos, Posts
- Seed das 4 categorias iniciais (Sistemas, E-commerce, Sites, IA)
- Migração do projeto `teste` para referência `category-sistemas`

### Next.js

- `getCategories()` e queries GROQ com join `category->`
- Tipos `ProjectCategory` e `Project.category` como objeto expandido
- `Highlights` consome categorias do Sanity (abas e painéis dinâmicos)
- Projetos filtrados por `category.slug` em cada painel
- Fix GSAP + React Strict Mode: painel ativo visível via CSS fallback
- `PortfolioAnimations` re-inicializa scroll dos Highlights quando dados carregam (`contentKey`)

## Arquivos alterados

- `studio-drinovações/schemaTypes/documents/projectCategory.ts` (novo)
- `studio-drinovações/schemaTypes/documents/project.ts`
- `studio-drinovações/schemaTypes/index.ts`
- `studio-drinovações/sanity.config.ts`
- `studio-drinovações/seed/categories.ndjson` (novo)
- `app/types/portfolio.ts`
- `sanity/queries.ts`
- `app/services/portfolio.ts`
- `app/_components/portfolio/Highlights.tsx`
- `app/_components/portfolio/PortfolioAnimations.tsx`
- `app/page.tsx`

## Como cadastrar nova categoria

1. Abrir Studio (`pnpm dev` em `studio-drinovações`)
2. Criar documento em **Categorias**
3. Preencher todos os campos e publicar
4. Ao criar/editar um projeto, selecionar a categoria na referência
