# 2026-11-17 — v2 / Section "Sobre mim" (estilo Lusion)

## O que mudou

- Nova section `#sobre` na rota `/v2`, logo abaixo de `#projetos`, inspirada no bloco
  "where creative ideas come to life" do [lusion.co](https://lusion.co/).
- Bio do fundador (programador fullstack, projetos entregues, IA/agentes/automações,
  mercado, marketing e bagagem empresarial), bilíngue (EN padrão + PT).
- Vídeo de transição de câmera adicionado em `public/v2/about-camera.mp4`
  (origem: `Documents/Empresa/Transição_de_Câmera_em_Vídeo.mp4`).

## Interatividade (GSAP + ScrollTrigger)

1. **Headline** — reveal por linha com máscara (`overflow-hidden` + `yPercent`), última linha em accent `#19E57B`.
2. **Bio** — highlight palavra a palavra no scroll (`scrub`): cada palavra acende de `DIM` para branco,
   com palavras-chave marcadas (`*palavra*`) acendendo em verde.
3. **Vídeo** — frame "abre" com `clip-path: inset(...)` + un-zoom (`scale 1.32 → 1`) no scroll;
   parallax leve; hover com parallax seguindo o mouse; autoplay via `IntersectionObserver`.
4. **Eyebrow / pills / CTA** — reveal com stagger; pills de capacidades; CTA rola para `#contato` via Lenis.
5. `prefers-reduced-motion`: estados finais aplicados sem animação.

## Arquivos

- `app/v2/_components/AboutSection.tsx` (novo)
- `app/v2/page.tsx` (monta a section após `ProjectsSection`)
- `app/v2/_i18n/translations.ts` (chaves `about.*`)
- `public/v2/about-camera.mp4` (novo asset)

## Fora de escopo

- WebGL/Three.js do Lusion (apenas DOM/GSAP)
- Section de contato (`#contato`) ainda não existe — CTA cai em `#projetos` como fallback

## Iteração — linha conectando projetos → about + vídeo scroll-driven

- **Linha contínua**: movida para a `ProjectsSection` como camada de fundo
  (`<svg>` em `z-0`, conteúdo em `z-10`), correndo atrás dos cards e desenhando
  (`stroke-dashoffset` via `getTotalLength`, scrub) conforme o scroll até chegar no About.
  Correção do tracejado: viewBox com escala uniforme (`xMidYMid slice`), sem `non-scaling-stroke`.
- **About virou sequência fixada (sticky)**: `section` com `height: 320vh` e um palco
  `sticky top-0 h-screen`. Uma timeline scrubada conduz a cena:
  - Painel A (vídeo à **direita** + texto "Programador fullstack") → transição →
    Painel B (vídeo à **esquerda** + texto "IA, mercado & negócio" + pills + CTA).
  - O vídeo **roda com o scroll**: `video.currentTime` preso ao `progress` do ScrollTrigger
    (sem autoplay), dando a sensação de reprodução conforme o usuário rola.
  - Headline revela por máscara dentro da timeline; `prefers-reduced-motion` mostra tudo estático.
- Chaves novas: `about.panel1Title/Text`, `about.panel2Title/Text` (removida `about.bio`).

## Iteração — vídeo sem travar na troca de lado

Causa: o MP4 original tinha **1 keyframe** (só no início). Qualquer
`currentTime = …` forçava o decoder a recomeçar do frame 0 → freeze,
pior durante o `xPercent` da troca de lado.

- Reencodado `public/v2/about-camera.mp4` com keyframe **a cada frame**
  (`-g 1 -bf 0 -movflags +faststart`), 192 I-frames / 8s @ 24fps.
- Scrub suavizado: alvo do scroll → lerp em rAF → seek só quando o
  anterior terminou (`seeked`). Sensação de play contínuo.
- `force3D` / `translateZ(0)` no wrapper; troca de lado um pouco mais longa
  (`scrub: 0.85`, duração ~0.26) para não competir com o decoder.
