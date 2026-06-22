import { getProjectBySlug } from "@/app/services/portfolio";
import { notFound } from "next/navigation";
import HeaderMenu from "../_components/home/headerMenu";
import ButtonVerAoVivo from "../_components/buttonVerAoVivo";
import { Meteors } from "@/components/magicui/meteors";
import AnimatedImages from "../_components/animated-images";
import { BoxReveal } from "@/components/magicui/box-reveal";
import AnimatedTechSection from "../_components/animated-tech-section";

interface Props {
  params: {
    id: string;
  };
}

const techMapping: Record<string, string> = {
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

function mapTechSlugs(technologies: string[]): string[] {
  return technologies
    .map((tech) => tech.toLowerCase().trim())
    .map((tech) => techMapping[tech] || tech)
    .filter(Boolean);
}

export default async function Page({ params }: Props) {
  const projeto = await getProjectBySlug(params.id);

  if (!projeto) {
    return notFound();
  }

  const slugs = mapTechSlugs(projeto.technologies);
  const [foto1, foto2, foto3] = projeto.gallery;

  return (
    <div className="relative flex h-full w-full flex-col items-center overflow-hidden">
      <Meteors number={30} />
      <HeaderMenu />
      <div className="mt-16 w-[95%] px-2 sm:mt-20 sm:w-[92%] sm:px-4 md:mt-24 md:w-[90%] md:px-0 lg:mt-24 lg:w-[90%] xl:mt-24 xl:w-[90%] 2xl:mt-24 2xl:w-[90%]">
        <BoxReveal boxColor={"#6B21A8"} duration={1.0}>
          <>
            <h1 className="mt-8 text-center text-3xl font-bold text-purple-800 sm:mt-10 sm:text-center sm:text-4xl md:mt-12 md:text-left md:text-5xl lg:mt-12 lg:text-left lg:text-6xl xl:mt-12 xl:text-left xl:text-7xl 2xl:mt-12 2xl:text-left 2xl:text-7xl">
              {projeto.title}
            </h1>
            {projeto.liveUrl && (
              <div className="mt-4 flex justify-center sm:mt-5 sm:justify-center md:mt-6 md:justify-start lg:mt-6 lg:justify-start xl:mt-6 xl:justify-start 2xl:mt-6 2xl:justify-start">
                <ButtonVerAoVivo link={projeto.liveUrl} />
              </div>
            )}
          </>
        </BoxReveal>
        <div className="flex w-full flex-col items-center justify-center">
          <div className="my-8 w-full text-base leading-relaxed sm:my-12 sm:w-[90%] sm:text-lg sm:leading-7 md:my-16 md:w-[85%] md:text-xl md:leading-8 lg:my-16 lg:w-[80%] lg:text-xl lg:leading-8 xl:my-16 xl:w-[80%] xl:text-xl xl:leading-8 2xl:my-16 2xl:w-[80%] 2xl:text-xl 2xl:leading-8">
            <BoxReveal boxColor={"#6B21A8"} duration={1.0}>
              <p className="mt-3 px-2 text-justify sm:mt-4 sm:px-4 md:mt-4 md:px-0 lg:mt-4 xl:mt-4 2xl:mt-4">
                {projeto.description}
              </p>
            </BoxReveal>
          </div>

          {(foto1 || foto2 || foto3) && (
            <div className="w-full px-2 sm:px-4 md:px-0">
              <AnimatedImages
                foto1={foto1 || ""}
                foto2={foto2 || ""}
                foto3={foto3 || ""}
              />
            </div>
          )}

          {projeto.technologies.length > 0 && (
            <div className="w-full px-2 sm:px-4 md:px-0">
              <AnimatedTechSection
                techs={slugs.length > 0 ? slugs : ["react", "typescript"]}
                originalTechs={projeto.technologies}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
