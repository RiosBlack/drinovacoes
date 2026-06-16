"use client";

const steps = [
  {
    number: "01",
    phase: "Descoberta",
    title: "Primeiro contato",
    items: [
      "Conversa para entender a necessidade do cliente",
      "Alinhamento de expectativas e objetivos",
      "Planejamento inicial e visão do projeto",
    ],
  },
  {
    number: "02",
    phase: "Planejamento",
    title: "Briefing e estruturação",
    items: [
      "Formalização com contrato transparente",
      "Coleta de informações essenciais",
      "Definição de referências e identidade visual",
    ],
  },
  {
    number: "03",
    phase: "Desenvolvimento",
    title: "Criação e ajustes",
    items: [
      "Desenvolvimento com base no briefing aprovado",
      "Apresentações e ciclos de revisão",
      "Testes, validação e deploy em produção",
    ],
  },
  {
    number: "04",
    phase: "Entrega",
    title: "Projeto finalizado",
    items: [
      "Entrega do projeto no ar e funcionando",
      "Documentação e materiais organizados",
      "Suporte pós-entrega conforme acordado",
    ],
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-black px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[980px]">
        <p className="reveal-text text-sm font-medium text-[#86868b]">
          Como funciona
        </p>
        <h2 className="reveal-text mt-2 text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight text-[#f5f5f7]">
          Processo inteligente,
          <br />
          resultado sólido.
        </h2>

        <div className="mt-16 space-y-0">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="process-step flex flex-col gap-6 border-t border-white/10 py-12 md:flex-row md:items-start md:gap-16"
            >
              <div className="flex shrink-0 items-baseline gap-4 md:w-48">
                <span className="text-sm font-medium text-[#E8C547]">
                  {step.phase}
                </span>
                <span className="text-2xl font-light text-[#424245]">
                  {step.number}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#f5f5f7]">
                  {step.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {step.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[#86868b]"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#86868b]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {index < steps.length - 1 && null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
