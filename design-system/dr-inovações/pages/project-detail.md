# Project Detail Page Overrides

> **PROJECT:** DR Inovações
> **Page Type:** Project Detail (case study)

> ⚠️ **IMPORTANT:** Rules in this file **override** the Master file.
> Only deviations from the Master are documented here.

---

## Page-Specific Rules

### Layout Overrides

- **Max Width:** 980px (alinhado ao portfólio)
- **Layout:** Single column, centered
- **Sections:**
  1. Hero — eyebrow da categoria, título, data, shortDescription, CTA "Ver ao vivo"
  2. Visual principal — coverImage em destaque
  3. Descrição — texto longo com boa legibilidade
  4. Galeria — imagens do projeto (visual-first)
  5. Stack técnica — pills com ícones SVG
  6. CTA final — voltar ao portfólio + contato

### Spacing Overrides

- **Content Density:** Low — foco em clareza e imagens
- **Section padding:** `py-16 md:py-24`

### Typography Overrides

- Título: `text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight`
- Corpo: `text-lg leading-relaxed text-[#86868b]`

### Color Overrides

- **Strategy:** Fundo `#f5f5f7`, cards `#ffffff`, accent da categoria via `category.accentColor`
- **CTA:** Dourado `#C9A227` (marca DR)

### Component Overrides

- Nav clara com blur ao scroll (variante do Navbar da home)
- Sem confetti ou efeitos roxos legados
- Transições 150–300ms; respeitar `prefers-reduced-motion`

---

## Anti-patterns (esta página)

- Emojis como ícones
- Layout roxo legado (Meteors, BoxReveal)
- Animações excessivas sem fallback de reduced-motion
