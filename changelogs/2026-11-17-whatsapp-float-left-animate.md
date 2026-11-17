# 2026-11-17 — WhatsApp flutuante à esquerda com animação

## Contexto

O botão flutuante do WhatsApp ficava no canto inferior direito. Pedido: mover
para a esquerda e animar.

## O que foi feito

- `WhatsAppFloat`: `right-6` → `left-6`.
- Animação de flutuação vertical (`wa-float`) + anel de pulso (`wa-pulse`).
- `prefers-reduced-motion` desliga as animações.
