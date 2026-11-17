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
    "hero.role": "SOFTWARE & AI",
    "hero.titleTop": "DR",
    "hero.titleBottom": "INOVAÇÕES",
    "hero.subtitle":
      "We design and engineer software, websites and AI automations that turn ideas into results.",
    "hero.ctaProjects": "See projects",
    "hero.ctaStart": "Start a project",
    "hero.contact": "Contact",
    "hero.portraitAlt": "Black and white portrait",
    "lang.toggle": "PT",
    "lang.current": "EN",
  },
  pt: {
    "preloader.loading": "Carregando",
    "preloader.enter": "Entrar",
    "hero.seal": "CONSTRUINDO · O · AMANHÃ · ",
    "hero.role": "SOFTWARE & IA",
    "hero.titleTop": "DR",
    "hero.titleBottom": "INOVAÇÕES",
    "hero.subtitle":
      "Projetamos e desenvolvemos software, sites e automações com IA que transformam ideias em resultados.",
    "hero.ctaProjects": "Ver projetos",
    "hero.ctaStart": "Iniciar um projeto",
    "hero.contact": "Contato",
    "hero.portraitAlt": "Retrato em preto e branco",
    "lang.toggle": "EN",
    "lang.current": "PT",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];
