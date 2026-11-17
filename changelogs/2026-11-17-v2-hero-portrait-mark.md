# 2026-11-17 — v2 / Marca com retrato no hero

## Contexto

O acento verde sob o título (barra fina inclinada) foi trocado por uma marca
com o retrato. A referência usa uma cápsula horizontal neon com corte diagonal
e foto circular por cima. Este modelo é outro: placa vertical com o retrato
na frente e a lâmina verde aparecendo atrás, nas pontas.

## O que foi feito

- Novo componente `app/v2/_components/PortraitMark.tsx`.
- Foto em `public/v2/hero-portrait.jpg`.
- `HeroSection` passa a renderizar selo + `PortraitMark`.
- Alt do retrato no dicionário (`hero.portraitAlt`, EN e PT).

## Iteração 3

- O hover não troca mais o retrato de lugar com o selo.
- Com o ponteiro sobre o retrato, o canto verde some de cima e reaparece embaixo, e fica tremendo no lugar até o ponteiro sair.

## Iteração 2

- Posição inicial invertida: retrato à esquerda, selo à direita. O hover continua trocando os dois.
- Formato do retrato alinhado ao logo: quadrado com o canto superior direito cortado, e esse canto em verde-neon.

## Iteração

- Retrato espelhado (`scaleX(-1)`) para o olhar ficar à esquerda.
- Formato trocado de placa arredondada para círculo, com a lâmina neon à direita.
- No hover do par (selo + retrato), os dois tremem e trocam de posição. Ao sair, voltam.

## Decisões

- A lâmina fica atrás da placa e gira ~18°, para ler como um corte sem copiar
  a cápsula horizontal da referência.
- Anel fino branco na placa para o recorte não sumir no fundo preto.
