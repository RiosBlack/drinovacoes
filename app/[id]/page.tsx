import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/app/services/portfolio";
import Footer from "@/app/_components/portfolio/Footer";
import ProjectDetailAnimations from "@/app/_components/portfolio/project-detail/ProjectDetailAnimations";
import ProjectDetailCta from "@/app/_components/portfolio/project-detail/ProjectDetailCta";
import ProjectDetailDescription from "@/app/_components/portfolio/project-detail/ProjectDetailDescription";
import ProjectDetailGallery from "@/app/_components/portfolio/project-detail/ProjectDetailGallery";
import ProjectDetailHero from "@/app/_components/portfolio/project-detail/ProjectDetailHero";
import ProjectDetailNav from "@/app/_components/portfolio/project-detail/ProjectDetailNav";
import ProjectDetailShell from "@/app/_components/portfolio/project-detail/ProjectDetailShell";
import ProjectDetailTech from "@/app/_components/portfolio/project-detail/ProjectDetailTech";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.id);

  if (!project) {
    return { title: "Projeto não encontrado — DR Inovações" };
  }

  return {
    title: `${project.title} — DR Inovações`,
    description: project.shortDescription || project.description,
  };
}

export default async function Page({ params }: Props) {
  const project = await getProjectBySlug(params.id);

  if (!project) {
    notFound();
  }

  const images = [project.coverImage, ...project.gallery].filter(Boolean);

  return (
    <div className="bg-black">
      <ProjectDetailNav />
      <ProjectDetailShell>
        <ProjectDetailHero project={project} />
        <ProjectDetailGallery images={images} title={project.title} />
        <ProjectDetailDescription text={project.description} />
        <ProjectDetailTech technologies={project.technologies} />
        <ProjectDetailCta />
      </ProjectDetailShell>
      <Footer variant="dark" />
      <ProjectDetailAnimations />
    </div>
  );
}
