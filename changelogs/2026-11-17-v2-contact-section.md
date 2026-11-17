# 2026-11-17 — v2 / Section contato (“Let’s work together”)

## O que mudou

- Nova section `#contato` na rota `/v2`, após `#sobre`, inspirada no bloco
  “Let’s work together” de [dennissnellenberg.com](https://dennissnellenberg.com/).
- Retrato circular (`public/v2/contact-portrait.jpg`), headline display, botão
  circular verde `#19E57B` abrindo WhatsApp, pills WhatsApp + Instagram
  (uma em cada lado), e footer só com versão.
- i18n EN/PT (`contact.*`). Hero/About já apontavam para `#contato` — agora o
  destino existe; removido fallback do About para `#projetos`.

## Interatividade

- Reveal GSAP + ScrollTrigger ao entrar no viewport.
- Magnetic leve no círculo e nas pills (desktop, `pointer: fine`).
- `prefers-reduced-motion`: estados finais sem magnetic.

## Arquivos

- `app/v2/_components/ContactSection.tsx` (novo)
- `app/v2/page.tsx`
- `app/v2/_i18n/translations.ts`
- `app/v2/_components/AboutSection.tsx` (scroll só `#contato`)
- `public/v2/contact-portrait.jpg`

## Fora de escopo

- LinkedIn / outras redes
- Retrato seguindo o mouse
- Formulário / e-mail
