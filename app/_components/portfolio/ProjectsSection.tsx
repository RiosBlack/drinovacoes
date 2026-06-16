"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export type ProjectCard = {
  id: string;
  title: string;
  description: string;
  technologies: string;
  date: string;
  image: string | StaticImageData;
};

type Props = {
  projects: ProjectCard[];
  onProjectClick: (id: string) => void;
};

export default function ProjectsSection({ projects, onProjectClick }: Props) {
  const featured = projects.slice(0, 3);

  return (
    <section id="projetos" className="bg-[#f5f5f7] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[980px]">
        <p className="reveal-text text-sm font-medium text-[#86868b]">
          Portfólio
        </p>
        <h2 className="reveal-text mt-2 text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight text-[#1d1d1f]">
          Projetos selecionados.
        </h2>

        <div className="project-grid mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => onProjectClick(project.id)}
              className="project-card group overflow-hidden rounded-2xl bg-white text-left shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="project-card-image relative aspect-[4/3] overflow-hidden bg-[#e8e8ed]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-medium text-[#86868b]">
                  {project.date}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-[#1d1d1f]">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-[#86868b]">
                  {project.description}
                </p>
                <p className="mt-3 text-xs text-[#C9A227]">
                  {project.technologies}
                </p>
              </div>
            </button>
          ))}
        </div>

        {projects.length > 3 && (
          <div className="mt-12 text-center">
            <Link
              href="/projetos"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#C9A227] transition-opacity hover:opacity-80"
            >
              Ver todos os projetos
              <span aria-hidden>→</span>
            </Link>
          </div>
        )}

        {projects.length === 0 && (
          <p className="mt-12 text-center text-[#86868b]">
            Carregando projetos...
          </p>
        )}
      </div>
    </section>
  );
}
