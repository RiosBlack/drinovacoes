# Página de política de privacidade

## Contexto

O site não tinha uma página que informasse o tratamento de dados pessoais, exigência da LGPD para quem opera um site público.

## Alterações

- Criada a rota `/politica-de-privacidade`, alinhada ao que o site faz de fato: portfólio, hospedagem na Vercel, imagens via Sanity e contato pelo WhatsApp. Sem cookies de rastreamento.
- Link “Política de Privacidade” adicionado ao rodapé.
- Navbar ganhou a variante `solid` para páginas de fundo claro, e os links do menu passaram a apontar para as âncoras da home (`/#...`).

## Arquivos afetados

- `app/politica-de-privacidade/page.tsx` (novo)
- `app/_components/portfolio/Footer.tsx`
- `app/_components/portfolio/Navbar.tsx`
- `app/globals.css`
