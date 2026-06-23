import type { Project } from "@/app/types/portfolio";
import ProjectDetailLiveButton from "./ProjectDetailLiveButton";

type Props = {
  project: Project;
};

export default function ProjectDetailHero({ project }: Props) {
  return (
    <header className="project-detail-reveal pt-8 md:pt-12">
      <div
        className="mb-6 h-1 w-12 rounded-full"
        style={{ backgroundColor: project.category.accentColor }}
      />
      <p className="text-sm font-medium text-[var(--project-muted)]">
        {project.category.title}
      </p>
      <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight tracking-tight text-[var(--project-text)]">
        {project.title}
      </h1>
      {project.publishedAt && (
        <p className="mt-3 text-sm text-[var(--project-muted)]">
          {project.publishedAt}
        </p>
      )}
      {project.shortDescription && (
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--project-muted)]">
          {project.shortDescription}
        </p>
      )}
      {project.liveUrl && (
        <div className="mt-8">
          <ProjectDetailLiveButton url={project.liveUrl} />
        </div>
      )}
    </header>
  );
}
