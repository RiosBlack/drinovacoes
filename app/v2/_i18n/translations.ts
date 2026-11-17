export type Language = "en" | "pt";

export const DEFAULT_LANGUAGE: Language = "en";

/**
 * Dicionário leve de traduções da v2.
 * Chaves em notação por seção para escalar conforme novas sections entram.
 */
export const translations = {
  en: {
    "preloader.loading": "Loading",
    "preloader.enter": "Enter",
    "hero.seal": "SHAPING · TOMORROW · ",
    "hero.role": "SOFTWARE, WEBSITES & AI",
    "hero.titleTop": "DR",
    "hero.titleBottom": "INOVAÇÕES",
    "hero.subtitle":
      "We design and engineer software, websites and AI automations that turn ideas into results.",
    "hero.ctaProjects": "See projects",
    "hero.ctaStart": "Start a project",
    "hero.contact": "Contact",
    "hero.portraitAlt": "Black and white portrait",
    "audio.mute": "Mute background music",
    "audio.unmute": "Unmute background music",
    "lang.toggle": "PT",
    "lang.current": "EN",
    "projects.title": "Projects",
    "projects.description":
      "Pick a category and browse the work we ship — software, websites, e-commerce and AI.",
    "projects.all": "All",
    "projects.categoryLabel": "Category",
    "projects.open": "Open project",
    "projects.prev": "Previous",
    "projects.next": "Next",
    "projects.page": "Page",
    "about.eyebrow": "About me",
    "about.headline": "WHERE IDEAS / TURN INTO / SOFTWARE",
    "about.panel1Title": "Fullstack developer",
    "about.panel1Text":
      "Deep, hands-on experience in software development — with many projects delivered and consolidated in production.",
    "about.panel2Title": "AI, market & business",
    "about.panel2Text":
      "I design AI agents and automations, combining real market insight, marketing and solid business expertise.",
    "about.pills":
      "Fullstack|AI & Agents|Automations|Marketing|Business Vision",
    "about.videoAlt": "Camera transition showcase video",
    "about.cta": "Let's build together",
  },
  pt: {
    "preloader.loading": "Carregando",
    "preloader.enter": "Entrar",
    "hero.seal": "CONSTRUINDO · O · AMANHÃ · ",
    "hero.role": "SOFTWARE, WEBSITES & IA",
    "hero.titleTop": "DR",
    "hero.titleBottom": "INOVAÇÕES",
    "hero.subtitle":
      "Projetamos e desenvolvemos software, sites e automações com IA que transformam ideias em resultados.",
    "hero.ctaProjects": "Ver projetos",
    "hero.ctaStart": "Iniciar um projeto",
    "hero.contact": "Contato",
    "hero.portraitAlt": "Retrato em preto e branco",
    "audio.mute": "Desligar música de fundo",
    "audio.unmute": "Ligar música de fundo",
    "lang.toggle": "EN",
    "lang.current": "PT",
    "projects.title": "Projetos",
    "projects.description":
      "Escolha a categoria e veja o que entregamos — software, sites, e-commerce e IA.",
    "projects.all": "Todos",
    "projects.categoryLabel": "Categoria",
    "projects.open": "Abrir projeto",
    "projects.prev": "Anterior",
    "projects.next": "Próxima",
    "projects.page": "Página",
    "about.eyebrow": "Sobre mim",
    "about.headline": "ONDE IDEIAS / VIRAM / SOFTWARE",
    "about.panel1Title": "Programador fullstack",
    "about.panel1Text":
      "Larga experiência prática em desenvolvimento de software — com diversos projetos entregues e consolidados em produção.",
    "about.panel2Title": "IA, mercado & negócio",
    "about.panel2Text":
      "Crio agentes e automações com IA, somando visão de mercado, marketing e uma sólida bagagem empresarial.",
    "about.pills":
      "Fullstack|IA & Agentes|Automações|Marketing|Visão Empresarial",
    "about.videoAlt": "Vídeo com transição de câmera",
    "about.cta": "Vamos construir juntos",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];
