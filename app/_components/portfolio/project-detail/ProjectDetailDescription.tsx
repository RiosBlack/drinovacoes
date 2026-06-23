type Props = {
  text: string;
};

export default function ProjectDetailDescription({ text }: Props) {
  if (!text) return null;

  return (
    <section className="project-detail-reveal mt-16 md:mt-24">
      <h2 className="text-sm font-medium text-[var(--project-muted)]">Sobre o projeto</h2>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--project-text)]">
        {text}
      </p>
    </section>
  );
}
