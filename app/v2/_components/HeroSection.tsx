"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Mail } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import { getLenis } from "../../hooks/useSmoothScroll";
import { useLanguage } from "../_i18n/LanguageProvider";
import LetterGlitch from "./LetterGlitch";
import PortraitMark from "./PortraitMark";
import RotatingSeal from "./RotatingSeal";
import LanguageToggle from "./LanguageToggle";
import { AudioToggle } from "./BackgroundAudio";

type HeroSectionProps = {
  /** Fundo (LetterGlitch) visível — sobe com a cortina. */
  showBackground: boolean;
  /** Conteúdo do hero — anima só depois que a cortina terminou. */
  showContent: boolean;
};

const SOCIALS = [
  { href: "https://instagram.com", label: "Instagram", Icon: FaInstagram },
];

export default function HeroSection({
  showBackground,
  showContent,
}: HeroSectionProps) {
  const { t } = useLanguage();
  const contentRef = useRef<HTMLDivElement>(null);
  const playedRef = useRef(false);

  // Conteúdo fica oculto até a cortina terminar
  useEffect(() => {
    const content = contentRef.current;
    if (!content || playedRef.current) return;
    gsap.set(content.querySelectorAll(".hero-reveal"), {
      autoAlpha: 0,
      y: 28,
    });
  }, []);

  useEffect(() => {
    if (!showContent || playedRef.current) return;
    const content = contentRef.current;
    if (!content) return;
    playedRef.current = true;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".hero-reveal", { autoAlpha: 1, y: 0 });
        return;
      }

      // Só depois do fundo: título, retrato, CTAs entram em cena
      gsap.to(".hero-reveal", {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.08,
      });
    }, contentRef);

    return () => ctx.revert();
  }, [showContent]);

  const scrollToProjects = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById("projetos");
    if (!target) return;

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target, { offset: 0 });
      return;
    }

    target.scrollIntoView({ behavior: "smooth" });
  };

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
          {/* WebGL aquece desde o início; só aparece quando a cortina sobe */}
          <div
            className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-700 ${showBackground ? "opacity-100" : "opacity-0"
              }`}
            aria-hidden={!showBackground}
          >
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
              interactive={showContent}
              cursorRadius={160}
            />
          </div>

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
              <AudioToggle />
              <a
                href="#contato"
                aria-label={t("hero.contact")}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition-colors duration-200 hover:border-[#19E57B] hover:text-[#19E57B]"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </header>

          {/* Instagram na lateral — giro horizontal + explosão */}
          <div className="hero-reveal absolute left-5 top-1/2 z-40 hidden -translate-y-1/2 md:block">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="ig-burst relative z-50 block h-12 w-12 text-white/60"
              >
                {/* Camada de hit 2D por cima de toda a animação 3D */}
                <span className="ig-burst-hit" aria-hidden="true" />
                {/* Visual animado — nunca recebe mouse */}
                <span className="ig-burst-visual" aria-hidden="true">
                  <Icon className="ig-burst-icon h-[30px] w-[30px]" />
                  {Array.from({ length: 8 }).map((_, i) => (
                    <span
                      key={i}
                      className={`ig-burst-spark ig-burst-spark--${i}`}
                    />
                  ))}
                </span>
              </a>
            ))}
          </div>

          {/* Retrato grande — esquerda, atrás do texto, saindo de baixo */}
          <div className="hero-reveal pointer-events-none absolute inset-y-0 left-[16%] z-[1] flex items-end">
            <div className="pointer-events-auto h-[min(92%,48rem)] w-[clamp(18rem,46vw,34rem)] translate-y-[10%]">
              <PortraitMark alt={t("hero.portraitAlt")} />
            </div>
          </div>

          {/* Núcleo central — título + selo + CTAs centralizados */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
            <div className="hero-reveal relative">
              <div className="relative flex min-w-0 flex-col justify-between pb-8 pr-10 pt-0.5 sm:pb-10 sm:pr-12 md:pb-12 md:pr-14">
                <h1 className="pt-5 text-start font-brand text-[clamp(2.6rem,10.4vw,7.1rem)] font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#f5f5f7]">
                  <span className="block">{t("hero.titleTop")}</span>
                  <span className="relative mt-1 block">
                    {t("hero.titleBottom")}
                  </span>
                </h1>

                <div className="absolute bottom-0 right-0">
                  <RotatingSeal size={88} />
                </div>
              </div>
            </div>

            <p className="hero-reveal mt-10 max-w-md text-center text-sm text-white/60 md:mt-12 md:max-w-lg md:text-base">
              {t("hero.subtitle")}
            </p>

            <div className="hero-reveal mt-7 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#projetos"
                onClick={scrollToProjects}
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
