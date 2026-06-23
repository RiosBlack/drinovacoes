type Props = {
  technologies: string[];
};

export default function ProjectDetailTech({ technologies }: Props) {
  if (technologies.length === 0) return null;

  return (
    <section className="project-detail-reveal mt-16 md:mt-24">
      <h2 className="text-sm font-medium text-[var(--project-muted)]">
        Stack técnica
      </h2>
      <ul className="mt-6 flex flex-wrap gap-3">
        {technologies.map((tech, index) => (
          <li
            key={`${tech}-${index}`}
            className="rounded-full border border-white/10 bg-[var(--project-surface)] px-4 py-2 text-sm font-medium text-[var(--project-text)]"
          >
            {tech}
          </li>
        ))}
      </ul>
    </section>
  );
}
