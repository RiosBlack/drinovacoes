"use client";

const services = [
  {
    eyebrow: "Sistemas",
    headline: "Para você fazer e acontecer.",
    body: "Transformamos problemas complexos em soluções simples e eficientes. Sistemas sob medida com stack moderna, segurança e manutenibilidade.",
  },
  {
    eyebrow: "E-commerce",
    headline: "Você trabalha, a loja vende.",
    body: "Lojas virtuais rápidas, responsivas e pensadas para conversão. Do checkout ao painel administrativo, tudo integrado.",
  },
  {
    eyebrow: "Sites",
    headline: "Aproveite a vista.",
    body: "Sites institucionais com design estratégico e performance impecável. Sua marca merece uma presença digital à altura.",
  },
  {
    eyebrow: "Automação com IA",
    headline: "É prompt e pronto.",
    body: "Automatize tarefas repetitivas com fluxos inteligentes. Chatbots, integrações e agentes que trabalham por você.",
  },
];

export default function ServicesSection() {
  return (
    <section id="servicos" className="bg-black">
      {services.map((service, index) => (
        <div
          key={service.eyebrow}
          className={`service-block border-t border-white/10 px-6 py-24 md:py-32 ${
            index % 2 === 0 ? "bg-black" : "bg-[#1d1d1f]"
          }`}
        >
          <div className="mx-auto max-w-[980px]">
            <p className="reveal-text text-sm font-medium text-[#86868b]">
              {service.eyebrow}
            </p>
            <h2 className="service-headline mt-4 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.08] tracking-tight text-[#f5f5f7]">
              {service.headline}
            </h2>
            <p className="reveal-text mt-6 max-w-xl text-lg leading-relaxed text-[#86868b]">
              {service.body}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
