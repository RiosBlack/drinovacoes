"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { getCategories, getProjects } from "./services/portfolio";
import type { Project, ProjectCategory } from "./types/portfolio";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [heroUnlocked, setHeroUnlocked] = useState(false);
  const router = useRouter();

  useSmoothScroll();

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsData, categoriesData] = await Promise.all([
          getProjects(),
          getCategories(),
        ]);
        setProjects(projectsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Erro ao carregar dados do Sanity:", error);
        setProjects([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (projects.length > 0 || categories.length > 0) {
      const timer = setTimeout(() => ScrollTrigger.refresh(), 300);
      return () => clearTimeout(timer);
    }
  }, [projects, categories]);

  useEffect(() => {
    if (!heroUnlocked) return;
    const timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => clearTimeout(timer);
  }, [heroUnlocked]);

  const projectCards: ProjectCard[] = projects.map((project) => ({
    id: project.slug,
    title: project.title,
    description: project.shortDescription,
    technologies: project.technologies.join(" · ") || "Tecnologias diversas",
    date: project.publishedAt,
    image: project.coverImage,
  }));

  const handleProjectClick = (slug: string) => {
    if (slug) router.push(`/${slug}`);
  };

  return (
    <main className="portfolio-page bg-black">
      <PortfolioAnimations />
      <Navbar />
      <Hero onPageUnlock={() => setHeroUnlocked(true)} />
      <Highlights categories={categories} projects={projects} />
      <ServicesSection />
      <ProjectsSection
        projects={projectCards}
        loading={loading}
        onProjectClick={handleProjectClick}
      />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
