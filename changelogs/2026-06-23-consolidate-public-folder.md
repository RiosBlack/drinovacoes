# Consolidar assets em `public/` na raiz

## Contexto

O projeto tinha duas pastas de assets estáticos: `app/public/` (imports relativos) e `public/` na raiz (padrão Next.js para URLs `/arquivo`).

## Alterações

- Movidos para `public/`: `dash1–3.webp`, `foto2.2.png`, `logo.png`, `whatsapp.png`
- Removida a pasta `app/public/` (incluindo arquivos órfãos não referenciados)
- Componentes atualizados para usar caminhos `/...` em vez de imports de `app/public`

## Arquivos afetados

- `Hero.tsx`, `Navbar.tsx`, `ContactSection.tsx`
- `headerMenu.tsx`, `imageSec1.tsx`
