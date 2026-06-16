"use client";

const highlights = [
  {
    id: "sistemas",
    label: "Sistemas",
    title: "Problemas complexos, soluções simples.",
    description:
      "Desenvolvemos sistemas personalizados que resolvem desafios reais do seu negócio com arquitetura escalável e UX impecável.",
    accent: "#C9A227",
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    title: "Lojas virtuais feitas para vender.",
    description:
      "E-commerce moderno, rápido e responsivo. Integração com pagamentos, gestão de estoque e experiência de compra fluida.",
    accent: "#bf5af2",
  },
  {
    id: "sites",
    label: "Sites",
    title: "Presença digital com impacto.",
    description:
      "Sites institucionais com design estratégico, performance otimizada e foco em conversão — do conceito à publicação.",
    accent: "#30d158",
  },
  {
    id: "ia",
    label: "IA",
    title: "Automação inteligente.",
    description:
      "Fluxos com inteligência artificial que economizam tempo, reduzem custos e otimizam decisões no dia a dia.",
    accent: "#ff9f0a",
  },
];

export default function Highlights() {
  return (
    <section id="destaques" className="highlights-section bg-[#f5f5f7]">
      <div className="highlights-pin mx-auto max-w-[980px] px-6 py-24 md:py-32">
        <p className="reveal-text text-sm font-medium text-[#86868b]">
          Comece pelos destaques.
        </p>

        <div className="mt-12 flex flex-col gap-16 lg:flex-row lg:gap-20">
          <div className="highlights-nav flex shrink-0 flex-row gap-2 overflow-x-auto lg:w-48 lg:flex-col lg:gap-1">
            {highlights.map((item, index) => (
              <button
                key={item.id}
                type="button"
                data-highlight={index}
                className="highlight-tab whitespace-nowrap rounded-full px-4 py-2 text-left text-sm font-medium text-[#86868b] transition-colors lg:rounded-lg"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="highlights-content relative min-h-[320px] flex-1">
            {highlights.map((item, index) => (
              <article
                key={item.id}
                data-panel={index}
                className="highlight-panel absolute inset-0 flex flex-col justify-center opacity-0"
              >
                <div
                  className="mb-6 h-1 w-12 rounded-full"
                  style={{ backgroundColor: item.accent }}
                />
                <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-tight tracking-tight text-[#1d1d1f]">
                  {item.title}
                </h2>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-[#86868b]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
