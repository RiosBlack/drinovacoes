"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPortifolio } from "@/app/services/notion";
import { PortfolioItem } from "@/app/types/notion";
import HeaderMenu from "../_components/home/headerMenu";
import CardProject from "../_components/cardProject";
import { Meteors } from "@/components/magicui/meteors";

export default function ProjetosPage() {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getPortifolio();
        setProjects(data);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const handleProjectClick = (id: string) => {
    router.push(`/${id}`);
  };

  if (loading) {
    return (
      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        <Meteors number={30} />
        <HeaderMenu />
        <div className="flex items-center justify-center">
          <div className="text-2xl text-purple-600">Carregando projetos...</div>
        </div>
      </div>
    );
  }

  // Mapear projetos para o formato esperado pelo CardProject
  const projectsFormatted = projects.map((project) => ({
    id: project.Index || "",
    servicoDescricao: project.Descricoes || "",
    data: project.data || "",
    titleCard: project.Projeto || "",
    tagServico: project.DescricaoBreve || "",
    tagTecnologia: [
      project.Tech1,
      project.Tech2,
      project.Tech3,
      project.Tech4,
      project.Tech5,
      project.Tech6,
    ]
      .filter(Boolean)
      .join(", "),
    image: project.Miniatura || "",
  }));

  return (
    <div className="relative flex h-full w-full flex-col items-center overflow-hidden">
      <Meteors number={30} />
      <HeaderMenu />

      <div className="mt-16 w-[95%] sm:mt-20 sm:w-[92%] md:mt-24 md:w-[90%] lg:mt-24 lg:w-[90%] xl:mt-24 xl:w-[90%] 2xl:mt-24 2xl:w-[90%]">
        <div className="mb-6 w-full pl-8 sm:mb-7 sm:pl-12 md:mb-8 md:pl-16 lg:mb-8 lg:pl-20 xl:mb-8 xl:pl-20 2xl:mb-8 2xl:pl-20">
          <h1 className="mt-4 bg-gradient-to-b from-purple-800 to-purple-400 bg-clip-text pb-2 text-3xl font-bold text-transparent sm:mt-5 sm:text-4xl md:mt-6 md:text-5xl lg:mt-6 lg:text-6xl xl:mt-6 xl:text-6xl 2xl:mt-6 2xl:text-6xl">
            Todos os Projetos
          </h1>
          <p className="mt-3 text-base text-gray-300 sm:mt-4 sm:text-lg md:mt-4 md:text-lg lg:mt-4 lg:text-lg xl:mt-4 xl:text-lg 2xl:mt-4 2xl:text-lg">
            Explore todos os projetos desenvolvidos
          </p>
        </div>

        {projectsFormatted.length === 0 ? (
          <div className="flex h-[40vh] items-center justify-center sm:h-[45vh] md:h-[50vh] lg:h-[50vh] xl:h-[50vh] 2xl:h-[50vh]">
            <p className="text-lg text-gray-500 sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl">
              Nenhum projeto encontrado.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 pb-12 sm:gap-4 sm:pb-16 md:gap-4 md:pb-20 lg:gap-4 lg:pb-20 xl:gap-4 xl:pb-20 2xl:gap-4 2xl:pb-20">
            {/* Grid responsivo - adapta conforme quantidade de projetos */}
            {projectsFormatted.length === 1 && (
              <div className="flex h-[50vh] w-full items-center justify-center border border-zinc-800 sm:h-[60vh] md:h-[70vh] lg:h-[85vh] xl:h-[85vh] 2xl:h-[85vh]">
                <CardProject
                  servicoDescricao={projectsFormatted[0].servicoDescricao}
                  data={projectsFormatted[0].data}
                  titleCard={projectsFormatted[0].titleCard}
                  tagServico={projectsFormatted[0].tagServico}
                  tagTecnologia={projectsFormatted[0].tagTecnologia}
                  image={projectsFormatted[0].image}
                  onClick={() => handleProjectClick(projectsFormatted[0].id)}
                />
              </div>
            )}

            {projectsFormatted.length === 2 && (
              <div className="flex h-auto flex-col gap-3 sm:flex-col sm:gap-4 md:h-[70vh] md:flex-row md:gap-4 lg:h-[85vh] lg:flex-row lg:gap-4 xl:h-[85vh] xl:flex-row xl:gap-4 2xl:h-[85vh] 2xl:flex-row 2xl:gap-4">
                {projectsFormatted.map((project) => (
                  <div
                    key={project.id}
                    className="h-[40vh] flex-1 border border-zinc-800 sm:h-[45vh] md:h-full lg:h-full xl:h-full 2xl:h-full"
                  >
                    <CardProject
                      servicoDescricao={project.servicoDescricao}
                      data={project.data}
                      titleCard={project.titleCard}
                      tagServico={project.tagServico}
                      tagTecnologia={project.tagTecnologia}
                      image={project.image}
                      onClick={() => handleProjectClick(project.id)}
                    />
                  </div>
                ))}
              </div>
            )}

            {projectsFormatted.length === 3 && (
              <>
                <div className="flex h-[40vh] w-full items-center justify-center border border-zinc-800 sm:h-[50vh] md:h-[60vh] lg:h-[85vh] xl:h-[85vh] 2xl:h-[85vh]">
                  <CardProject
                    servicoDescricao={projectsFormatted[0].servicoDescricao}
                    data={projectsFormatted[0].data}
                    titleCard={projectsFormatted[0].titleCard}
                    tagServico={projectsFormatted[0].tagServico}
                    tagTecnologia={projectsFormatted[0].tagTecnologia}
                    image={projectsFormatted[0].image}
                    onClick={() => handleProjectClick(projectsFormatted[0].id)}
                  />
                </div>
                <div className="flex h-auto flex-col gap-3 sm:flex-col sm:gap-4 md:h-[40vh] md:flex-row md:gap-4 lg:h-[50vh] lg:flex-row lg:gap-4 xl:h-[50vh] xl:flex-row xl:gap-4 2xl:h-[50vh] 2xl:flex-row 2xl:gap-4">
                  {projectsFormatted.slice(1, 3).map((project) => (
                    <div
                      key={project.id}
                      className="h-[35vh] flex-1 border border-zinc-800 sm:h-[40vh] md:h-full lg:h-full xl:h-full 2xl:h-full"
                    >
                      <CardProject
                        servicoDescricao={project.servicoDescricao}
                        data={project.data}
                        titleCard={project.titleCard}
                        tagServico={project.tagServico}
                        tagTecnologia={project.tagTecnologia}
                        image={project.image}
                        onClick={() => handleProjectClick(project.id)}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {projectsFormatted.length >= 4 && (
              <>
                {/* Primeira linha - projeto em destaque */}
                <div className="flex h-[40vh] w-full items-center justify-center border border-zinc-800 sm:h-[50vh] md:h-[60vh] lg:h-[85vh] xl:h-[85vh] 2xl:h-[85vh]">
                  <CardProject
                    servicoDescricao={projectsFormatted[0].servicoDescricao}
                    data={projectsFormatted[0].data}
                    titleCard={projectsFormatted[0].titleCard}
                    tagServico={projectsFormatted[0].tagServico}
                    tagTecnologia={projectsFormatted[0].tagTecnologia}
                    image={projectsFormatted[0].image}
                    onClick={() => handleProjectClick(projectsFormatted[0].id)}
                  />
                </div>

                {/* Segunda linha - 2 projetos */}
                <div className="flex h-auto flex-col gap-3 sm:flex-col sm:gap-4 md:h-[40vh] md:flex-row md:gap-4 lg:h-[50vh] lg:flex-row lg:gap-4 xl:h-[50vh] xl:flex-row xl:gap-4 2xl:h-[50vh] 2xl:flex-row 2xl:gap-4">
                  {projectsFormatted.slice(1, 3).map((project) => (
                    <div
                      key={project.id}
                      className="h-[35vh] flex-1 border border-zinc-800 sm:h-[40vh] md:h-full lg:h-full xl:h-full 2xl:h-full"
                    >
                      <CardProject
                        servicoDescricao={project.servicoDescricao}
                        data={project.data}
                        titleCard={project.titleCard}
                        tagServico={project.tagServico}
                        tagTecnologia={project.tagTecnologia}
                        image={project.image}
                        onClick={() => handleProjectClick(project.id)}
                      />
                    </div>
                  ))}
                </div>

                {/* Projetos restantes em grid */}
                {projectsFormatted.length > 3 && (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-1 sm:gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-4 xl:grid-cols-3 xl:gap-4 2xl:grid-cols-3 2xl:gap-4">
                    {projectsFormatted.slice(3).map((project) => (
                      <div
                        key={project.id}
                        className="h-[35vh] border border-zinc-800 sm:h-[40vh] md:h-[45vh] lg:h-[50vh] xl:h-[50vh] 2xl:h-[50vh]"
                      >
                        <CardProject
                          servicoDescricao={project.servicoDescricao}
                          data={project.data}
                          titleCard={project.titleCard}
                          tagServico={project.tagServico}
                          tagTecnologia={project.tagTecnologia}
                          image={project.image}
                          onClick={() => handleProjectClick(project.id)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
