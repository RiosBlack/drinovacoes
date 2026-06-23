# Highlights — vídeo no hover das abas

**Data:** 2026-06-22

## O que foi feito

- Vídeo semi-transparente na área direita de cada bloco de serviço (`ServicesSection`) ao passar o mouse
- Removido da seção `Highlights` (Projetos com abas)
- Transição suave com entrada da esquerda para a direita (opacity + translate) via Framer Motion
- Vídeo some ao sair do hover da seção de abas
- Mapeamento por ordem: Sistemas, E-commerce, Sites, Automação com IA
- Vídeos servidos via pasta `public/` (URLs estáticas) — Next.js não suporta import direto de `.webm`

## Arquivos alterados

- `app/_components/portfolio/ServicesSection.tsx`
- `app/_components/portfolio/Highlights.tsx` (revert do vídeo)
- `public/Sistemas.webm`, `public/E-commerce.webm`, `public/Site.webm`, `public/Automação com IA.webm` (novos)
