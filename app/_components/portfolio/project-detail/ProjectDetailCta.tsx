import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectDetailCta() {
  return (
    <section className="project-detail-reveal mt-16 rounded-2xl border border-white/10 bg-[var(--project-surface)] p-8 text-center md:mt-24 md:p-12">
      <h2 className="text-xl font-semibold text-[var(--project-text)] md:text-2xl">
        Gostou deste projeto?
      </h2>
      <p className="mx-auto mt-3 max-w-md text-[var(--project-muted)]">
        Vamos conversar sobre como podemos construir algo assim para o seu negócio.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/#projetos"
          className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-[var(--project-muted)] transition-colors duration-200 hover:text-[var(--project-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--project-cta)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Voltar ao portfólio
        </Link>
        <Link
          href="/#contato"
          className="inline-flex cursor-pointer items-center rounded-full bg-[var(--project-cta)] px-6 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#B8922A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--project-cta)]"
        >
          Fale conosco
        </Link>
      </div>
    </section>
  );
}
