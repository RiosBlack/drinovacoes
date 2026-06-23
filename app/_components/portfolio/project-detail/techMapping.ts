export const techMapping: Record<string, string> = {
  react: "react",
  "next.js": "nextdotjs",
  nextjs: "nextdotjs",
  typescript: "typescript",
  javascript: "javascript",
  "node.js": "nodedotjs",
  nodejs: "nodedotjs",
  express: "express",
  mongodb: "mongodb",
  postgresql: "postgresql",
  mysql: "mysql",
  prisma: "prisma",
  tailwind: "tailwindcss",
  tailwindcss: "tailwindcss",
  css: "css3",
  css3: "css3",
  html: "html5",
  html5: "html5",
  flutter: "flutter",
  dart: "dart",
  firebase: "firebase",
  aws: "amazonaws",
  vercel: "vercel",
  docker: "docker",
  git: "git",
  github: "github",
  figma: "figma",
  java: "java",
  python: "python",
  php: "php",
  laravel: "laravel",
  vue: "vuedotjs",
  "vue.js": "vuedotjs",
  angular: "angular",
  svelte: "svelte",
  nginx: "nginx",
  jest: "jest",
  cypress: "cypress",
};

export function mapTechSlugs(technologies: string[]): string[] {
  return technologies
    .map((tech) => tech.toLowerCase().trim())
    .map((tech) => techMapping[tech] || tech)
    .filter(Boolean);
}
