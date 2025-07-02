"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

interface AnimatedTechSectionProps {
  techs: string[];
  originalTechs?: string[];
}

export default function AnimatedTechSection({
  techs,
  originalTechs,
}: AnimatedTechSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (!containerRef.current || !titleRef.current) return;

    const container = containerRef.current;
    const title = titleRef.current;
    const techItems = gsap.utils.toArray(".tech-item") as HTMLElement[];

    // Animação inicial - elementos invisíveis
    gsap.set([title, ...techItems], {
      opacity: 0,
      y: 50,
      scale: 0.8,
    });

    // Timeline para as animações
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Animação do título
    tl.to(title, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)",
    });

    // Animação das tecnologias com delay escalonado
    techItems.forEach((item, index) => {
      tl.to(
        item,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          rotation: 360,
        },
        index * 0.1 + 0.3, // Delay escalonado
      );
    });

    // Animação de hover individual para cada tech
    techItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        gsap.to(item, {
          scale: 1.1,
          rotation: "+=15",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          scale: 1,
          rotation: "-=15",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      techItems.forEach((item) => {
        item.removeEventListener("mouseenter", () => {});
        item.removeEventListener("mouseleave", () => {});
      });
    };
  }, [techs]);

  return (
    <div
      ref={containerRef}
      className="relative mb-14 mt-6 w-full rounded-xl border border-purple-500/20 bg-black/20 p-6 backdrop-blur-sm"
    >
      <div className="relative z-10">
        <h2 ref={titleRef} className="text-2xl font-semibold text-purple-600">
          Tecnologias usadas:
        </h2>

        <div className="mt-6 flex flex-wrap gap-4">
          {techs.map((tech, index) => (
            <div
              key={`${tech}-${index}`}
              className="tech-item flex items-center gap-2 rounded-lg bg-purple-900/30 px-4 py-2 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-purple-800/40"
            >
              <div className="flex h-8 w-8 items-center justify-center">
                <Image
                  src={`https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/${tech}.svg`}
                  alt={tech}
                  className="h-full w-full object-contain brightness-0 invert filter"
                  width={32}
                  height={32}
                />
              </div>
              <span className="text-sm font-medium text-white">
                {originalTechs && originalTechs[index]
                  ? originalTechs[index]
                  : tech.charAt(0).toUpperCase() + tech.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
