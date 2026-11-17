"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../_i18n/LanguageProvider";
import type { Language } from "../_i18n/translations";
import projectsData from "../_data/projects.json";

gsap.registerPlugin(ScrollTrigger);

type Localized = { en: string; pt: string };

type Category = {
  id: string;
  label: Localized;
};

type Project = {
  id: string;
  title: Localized;
  category: string;
  video: string;
  href: string;
  featured?: boolean;
};

const categories = projectsData.categories as Category[];
const projects = projectsData.projects as Project[];

const LUSION_EASE_GSAP = "power3.out";
/** Quantidade de projetos visíveis por página no grid */
const PAGE_SIZE = 4;

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 203 203"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M184.391 0H6.133C2.743 0 0 2.743 0 6.133V12.495C0 15.885 2.743 18.628 6.133 18.628H157.174C162.621 18.628 165.364 25.218 161.497 29.084L5.333 185.229C2.933 187.629 2.933 191.496 5.333 193.896L9.847 198.41C12.247 200.81 16.114 200.81 18.513 198.41L173.935 42.969C177.801 39.103 184.391 41.846 184.391 47.293V196.886C184.391 200.276 187.134 203.019 190.524 203.019H196.886C200.276 203.019 203.019 200.276 203.019 196.886V6.133C203.019 2.743 200.276 0 196.886 0H184.391Z"
        fill="currentColor"
      />
    </svg>
  );
}

function localized(value: Localized, lang: Language) {
  return value[lang] ?? value.en;
}

type HoverTweens = {
  x: gsap.QuickToFunc;
  y: gsap.QuickToFunc;
  scale: gsap.QuickToFunc;
};

