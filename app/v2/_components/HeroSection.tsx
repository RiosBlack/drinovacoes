"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Mail } from "lucide-react";
import {
  FaBehance,
  FaDribbble,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { useLanguage } from "../_i18n/LanguageProvider";
import LetterGlitch from "./LetterGlitch";
import PortraitMark from "./PortraitMark";
import RotatingSeal from "./RotatingSeal";
import LanguageToggle from "./LanguageToggle";

type HeroSectionProps = {
  active: boolean;
};

const SOCIALS = [
  { href: "https://behance.net", label: "Behance", Icon: FaBehance },
  { href: "https://dribbble.com", label: "Dribbble", Icon: FaDribbble },
  { href: "https://instagram.com", label: "Instagram", Icon: FaInstagram },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: FaLinkedinIn },
];

export default function HeroSection({ active }: HeroSectionProps) {
  const { t } = useLanguage();
  const contentRef = useRef<HTMLDivElement>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    if (!active || playedRef.current) return;
    const content = contentRef.current;
    if (!content) return;
    playedRef.current = true;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        autoAlpha: 0,
        y: 28,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
      });
    }, contentRef);

    return () => ctx.revert();
  }, [active]);

  return (
    <section className="relative min-h-screen w-full bg-[#0A0A0A]">
      {/* Brilho de fundo */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_38%,_rgba(25,229,123,0.12)_0%,_transparent_55%)]" />

      {/* Conteúdo (frame ocupa a tela toda com inset mínimo) */}
      <div className="relative flex w-full justify-center p-3 md:p-4">
        <div
          ref={contentRef}
          className="relative flex min-h-[calc(100svh-1.5rem)] w-full max-w-[2560px] flex-col overflow-hidden rounded-[1.75rem] border border-white/12 bg-black/55 p-5 md:min-h-[calc(100svh-2rem)] md:p-10"
        >
          {/* Fundo LetterGlitch (monta após o preloader) */}
          {active && (
            <div className="pointer-events-none absolute inset-0 z-0">
              <LetterGlitch
                glitchColors={["#ffffff", "#19E57B"]}
                baseColor="#ffffff"
                glitchAmount={0.45}
                speed={1}
                flow={0.45}
                baseOpacity={0.14}
                centerFade={0.8}
                edgeFade={0.12}
                clickEffect="tear"
                interactive
                cursorRadius={160}
              />
            </div>
          )}

          {/* Topo: logo + idioma/contato */}
          <header className="hero-reveal relative z-10 flex items-center justify-between">
            <div className="relative h-10 w-10 overflow-hidden rounded-md md:h-12 md:w-12">
              <Image
                src="/logo-dr-mark.png"
                alt="DR Inovações"
                fill
                priority
                sizes="48px"
                className="object-cover"
              />
            </div>

            <div className="flex items-center gap-3">
              <LanguageToggle />
              <a
                href="#contato"
                aria-label={t("hero.contact")}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition-colors duration-200 hover:border-[#19E57B] hover:text-[#19E57B]"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </header>

          {/* Redes sociais na lateral esquerda */}
          <div className="hero-reveal absolute left-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-4 md:flex">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white/60 transition-colors duration-200 hover:text-[#19E57B]"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Núcleo central */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
            <h1 className="hero-reveal font-semibold uppercase leading-[0.92] tracking-tight text-[#f5f5f7]">
              <span className="block text-[clamp(3rem,13vw,8rem)]">
                {t("hero.titleTop")}
              </span>
              <span className="relative block text-[clamp(2.25rem,9vw,6rem)]">
                {t("hero.titleBottom")}
              </span>
            </h1>

            {/* Selo + marca com retrato sob o título */}
            <div className="hero-reveal mt-4 flex items-center gap-4 md:mt-6">
              <PortraitMark alt={t("hero.portraitAlt")} />
              <RotatingSeal size={88} />
            </div>

            <p className="hero-reveal mt-6 max-w-md text-sm text-white/60 md:max-w-lg md:text-base">
              {t("hero.subtitle")}
            </p>

            <div className="hero-reveal mt-7 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#projetos"
                className="cursor-pointer rounded-full bg-[#19E57B] px-6 py-2.5 text-sm font-semibold text-black transition-colors duration-200 hover:bg-[#15c96b]"
              >
                {t("hero.ctaProjects")}
              </a>
              <a
                href="#contato"
                className="cursor-pointer text-sm font-medium text-[#19E57B] transition-opacity duration-200 hover:opacity-80"
              >
                {t("hero.ctaStart")} →
              </a>
            </div>
          </div>

          {/* Tag canto inferior direito */}
          <div className="hero-reveal relative z-10 mt-auto flex justify-end">
            <span className="text-right text-xs font-semibold uppercase leading-tight tracking-[0.2em] text-white/70 md:text-sm">
              {t("hero.role")
                .split(" & ")
                .map((part, i) => (
                  <span key={part} className="block">
                    {i === 0 ? `${part} &` : part}
                  </span>
                ))}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
