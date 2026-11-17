"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "../../hooks/useSmoothScroll";
import { useLanguage } from "../_i18n/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

const EASE = "power3.out";
/** Quão rápido o currentTime persegue o alvo do scroll (0–1). */
const SCRUB_LERP = 0.14;
/** Evita seeks microscópicos (~1 frame a 24fps). */
const SEEK_EPSILON = 1 / 24;

export default function AboutSection() {
  const { t } = useLanguage();

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const panelARef = useRef<HTMLDivElement>(null);
  const panelBRef = useRef<HTMLDivElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  const headlineLines = useMemo(() => t("about.headline").split(" / "), [t]);
  const pills = useMemo(() => t("about.pills").split("|").filter(Boolean), [t]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const videoWrap = videoWrapRef.current;
    const video = videoRef.current;
    const panelA = panelARef.current;
    const panelB = panelBRef.current;
    if (!section || !stage || !videoWrap || !video || !panelA || !panelB)
      return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    // Mobile usa layout estático empilhado — sem scrub lateral
    if (isMobile) {
      const mobileVideo = mobileVideoRef.current;
      if (mobileVideo) {
        const tryPlay = () => {
          mobileVideo.play().catch(() => {
            /* autoplay pode falhar sem gesto */
          });
        };
        if (mobileVideo.readyState >= 2) tryPlay();
        else mobileVideo.addEventListener("loadeddata", tryPlay, { once: true });
      }
      return;
    }

    let duration = 0;
    let targetTime = 0;
    let smoothTime = 0;
    let seeking = false;
    let rafId = 0;
    let active = false;

    const onMeta = () => {
      duration = video.duration || 0;
      if (duration > 0 && video.readyState >= 2) {
        try {
          video.currentTime = 0.001;
        } catch {
          /* ignore */
        }
      }
    };
    if (video.readyState >= 1) onMeta();
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("seeked", () => {
      seeking = false;
    });
    video.pause();

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (!active || !duration) return;

      smoothTime += (targetTime - smoothTime) * SCRUB_LERP;

      if (seeking) return;
      if (Math.abs(smoothTime - video.currentTime) < SEEK_EPSILON) return;

      const next = Math.min(Math.max(smoothTime, 0), Math.max(duration - 0.04, 0));
      if (!Number.isFinite(next)) return;

      seeking = true;
      try {
        video.currentTime = next;
      } catch {
        seeking = false;
      }
    };
    rafId = requestAnimationFrame(tick);

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set([panelA, panelB], { autoAlpha: 1, y: 0 });
        gsap.set(videoWrap, { xPercent: 0, scale: 1 });
        active = true;
        return;
      }

      gsap.set(videoWrap, { xPercent: 52, scale: 0.94, force3D: true });
      gsap.set(panelA, { autoAlpha: 0, y: 40 });
      gsap.set(panelA.querySelectorAll(".about-line-inner"), { yPercent: 110 });
      gsap.set(panelB, { autoAlpha: 0, y: 40 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.85,
          onEnter: () => {
            active = true;
          },
          onEnterBack: () => {
            active = true;
          },
          onLeave: () => {
            active = false;
          },
          onLeaveBack: () => {
            active = false;
          },
          onUpdate: (self) => {
            if (!duration) return;
            targetTime = Math.min(duration - 0.05, self.progress * duration);
          },
        },
      });

      tl.to(panelA, { autoAlpha: 1, y: 0, ease: EASE, duration: 0.1 }, 0.02);
      tl.to(
        panelA.querySelectorAll(".about-line-inner"),
        { yPercent: 0, ease: EASE, duration: 0.12, stagger: 0.02 },
        0.02,
      );
      tl.to(videoWrap, { scale: 1, ease: EASE, duration: 0.12 }, 0.02);

      tl.to(panelA, { autoAlpha: 0, y: -36, duration: 0.16 }, 0.38);
      tl.to(
        videoWrap,
        { xPercent: -52, ease: "power2.inOut", duration: 0.26 },
        0.38,
      );
      tl.to(panelB, { autoAlpha: 1, y: 0, ease: EASE, duration: 0.16 }, 0.5);

      tl.to({}, { duration: 0.16 });
    }, sectionRef);

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener("loadedmetadata", onMeta);
      ctx.revert();
    };
  }, [t]);

  const scrollToContact = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById("contato");
    if (!target) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { offset: 0 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="relative z-10 w-full bg-[#0A0A0A] text-[#f5f5f7] md:h-[340vh]"
    >
      {/* —— Mobile: stack estático (sem scrub lateral) —— */}
      <div className="relative overflow-x-hidden px-4 py-16 md:hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,_rgba(25,229,123,0.1)_0%,_transparent_55%)]" />

        <div className="relative mx-auto max-w-lg">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#19E57B] opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#19E57B]" />
            </span>
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/70">
              {t("about.eyebrow")}
            </span>
          </div>

          <h2 className="font-brand text-[clamp(2.1rem,10vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-white">
            {headlineLines.map((line, i) => (
              <span key={line + i} className="block pb-[0.06em]">
                {i === headlineLines.length - 1 ? (
                  <span className="text-[#19E57B]">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h2>

          <div className="relative mx-auto mt-8 aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-[22px] bg-[#111] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
            <video
              ref={mobileVideoRef}
              src="/v2/about-camera.mp4"
              muted
              playsInline
              loop
              autoPlay
              preload="metadata"
              aria-label={t("about.videoAlt")}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/10" />
          </div>

          <div className="mt-10 space-y-10">
            <div>
              <h3 className="font-brand text-[clamp(1.6rem,7vw,2.2rem)] font-black uppercase leading-[0.95] tracking-[-0.03em] text-white">
                {t("about.panel1Title")}
              </h3>
              <p className="mt-4 text-base font-medium leading-[1.55] text-white/75">
                {t("about.panel1Text")}
              </p>
            </div>

            <div>
              <h3 className="font-brand text-[clamp(1.6rem,7vw,2.2rem)] font-black uppercase leading-[0.95] tracking-[-0.03em] text-white">
                {t("about.panel2Title")}
              </h3>
              <p className="mt-4 text-base font-medium leading-[1.55] text-white/75">
                {t("about.panel2Text")}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2.5">
                {pills.map((pill) => (
                  <li
                    key={pill}
                    className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/80"
                  >
                    {pill}
                  </li>
                ))}
              </ul>

              <a
                href="#contato"
                onClick={scrollToContact}
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#19E57B] transition-opacity duration-200 hover:opacity-80"
              >
                {t("about.cta")}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* —— Desktop: sticky scrub Lusion-like —— */}
      <div
        ref={stageRef}
        className="sticky top-0 hidden h-screen items-center overflow-hidden px-4 md:flex md:px-6 lg:px-10"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,_rgba(25,229,123,0.1)_0%,_transparent_58%)]" />

        <div className="relative mx-auto h-[70vh] w-full max-w-[1600px]">
          <div className="absolute left-1/2 top-1/2 w-[clamp(260px,40vw,560px)] -translate-x-1/2 -translate-y-1/2">
            <div
              ref={videoWrapRef}
              className="will-change-transform"
              style={{ transform: "translateZ(0)" }}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[22px] bg-[#111] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
                <video
                  ref={videoRef}
                  src="/v2/about-camera.mp4"
                  muted
                  playsInline
                  preload="auto"
                  aria-label={t("about.videoAlt")}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ transform: "translateZ(0)" }}
                />
                <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/10" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,_transparent_60%,_rgba(0,0,0,0.45)_100%)]" />
              </div>
            </div>
          </div>

          <div
            ref={panelARef}
            className="absolute left-0 top-1/2 w-full max-w-[34rem] -translate-y-1/2 md:max-w-[38%]"
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#19E57B] opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#19E57B]" />
              </span>
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/70">
                {t("about.eyebrow")}
              </span>
            </div>

            <h2 className="font-brand text-[clamp(2.4rem,5.2vw,4.8rem)] font-black uppercase leading-[0.9] tracking-[-0.04em] text-white">
              {headlineLines.map((line, i) => (
                <span
                  key={line + i}
                  className="block overflow-hidden pb-[0.08em]"
                >
                  <span className="about-line-inner inline-block">
                    {i === headlineLines.length - 1 ? (
                      <span className="text-[#19E57B]">{line}</span>
                    ) : (
                      line
                    )}
                  </span>
                </span>
              ))}
            </h2>

            <p className="mt-6 max-w-[42ch] text-[clamp(1rem,1.4vw,1.35rem)] font-medium leading-[1.55] text-white/75">
              <span className="font-semibold text-white">
                {t("about.panel1Title")}.{" "}
              </span>
              {t("about.panel1Text")}
            </p>
          </div>

          <div
            ref={panelBRef}
            className="absolute right-0 top-1/2 flex w-full max-w-[34rem] -translate-y-1/2 flex-col items-start md:left-auto md:max-w-[38%] md:items-end md:text-right"
          >
            <h3 className="font-brand text-[clamp(2.2rem,4.6vw,4rem)] font-black uppercase leading-[0.95] tracking-[-0.03em] text-white">
              {t("about.panel2Title")}
            </h3>

            <p className="mt-6 max-w-[42ch] text-[clamp(1rem,1.4vw,1.35rem)] font-medium leading-[1.55] text-white/75">
              {t("about.panel2Text")}
            </p>

            <ul className="mt-8 flex flex-wrap gap-2.5 md:justify-end">
              {pills.map((pill) => (
                <li
                  key={pill}
                  className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm transition-colors duration-200 hover:border-[#19E57B]/60 hover:text-white"
                >
                  {pill}
                </li>
              ))}
            </ul>

            <a
              href="#contato"
              onClick={scrollToContact}
              className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-[#19E57B] transition-opacity duration-200 hover:opacity-80"
            >
              {t("about.cta")}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
