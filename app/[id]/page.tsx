import { getPortifolioById } from "@/app/services/notion"; // ajuste o caminho conforme necessário
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

export default async function Page({ params }: Props) {
  const { id } = params;

  const data = await getPortifolioById(id);

  if (!data || data.length === 0) {
    return notFound();
  }

  const projeto = data[0];

  // Mapeamento das tecnologias para slugs do Simple Icons
  const techMapping: { [key: string]: string } = {
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

  // Pega as tecnologias do projeto e mapeia para slugs
  const projectTechs = [
    projeto.Tech1,
    projeto.Tech2,
    projeto.Tech3,
    projeto.Tech4,
    projeto.Tech5,
    projeto.Tech6,
  ]
    .filter(Boolean)
    .map((tech) => tech?.toLowerCase().trim())
    .map((tech) => techMapping[tech || ""] || tech)
    .filter((tech): tech is string => Boolean(tech)); // Type guard para garantir string[]

  // Se não tiver tecnologias do projeto, usa algumas padrão
  const slugs =
    projectTechs.length > 0
      ? projectTechs
      : ["react", "typescript", "nextdotjs", "nodejs", "tailwindcss"];

  return (
    <div className="relative flex h-full w-full flex-col items-center overflow-hidden">
      <Meteors number={30} />
      <HeaderMenu />
      <div className="mt-24 w-[90%]">
        <BoxReveal boxColor={"#6B21A8"} duration={1.0}>
          <>
            <h1 className="mt-12 text-7xl font-bold text-purple-800">
              {projeto.Projeto}
            </h1>
            <ButtonVerAoVivo link={projeto.Link || ""} />
          </>
        </BoxReveal>
        <div className="flex w-full flex-col items-center justify-center">
          <div className="my-16 w-[80%] text-xl/8">
            <BoxReveal boxColor={"#6B21A8"} duration={1.0}>
              <p className="mt-4 text-justify">{projeto.Descricoes}</p>
            </BoxReveal>
          </div>

          <AnimatedImages
            foto1={projeto.Foto1 || ""}
            foto2={projeto.Foto2 || ""}
            foto3={projeto.Foto3 || ""}
          />

          <AnimatedTechSection
            techs={slugs}
            originalTechs={[
              projeto.Tech1,
              projeto.Tech2,
              projeto.Tech3,
              projeto.Tech4,
              projeto.Tech5,
              projeto.Tech6,
            ].filter((tech): tech is string => Boolean(tech))}
          />
        </div>
      </div>
    </div>
  );
}
