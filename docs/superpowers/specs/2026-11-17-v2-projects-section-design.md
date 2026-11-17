# v2 — Section Projetos (estilo mowa.studio)

**Data:** 2026-11-17  
**Status:** Aprovado em conversa (arquitetura + UI); aguardando review do arquivo  
**Rota:** `/v2`  
**Referência visual:** [mowa.studio — #projekte](https://mowa.studio/#projekte)

## Objetivo

Adicionar a segunda section da reformulação v2: grade de projetos com filtros por categoria, vídeos nos cards e efeitos de reveal/hover inspirados no mowa, usando dados estáticos em JSON. O CTA “Ver projetos” do hero faz scroll suave via Lenis até `#projetos`.

## Decisões fechadas

| Tema | Decisão |
|------|----------|
| Conteúdo | Projetos reais da DR; seed com os 4 `.webm` em `public/` |
| Clique no card | Abre `href` do JSON em **nova aba** (`target="_blank"`, `rel="noopener noreferrer"`) |
| Filtros | Chips funcionais com contagem (estilo mowa) |
| Fidelidade visual | CSS + GSAP/ScrollTrigger; **sem** WebGL/fisheye nesta versão |
| Arquitetura | Section monolítica `ProjectsSection` + JSON |
| Accent | Verde DR `#19E57B` no chip ativo (não o azul do mowa) |

## Fora de escopo

- Efeito WebGL `mowa-gfx-layer` / distorção fisheye
- Carrossel flutuante de projetos do hero do mowa
- Página de detalhe de projeto na v2
- CMS/Sanity para esta section (dados só no JSON)

## Arquitetura

```
app/v2/
  page.tsx                         # monta ProjectsSection após Hero
  _data/projects.json              # fonte de verdade dos projetos
  _components/
    ProjectsSection.tsx            # section #projetos (header, chips, grid, animações)
    HeroSection.tsx                # CTA → Lenis.scrollTo('#projetos')
  _i18n/translations.ts            # strings da section (EN/PT)
app/hooks/useSmoothScroll.ts       # getLenis() já existente — reutilizar
```

### Fluxo de dados

1. `ProjectsSection` importa `projects.json`.
2. Categorias e contagens são derivadas dos projetos (não há lista separada de categorias no JSON).
3. Estado local `activeCategory: "all" | categoryId` filtra a lista exibida.
4. Idioma vem de `useLanguage()`; títulos usam `title[lang]`.

### Schema JSON

```json
{
  "categories": [
    {
      "id": "websites",
      "label": { "en": "Websites", "pt": "Sites" }
    }
  ],
  "projects": [
    {
      "id": "site",
      "title": { "en": "Websites", "pt": "Sites" },
      "category": "websites",
      "video": "/Site.webm",
      "href": "https://example.com",
      "featured": true
    }
  ]
}
```

Notas:

- `categories` existe para ordem estável e labels i18n dos chips; só categorias com `count > 0` aparecem (além de “Todos”).
- Paths de vídeo: preferir nomes **sem espaço** em `public/` (renomear `Automação com IA.webm` → `Automacao-com-IA.webm` ou similar) para evitar URLs quebradas.
- `href` placeholder no seed pode ser URL real da DR ou `#` temporário — implementação deve usar links válidos quando existirem; se `href` for `#` ou vazio, o card permanece não-navegável (ou abre `#` — preferir omitir clique / `aria-disabled` se sem URL).

**Seed inicial (4 projetos)**

| id | vídeo atual | categoria sugerida |
|----|-------------|--------------------|
| site | `/Site.webm` | websites |
| ecommerce | `/E-commerce.webm` | ecommerce |
| sistemas | `/Sistemas.webm` | software |
| automacao-ia | `/Automação com IA.webm` → renomear | ai |

## UI (espelho mowa)

1. **Header:** título grande “Projects” / “Projetos” + ícone de seta diagonal (↗).
2. **Descrição** curta à direita (i18n).
3. **Chips:** “All/Todos” + categorias com contagem; chip ativo preenchido `#19E57B` / texto preto; inativos borda clara.
4. **Grid:** 2 colunas desktop, 1 mobile; gap generoso; fundo `#0A0A0A` alinhado ao hero.
5. **Card:**
   - Mídia `aspect-ratio: 16 / 10`, `border-radius: 12px`, vídeo `object-fit: cover`
   - Hover: overlay escuro leve + seta circular no canto; leve `scale` na mídia
   - Meta: seta circular + título + badge “Category / Categoria · {label}`
6. Sem cards “genéricos” extras (stats, promo); uma composição por section.

## Interações & motion

- **CTA hero:** interceptar click em `#projetos`; `getLenis()?.scrollTo('#projetos', { offset: 0 })`; fallback `scrollIntoView({ behavior: 'smooth' })`.
- **Reveal:** ao entrar no viewport (ScrollTrigger), título/descrição/chips/cards com `opacity` + `translateY`, easing ~`cubic-bezier(0.22, 1, 0.36, 1)`.
- **Filtro:** trocar lista com fade/stagger curto; `prefers-reduced-motion` → sem motion, só troca de lista.
- **Vídeo:** `muted` `loop` `playsInline` `preload="metadata"`; play quando card visível ou no hover; pause ao sair (economizar CPU).
- **Link:** `<a href=... target="_blank" rel="noopener noreferrer">`.

## i18n

Novas chaves (exemplo):

- `projects.title`
- `projects.description`
- `projects.all`
- `projects.categoryLabel` (“Category” / “Categoria”)
- `projects.open` (acessível: “Open project” / “Abrir projeto”)

## Acessibilidade

- Section com `id="projetos"` e heading `h2`.
- Chips: `role="group"` + `aria-pressed` no ativo.
- Vídeos `aria-hidden`; nome do projeto no texto do link.
- Contraste do chip ativo verde/preto suficiente.

## Critérios de sucesso

1. Em `/v2`, após o hero, existe `#projetos` com visual próximo ao mowa (sem WebGL).
2. “Ver projetos” scrolla com Lenis até a section.
3. Filtrar por chip atualiza o grid e as contagens batem com o JSON.
4. Clique no card abre o `href` em nova aba.
5. Funciona em mobile (1 coluna) e respeita `prefers-reduced-motion`.
6. Changelog + referência em `AGENTS.md` após implementação.

## Riscos

- Nomes de arquivo com espaço/acento quebram path — mitigar renomeando assets.
- Muitos vídeos autoplay — limitar play aos cards em viewport.
- Paridade 100% com mowa é impossível sem WebGL; meta é look & feel + layout/efeitos CSS/GSAP.
