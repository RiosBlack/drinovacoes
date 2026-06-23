# Services — correção da linha vertical no vídeo

**Data:** 2026-06-23

## Problema

Ao passar o mouse nos blocos de serviço, uma linha vertical aparecia brevemente na borda esquerda do vídeo e sumia após o carregamento/animação.

## Causa

- Animação de `translateX` no painel `w-1/2` expunha a borda do container durante a transição
- Vídeo sem fundo de fallback e sem overscale gerava artefato de subpixel na junção com o gradiente

## Correção

- Transição apenas com `opacity` (sem deslocamento horizontal)
- Painel ampliado para `w-[58%]` com fundo igual ao bloco
- Vídeo posicionado de forma absoluta com leve `scale` para cobrir bordas
- Gradiente com faixa sólida inicial para esconder a junção com o texto

## Arquivos alterados

- `app/_components/portfolio/ServicesSection.tsx`