function ProjectCard({
  project,
  lang,
  categoryLabel,
  openLabel,
}: {
  project: Project;
  lang: Language;
  categoryLabel: string;
  openLabel: string;
}) {
  const cardRef = useRef<HTMLElement | null>(null);
  const mediaFrameRef = useRef<HTMLDivElement>(null);
  const scrollLayerRef = useRef<HTMLDivElement>(null);
  const hoverLayerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const hoverTween = useRef<HoverTweens | null>(null);
  const category = categories.find((c) => c.id === project.category);
  const hasHref = Boolean(project.href && project.href !== "#");

  const play = useCallback(() => {
    void videoRef.current?.play().catch(() => undefined);
  }, []);

  const pause = useCallback(() => {
    videoRef.current?.pause();
  }, []);

  /**
   * Efeitos Lusion Featured Work:
   * 1) Entrada — card/footer sobem com fade
   * 2) Scroll “abrindo” — clip-path do frame abre + imagem faz un-zoom (scrub)
   * 3) Hover — zoom + follow do mouse + seta no título
   */
  useEffect(() => {
    const card = cardRef.current;
    const frame = mediaFrameRef.current;
    const scrollLayer = scrollLayerRef.current;
    const hoverLayer = hoverLayerRef.current;
    const footer = footerRef.current;
    const arrow = arrowRef.current;
    if (!card || !frame || !scrollLayer || !hoverLayer) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.set(card, { autoAlpha: 0, y: 48 });
      gsap.set(footer, { autoAlpha: 0, y: 20 });
      gsap.set(arrow, { autoAlpha: 0, x: -14 });
      gsap.set(hoverLayer, { scale: 1, xPercent: 0, yPercent: 0 });

      // Estado inicial “fechado”: janela pequena + imagem zoomada
      gsap.set(frame, {
        clipPath: "inset(14% 18% round 15px)",
      });
      gsap.set(scrollLayer, { scale: 1.38, transformOrigin: "50% 50%" });

      // 1) Entrada do card
      gsap
        .timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            once: true,
          },
        })
        .to(card, {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: LUSION_EASE_GSAP,
        })
        .to(
          footer,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: LUSION_EASE_GSAP,
          },
          0.18,
        );

      // 2) Scroll “abrindo” — frame expande (clip) enquanto a mídia desfaz o zoom
      //    Mesma janela de scrub = sensação de câmera abrindo / un-zoom
      const openScroll = {
        trigger: card,
        start: "top 90%",
        end: "top 38%",
        scrub: 0.65,
      };

      gsap.to(frame, {
        clipPath: "inset(0% 0% round 15px)",
        ease: "none",
        scrollTrigger: openScroll,
      });

      gsap.to(scrollLayer, {
        scale: 1,
        ease: "none",
        scrollTrigger: { ...openScroll },
      });

      // Parallax leve depois de aberto (atravessa o viewport)
      gsap.fromTo(
        scrollLayer,
        { yPercent: 6 },
        {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, card);

    hoverTween.current = {
      x: gsap.quickTo(hoverLayer, "xPercent", {
        duration: 0.6,
        ease: "power3",
      }),
      y: gsap.quickTo(hoverLayer, "yPercent", {
        duration: 0.6,
        ease: "power3",
      }),
      scale: gsap.quickTo(hoverLayer, "scale", {
        duration: 0.55,
        ease: "power3",
      }),
    };

    return () => {
      ctx.revert();
      hoverTween.current = null;
    };
  }, []);

  useEffect(() => {
    const frame = mediaFrameRef.current;
    const video = videoRef.current;
    if (!frame || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) play();
        else pause();
      },
      { threshold: 0.35 },
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, [pause, play]);

  const onPointerEnter = () => {
    play();
    gsap.to(arrowRef.current, {
      autoAlpha: 1,
      x: 0,
      duration: 0.45,
      ease: LUSION_EASE_GSAP,
    });
    gsap.to(titleRef.current, {
      x: 30,
      color: "#ffffff",
      duration: 0.45,
      ease: LUSION_EASE_GSAP,
    });
    hoverTween.current?.scale(1.08);
  };

  const onPointerLeave = () => {
    gsap.to(arrowRef.current, {
      autoAlpha: 0,
      x: -14,
      duration: 0.35,
      ease: "power2.inOut",
    });
    gsap.to(titleRef.current, {
      x: 0,
      color: "rgba(255,255,255,0.55)",
      duration: 0.35,
      ease: "power2.inOut",
    });
    hoverTween.current?.x(0);
    hoverTween.current?.y(0);
    hoverTween.current?.scale(1);
  };

  const onPointerMove = (event: ReactMouseEvent) => {
    const frame = mediaFrameRef.current;
    const tweens = hoverTween.current;
    if (!frame || !tweens) return;

    const rect = frame.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    tweens.x(nx * 7);
    tweens.y(ny * 7);
  };

  const content = (
    <>
      <div
        ref={mediaFrameRef}
        className="project-card-media relative aspect-[16/10] w-full bg-[#111] will-change-[clip-path]"
        style={{
          // Estado fechado até o GSAP assumir — evita flash aberto no 1º paint
          clipPath: "inset(14% 18% round 15px)",
        }}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
      >
        <div
          ref={scrollLayerRef}
          className="absolute inset-0 will-change-transform"
          style={{ transformOrigin: "50% 50%", transform: "scale(1.38)" }}
        >
          <div
            ref={hoverLayerRef}
            className="absolute inset-[-10%] will-change-transform"
            style={{ transformOrigin: "50% 50%" }}
          >
            <video
              ref={videoRef}
              src={project.video}
              loop
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div ref={footerRef} className="project-card-footer mt-5 px-0.5 md:mt-6">
        <p className="mb-3 text-[0.7rem] uppercase tracking-[0.14em] text-white/45 md:text-[0.9vw]">
          {category
            ? `${localized(category.label, lang)}`
            : categoryLabel}
        </p>

        <div className="relative flex min-h-[1.15em] items-center overflow-hidden">
          <span
            ref={arrowRef}
            aria-hidden="true"
            className="absolute left-0 top-1/2 flex h-[0.8em] w-[0.8em] -translate-y-1/2 text-white"
          >
            <ArrowIcon className="h-full w-full" />
          </span>
          <h3
            ref={titleRef}
            className="truncate text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium leading-none text-white/55"
          >
            {localized(project.title, lang)}
          </h3>
        </div>
      </div>
      <span className="sr-only">{openLabel}</span>
    </>
  );

  const sharedClass =
    "project-card group block w-full cursor-pointer text-inherit no-underline";

  if (!hasHref) {
    return (
      <div
        ref={(node) => {
          cardRef.current = node;
        }}
        className={sharedClass}
      >
        {content}
      </div>
    );
  }

  return (
    <a
      ref={(node) => {
        cardRef.current = node;
      }}
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={sharedClass}
      aria-label={`${openLabel}: ${localized(project.title, lang)}`}
    >
      {content}
    </a>
  );
}

