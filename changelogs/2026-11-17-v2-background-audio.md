# 2026-11-17 — v2 / Música de fundo + mute

## Contexto

Adicionar trilha de fundo na `/v2`, iniciando após o preloader, com controle
para ligar/desligar ao lado do seletor de idioma.

## O que foi feito

- Áudio em `public/v2/bg-music.mp3`.
- `BackgroundAudioProvider` + `AudioToggle` em `app/v2/_components/BackgroundAudio.tsx`.
- Toca em loop (volume 0.35) quando `active` fica true (fim do preloader).
- Se o browser bloquear autoplay, libera no próximo clique/tecla.
- Preferência de mute em `localStorage` (`dr-v2-bg-muted`).
- Botão de volume ao lado do `LanguageToggle` no hero.
