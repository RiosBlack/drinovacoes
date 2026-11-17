# v2 — Section Contato / “Let’s work together” (estilo Dennis Snellenberg)

**Data:** 2026-11-17  
**Status:** Aprovado em conversa (layout + motion + links); aguardando review do arquivo  
**Rota:** `/v2`  
**Âncora:** `#contato`  
**Referência visual:** [dennissnellenberg.com](https://dennissnellenberg.com/) — bloco “Let’s work together” + footer

## Objetivo

Adicionar a última section da reformulação v2: chamada para contato inspirada no CTA do Dennis Snellenberg, com o retrato enviado pelo usuário, botão circular abrindo WhatsApp, pills de contato e mini-footer (versão, horário local, sociais). Os links `#contato` do Hero e do About passam a ter destino real.

## Decisões fechadas

| Tema | Decisão |
|------|----------|
| Abordagem | Clone estrutural + motion leve (sem retrato seguindo o mouse) |
| CTA principal (círculo) | Abre WhatsApp `https://wa.me/5575981414537` |
| Cor do círculo | Verde DR `#19E57B` (não o azul do Dennis) |
| Pills | WhatsApp (mesmo link) + Instagram `https://www.instagram.com/drinovacoes/` |
| Footer | Version (`2026 © Edition`), Local time (`America/Bahia`, atualiza a cada 60s), Socials |
| Sociais no footer | **Somente Instagram** — sem LinkedIn |
| Retrato | Imagem enviada pelo usuário → `public/v2/contact-portrait.jpg` (máscara circular inline na headline) |
| i18n | EN padrão + PT via `translations.ts` (`contact.*`) |
| Accent / fundo | Fundo `#0A0A0A`, texto `#f5f5f7`, accent `#19E57B` |

## Fora de escopo

- Retrato magnético / cursor-follow
- LinkedIn (ou outras redes além do Instagram)
- Formulário de contato / e-mail mailto
- Página `/contact` separada
- Cursor customizado do Dennis
- Alterar o WhatsAppFloat global (permanece independente)

## Arquitetura

```
app/v2/
  page.tsx                              # monta ContactSection após AboutSection
  _components/
    ContactSection.tsx                  # section #contato (headline, CTA, pills, footer)
  _i18n/translations.ts                 # chaves contact.*
public/v2/
  contact-portrait.jpg                  # retrato B&W da CTA
changelogs/
  2026-11-17-v2-contact-section.md
AGENTS.md                               # entrada no changelog
```

### Fluxo

1. `page.tsx` renderiza `ContactSection` quando `preloaderDone` (igual Projects/About).
2. `ContactSection` usa `useLanguage()` para copy EN/PT.
3. Links externos: WhatsApp e Instagram com `target="_blank"` + `rel="noopener noreferrer"`.
4. Relógio: `Intl.DateTimeFormat` com `timeZone: "America/Bahia"`; `setInterval` 60s; cleanup no unmount.
5. Animações: GSAP + ScrollTrigger; magnetic só em `pointer: fine` e sem `prefers-reduced-motion`.

## Layout (desktop)

1. **Headline** — retrato circular (~64–96px) à esquerda de “Let’s work together” (display grande, 2 linhas se necessário); seta decorativa (SVG) à direita do bloco.
2. **Faixa CTA** — linha horizontal (`1px` / `white/15`) com botão circular verde centralizado sobre a linha; label “Get in touch” / “Fale comigo”.
3. **Pills** — dois botões outline arredondados: WhatsApp + Instagram.
4. **Footer** — três colunas: Version | Local time | Socials (só Instagram).

### Mobile

- Stack vertical; headline com retrato menor acima ou inline reduzido.
- Botão circular menor (~120–140px).
- Pills em coluna full-width.
- Footer em coluna com gaps generosos.

## Motion

| Elemento | Comportamento |
|----------|----------------|
| Headline + retrato | Reveal por máscara / fade-up ao entrar no viewport |
| Botão circular + pills | Magnetic leve no hover (desktop); scale press `0.98` |
| Footer | Fade-up com stagger leve |
| `prefers-reduced-motion` | Estados finais estáticos; sem magnetic |

## Copy i18n

| Key | EN | PT |
|-----|----|----|
| `contact.headline` | Let’s work together | Vamos trabalhar juntos |
| `contact.cta` | Get in touch | Fale comigo |
| `contact.whatsapp` | WhatsApp | WhatsApp |
| `contact.instagram` | Instagram | Instagram |
| `contact.versionLabel` | Version | Versão |
| `contact.versionValue` | 2026 © Edition | 2026 © Edição |
| `contact.timeLabel` | Local time | Horário local |
| `contact.socialsLabel` | Socials | Redes |
| `contact.portraitAlt` | Portrait of Douglas Rios | Retrato de Douglas Rios |

Mensagem pré-preenchida do WhatsApp (opcional, alinhada ao site atual):  
EN/PT curta do tipo “Olá! Gostaria de conversar sobre um projeto.”

## Integração com âncoras existentes

- Hero (`#contato`) e About CTA (`#contato`) já existem; após montar a section, o scroll Lenis resolve corretamente.
- Remover qualquer fallback temporário do About que caía em `#projetos` se ainda houver.

## Critérios de sucesso

- Em `/v2`, após About, a section `#contato` aparece com a composição acima.
- Clique no círculo e na pill WhatsApp abre o WhatsApp correto.
- Pill e footer Socials abrem só Instagram.
- Relógio mostra horário de Bahia e atualiza.
- Sem LinkedIn em lugar nenhum desta section.
- EN/PT e `prefers-reduced-motion` funcionam.
- Changelog + `AGENTS.md` atualizados.
