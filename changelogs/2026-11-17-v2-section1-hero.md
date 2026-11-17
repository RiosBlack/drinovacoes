# 2026-11-17 — v2 / Section 1 (Preloader + Hero vivo)

## Contexto

Início da reformulação completa do site (nova direção visual verde-neon sobre
preto, inspirada na referência "XERO DESIGNS"), construída **section por
section** numa rota isolada `/v2` para não quebrar o site atual. Objetivo:
mostrar melhor o portfólio, captar mais leads e ter um site mais interativo,
porém leve.

## O que foi feito (Section 1)

- **Rota nova `/v2`** (`app/v2/page.tsx`) com `LanguageProvider` + smooth scroll
  (Lenis, reaproveitando o hook existente) + trava de scroll durante o preloader.
- **i18n leve próprio** (sem biblioteca nova) — EN como padrão + PT:
  - `app/v2/_i18n/translations.ts` — dicionário por seção.
  - `app/v2/_i18n/LanguageProvider.tsx` — contexto, `useLanguage`, persistência
    em `localStorage` e sincronização do atributo `lang` do documento.
  - `app/v2/_components/LanguageToggle.tsx` — alternador EN/PT.
- **Preloader animado** (`app/v2/_components/Preloader.tsx`): logo + contador
  `0→100%` em verde-neon + barra de progresso + selo giratório; ao concluir,
  a "cortina" sobe e revela o Hero.
- **Selo giratório** (`app/v2/_components/RotatingSeal.tsx`): texto circular em
  SVG girando via CSS, com núcleo neon. Texto do selo também é bilíngue.
- **HeroSection** (`app/v2/_components/HeroSection.tsx`): frame arredondado com
  borda, logo, redes sociais na lateral, título `DR / INOVAÇÕES`, selo + acento
  verde, subtítulo bilíngue, CTAs e tag `SOFTWARE & IA/AI`.

## Decisões

- Verde-neon `#19E57B` vira a nova direção da marca (substitui o dourado `#E8C547`).
- i18n sem dependência extra, para manter o bundle pequeno.
- GSAP via `gsap.context()` + `ctx.revert()` (o pacote `@gsap/react`/`useGSAP`
  não está instalado).

## Técnico / Performance

- Animações só com `transform`/`opacity`.
- `prefers-reduced-motion` respeitado (preloader instantâneo, sem float/parallax).
- Vídeos com `preload="metadata"`, `muted`, `loop`, `playsInline`.
- Keyframes isolados (`dr-spin-*`) adicionados ao `globals.css` sem afetar o site atual.
- Build OK: `/v2` ≈ 8 kB (151 kB First Load) vs. home atual 257 kB.

## Iterações de design

- O conceito inicial de "imagens voando" (campo disperso) e a versão em colunas
  organizadas foram descartados a pedido do cliente. O Hero final ficou limpo:
  só o título central + selo + brilho verde, sem imagens de fundo. Frame do Hero
  passou a ocupar a largura total da página (max 2560px).
- Logo do header e do preloader trocados pelo símbolo verde `dr` (`logo-dr-mark.png`).
- Fundo da Section 1: componente **LetterGlitch** (React Bits, WebGL2) com cores
  branca/`#19E57B`, `centerFade` para manter o título legível e interação no cursor.

## Pendências / próximos passos

- Validar links reais das redes sociais (hoje apontam para os domínios raiz).
- Próximas sections serão empilhadas em `/v2` e, ao final, faremos a troca pela home.