export default function ProjectsSection() {
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [page, setPage] = useState(0);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const project of projects) {
      map[project.category] = (map[project.category] ?? 0) + 1;
    }
    return map;
  }, []);

  const visibleCategories = useMemo(
    () => categories.filter((c) => (counts[c.id] ?? 0) > 0),
    [counts],
  );

  const filtered = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);

  const pageItems = useMemo(() => {
    const start = safePage * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  useEffect(() => {
    setPage(0);
  }, [activeCategory]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".projects-reveal", {
        autoAlpha: 0,
        y: 36,
        duration: 0.9,
        ease: LUSION_EASE_GSAP,
        stagger: 0.08,
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      // Linha que corre atrás dos projetos até chegar na section About
      const path = lineRef.current;
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 0.6,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(timer);
  }, [pageItems]);

  const onChipClick =
    (id: string) => (event: ReactMouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setActiveCategory(id);
    };

  const goToPage = (next: number) => {
    setPage(Math.max(0, Math.min(totalPages - 1, next)));
  };

  return (
    <section
      id="projetos"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#0A0A0A] px-4 py-16 text-[#f5f5f7] md:px-6 md:py-20 lg:px-10"
    >
      {/* Linha decorativa que desce atrás dos projetos (estilo Lusion) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 1700"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      >
        <defs>
          <linearGradient id="projectsLineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8affc9" />
            <stop offset="50%" stopColor="#19E57B" />
            <stop offset="100%" stopColor="#0f9a52" />
          </linearGradient>
        </defs>
        <path
          ref={lineRef}
          d="M 120 -20 C 150 240 60 420 180 620 C 280 790 760 820 820 1040 C 870 1230 360 1260 420 1480 C 450 1590 520 1640 540 1720"
          fill="none"
          stroke="url(#projectsLineGrad)"
          strokeWidth={4}
          strokeLinecap="round"
          opacity={0.9}
        />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-[1920px]">
        <div className="projects-reveal mb-8 grid items-end gap-4 md:mb-10 md:grid-cols-[1fr_auto] md:gap-10">
          <div className="flex items-end gap-3 md:gap-5">
            <h2 className="font-brand text-[clamp(2.8rem,7vw,6rem)] font-black uppercase leading-[0.9] tracking-[-0.04em] text-white">
              {t("projects.title")}
            </h2>
            <span
              aria-hidden="true"
              className="mb-[0.12em] inline-flex text-[clamp(1.8rem,5vw,4rem)] text-white"
            >
              <ArrowIcon className="h-[0.67em] w-[0.67em]" />
            </span>
          </div>

          <p className="max-w-[360px] text-left text-sm leading-relaxed text-white/90 md:pb-1">
            {t("projects.description")}
          </p>
        </div>

        <div
          role="group"
          aria-label={t("projects.title")}
          className="projects-reveal mb-10 flex flex-wrap gap-2 md:mb-14"
        >
          <button
            type="button"
            aria-pressed={activeCategory === "all"}
            onClick={onChipClick("all")}
            className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              activeCategory === "all"
                ? "bg-[#19E57B] text-black"
                : "border border-white/25 bg-transparent text-white hover:border-white/50"
            }`}
          >
            {t("projects.all")}
            <span className="ml-1.5 tabular-nums opacity-70">
              {projects.length}
            </span>
          </button>

          {visibleCategories.map((category) => {
            const active = activeCategory === category.id;
            const count = counts[category.id] ?? 0;
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={active}
                onClick={onChipClick(category.id)}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  active
                    ? "bg-[#19E57B] text-black"
                    : "border border-white/25 bg-transparent text-white hover:border-white/50"
                }`}
              >
                {localized(category.label, lang)}
                <span className="ml-1.5 tabular-nums opacity-70">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Grid: no máximo 4 projetos por página */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-8 md:gap-y-24 lg:gap-x-10">
          {pageItems.map((project, index) => (
            <div
              key={`${project.id}-${safePage}`}
              className={index % 2 === 1 ? "md:mt-24" : undefined}
            >
              <ProjectCard
                project={project}
                lang={lang}
                categoryLabel={t("projects.categoryLabel")}
                openLabel={t("projects.open")}
              />
            </div>
          ))}
        </div>

        {totalPages > 1 ? (
          <nav
            aria-label={t("projects.page")}
            className="mt-14 flex flex-wrap items-center justify-center gap-3 md:mt-20"
          >
            <button
              type="button"
              disabled={safePage === 0}
              onClick={() => goToPage(safePage - 1)}
              className="cursor-pointer rounded-full border border-white/25 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:border-white/50 disabled:cursor-not-allowed disabled:opacity-35"
            >
              {t("projects.prev")}
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`${t("projects.page")} ${i + 1}`}
                  aria-current={i === safePage ? "page" : undefined}
                  onClick={() => goToPage(i)}
                  className={`flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-full px-2 text-sm font-medium transition-colors duration-200 ${
                    i === safePage
                      ? "bg-[#19E57B] text-black"
                      : "border border-white/25 text-white hover:border-white/50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={safePage >= totalPages - 1}
              onClick={() => goToPage(safePage + 1)}
              className="cursor-pointer rounded-full border border-white/25 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:border-white/50 disabled:cursor-not-allowed disabled:opacity-35"
            >
              {t("projects.next")}
            </button>
          </nav>
        ) : null}
      </div>
    </section>
  );
}
