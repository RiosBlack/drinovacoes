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

      <div className="mt-24 w-[90%]">
        <div className="mb-8 w-full pl-20">
          <h1 className="mt-6 bg-gradient-to-b from-purple-800 to-purple-400 bg-clip-text pb-2 text-6xl font-bold text-transparent">
            Todos os Projetos
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Explore todos os projetos desenvolvidos
          </p>
        </div>

        {projectsFormatted.length === 0 ? (
          <div className="flex h-[50vh] items-center justify-center">
            <p className="text-xl text-gray-500">Nenhum projeto encontrado.</p>
          </div>
        ) : (
          <div className="grid gap-4 pb-20">
            {/* Grid responsivo - adapta conforme quantidade de projetos */}
            {projectsFormatted.length === 1 && (
              <div className="flex h-[85vh] w-full items-center justify-center border border-zinc-800">
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
              <div className="flex h-[85vh] gap-4">
                {projectsFormatted.map((project) => (
                  <div
                    key={project.id}
                    className="flex-1 border border-zinc-800"
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
                <div className="flex h-[85vh] w-full items-center justify-center border border-zinc-800">
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
                <div className="flex h-[50vh] gap-4">
                  {projectsFormatted.slice(1, 3).map((project) => (
                    <div
                      key={project.id}
                      className="flex-1 border border-zinc-800"
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
                <div className="flex h-[85vh] w-full items-center justify-center border border-zinc-800">
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
                <div className="flex h-[50vh] gap-4">
                  {projectsFormatted.slice(1, 3).map((project) => (
                    <div
                      key={project.id}
                      className="flex-1 border border-zinc-800"
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
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {projectsFormatted.slice(3).map((project) => (
                      <div key={project.id} className="border border-zinc-800">
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
