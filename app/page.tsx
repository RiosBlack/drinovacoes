"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StaticImageData } from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./_components/portfolio/Navbar";
import Hero from "./_components/portfolio/Hero";
import Highlights from "./_components/portfolio/Highlights";
import ServicesSection from "./_components/portfolio/ServicesSection";
import ProjectsSection, {
  ProjectCard,
} from "./_components/portfolio/ProjectsSection";
import ProcessSection from "./_components/portfolio/ProcessSection";
import ContactSection from "./_components/portfolio/ContactSection";
import Footer from "./_components/portfolio/Footer";
import PortfolioAnimations from "./_components/portfolio/PortfolioAnimations";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { getPortifolio } from "./services/notion";
import { PortfolioItem } from "./types/notion";
import fotoTeste from "./public/teste.jpg";

export default function Home() {
  const [projects, setProjects] = useState<ProjectCard[]>([]);
  const router = useRouter();

  useSmoothScroll();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const portfolioData = await getPortifolio();
        const mapped = portfolioData.map((item: PortfolioItem) => ({
          id: item.Index || "",
          title: item.Projeto || "Projeto sem título",
          description: item.DescricaoBreve || "Projeto personalizado",
          technologies:
            [
              item.Tech1,
              item.Tech2,
              item.Tech3,
              item.Tech4,
              item.Tech5,
              item.Tech6,
            ]
              .filter(Boolean)
              .join(" · ") || "Tecnologias diversas",
          date: item.data || "",
          image: (item.Miniatura as string | StaticImageData) || fotoTeste,
        }));
        setProjects(mapped);
      } catch {
        setProjects([]);
      }
    }

    fetchProjects();
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      const timer = setTimeout(() => ScrollTrigger.refresh(), 300);
      return () => clearTimeout(timer);
    }
  }, [projects]);

  const handleProjectClick = (projectId: string) => {
    if (projectId) router.push(`/${projectId}`);
  };

  return (
    <main className="portfolio-page bg-black">
      <PortfolioAnimations />
      <Navbar />
      <Hero />
      <Highlights />
      <ServicesSection />
      <ProjectsSection
        projects={projects}
        onProjectClick={handleProjectClick}
      />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
