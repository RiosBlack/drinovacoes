"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SERVICE_VIDEOS = [
  "/Sistemas.webm",
  "/E-commerce.webm",
  "/Site.webm",
  "/Automa%C3%A7%C3%A3o%20com%20IA.webm",
] as const;

const VIDEO_TRANSITION = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

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

function ServiceBlock({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`service-block relative overflow-hidden border-t border-white/10 py-24 md:py-32 ${index % 2 === 0 ? "bg-black" : "bg-[#1d1d1f]"
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key={`video-${index}`}
            className="pointer-events-none absolute inset-y-0 right-0 z-0 h-full w-1/2 overflow-hidden"
            initial={{ opacity: 0, x: "-12%" }}
            animate={{ opacity: 0.5, x: 0 }}
            exit={{ opacity: 0, x: "-12%" }}
            transition={VIDEO_TRANSITION}
          >
            <video
              src={SERVICE_VIDEOS[index]}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover object-center"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 mx-auto max-w-[980px] px-6">
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
  );
}

export default function ServicesSection() {
  return (
    <section id="servicos" className="bg-black">
      {services.map((service, index) => (
        <ServiceBlock key={service.eyebrow} service={service} index={index} />
      ))}
    </section>
  );
}
