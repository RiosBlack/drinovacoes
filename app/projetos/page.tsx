"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../_components/portfolio/Navbar";
import Footer from "../_components/portfolio/Footer";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import { getPortifolio } from "../services/notion";
import { PortfolioItem } from "../types/notion";
import fotoTeste from "../public/teste.jpg";

export default function ProjetosPage() {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useSmoothScroll();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getPortifolio();
        setProjects(data);
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      <Navbar />

      <section className="mx-auto max-w-[980px] px-6 pb-24 pt-28">
        <Link
          href="/"
          className="text-sm font-medium text-[#C9A227] transition-opacity hover:opacity-80"
        >
          ← Voltar
        </Link>

        <h1 className="mt-6 text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight text-[#1d1d1f]">
          Todos os projetos
        </h1>
        <p className="mt-3 text-lg text-[#86868b]">
          Explore o portfólio completo da DR Inovações.
        </p>

        {loading && (
          <p className="mt-16 text-center text-[#86868b]">Carregando...</p>
        )}

        {!loading && projects.length === 0 && (
          <p className="mt-16 text-center text-[#86868b]">
            Nenhum projeto encontrado.
          </p>
        )}

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const id = project.Index || "";
            const technologies = [
              project.Tech1,
              project.Tech2,
              project.Tech3,
              project.Tech4,
              project.Tech5,
              project.Tech6,
            ]
              .filter(Boolean)
              .join(" · ");

            return (
              <button
                key={id}
                type="button"
                onClick={() => id && router.push(`/${id}`)}
                className="group overflow-hidden rounded-2xl bg-white text-left shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e8ed]">
                  <Image
                    src={project.Miniatura || fotoTeste}
                    alt={project.Projeto || "Projeto"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs text-[#86868b]">{project.data}</p>
                  <h2 className="mt-1 text-lg font-semibold text-[#1d1d1f]">
                    {project.Projeto}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-[#86868b]">
                    {project.DescricaoBreve || project.Descricoes}
                  </p>
                  {technologies && (
                    <p className="mt-3 text-xs text-[#C9A227]">
                      {technologies}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
