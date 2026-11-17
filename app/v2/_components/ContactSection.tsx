"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../_i18n/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#19E57B";
const WHATSAPP_BASE = "https://wa.me/5575981414537";
const INSTAGRAM_URL = "https://www.instagram.com/drinovacoes/";

function attachMagnetic(
  el: HTMLElement,
  strength = 0.28,
): () => void {
  const onMove = (event: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const onLeave = () => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  el.addEventListener("mousemove", onMove);
  el.addEventListener("mouseleave", onLeave);
  return () => {
    el.removeEventListener("mousemove", onMove);
    el.removeEventListener("mouseleave", onLeave);
    gsap.set(el, { clearProps: "x,y" });
  };
}

export default function ContactSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLAnchorElement>(null);
  const pillRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const whatsappUrl = useMemo(() => {
    const text = encodeURIComponent(t("contact.whatsappMessage"));
    return `${WHATSAPP_BASE}?text=${text}`;
  }, [t]);

  const { headlineTop, headlineBottom } = useMemo(() => {
    const full = t("contact.headline");
    const idx = full.lastIndexOf(" ");
    if (idx <= 0) return { headlineTop: full, headlineBottom: "" };
    return {
      headlineTop: full.slice(0, idx),
      headlineBottom: full.slice(idx + 1),
    };
  }, [t]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const canMagnetic =
      !prefersReduced &&
      window.matchMedia("(pointer: fine)").matches;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const reveal = section.querySelectorAll(".contact-reveal");

      if (prefersReduced) {
        gsap.set(reveal, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(reveal, { autoAlpha: 0, y: 36 });
      gsap.to(reveal, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      });

      if (canMagnetic) {
        if (circleRef.current) {
          cleanups.push(attachMagnetic(circleRef.current, 0.22));
        }
        for (const pill of pillRefs.current) {
          if (pill) cleanups.push(attachMagnetic(pill, 0.18));
        }
      }
    }, section);

    return () => {
      for (const cleanup of cleanups) cleanup();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="contato"
      ref={sectionRef}
      className="relative z-10 w-full overflow-hidden bg-[#0A0A0A] px-4 pb-16 pt-28 text-[#f5f5f7] md:px-8 md:pb-20 md:pt-36 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,_rgba(25,229,123,0.08)_0%,_transparent_55%)]" />

      <div className="relative mx-auto w-full max-w-[1200px]">
        {/* Headline */}
        <div className="contact-reveal relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <h2 className="font-brand max-w-[18ch] text-[clamp(2.6rem,8vw,6.5rem)] font-black leading-[0.92] tracking-[-0.04em] text-white">
            <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-2 md:gap-x-5">
              <span className="relative inline-block h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20 md:h-20 md:w-20 lg:h-24 lg:w-24">
                <Image
                  src="/v2/contact-portrait.jpg"
                  alt={t("contact.portraitAlt")}
                  fill
                  sizes="(min-width: 1024px) 96px, (min-width: 768px) 80px, 56px"
                  className="object-cover object-[50%_18%]"
                  quality={90}
                />
              </span>
              <span>{headlineTop}</span>
            </span>
            {headlineBottom ? (
              <span className="mt-1 block">{headlineBottom}</span>
            ) : null}
          </h2>

          <div
            aria-hidden="true"
            className="hidden self-start pt-3 text-white/70 md:block"
          >
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
              <path
                d="M2.8 0H12V9.2M12 0L0 12"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>

        {/* CTA stripe + circle */}
        <div className="contact-reveal relative mt-16 md:mt-24">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/15" />
          <div className="relative flex justify-end md:justify-center">
            <a
              ref={circleRef}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex h-[128px] w-[128px] items-center justify-center rounded-full text-center text-[0.95rem] font-semibold leading-tight text-[#0A0A0A] shadow-[0_18px_50px_-20px_rgba(25,229,123,0.65)] transition-transform duration-200 active:scale-[0.98] md:h-[168px] md:w-[168px] md:text-[1.05rem]"
              style={{ backgroundColor: ACCENT }}
            >
              <span className="max-w-[7.5ch] px-3">{t("contact.cta")}</span>
            </a>
          </div>
        </div>

        {/* Pills — uma em cada lado */}
        <div className="contact-reveal mt-12 flex flex-col gap-3 sm:mt-16 sm:flex-row sm:items-center sm:justify-between md:mt-16">
          <a
            ref={(node) => {
              pillRefs.current[0] = node;
            }}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/25 px-7 py-4 text-sm font-medium text-white transition-colors duration-300 hover:border-[#19E57B]/70 hover:text-[#19E57B] active:scale-[0.98] sm:w-auto sm:min-w-[220px]"
          >
            {t("contact.whatsapp")}
          </a>
          <a
            ref={(node) => {
              pillRefs.current[1] = node;
            }}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/25 px-7 py-4 text-sm font-medium text-white transition-colors duration-300 hover:border-[#19E57B]/70 hover:text-[#19E57B] active:scale-[0.98] sm:w-auto sm:min-w-[220px]"
          >
            {t("contact.instagram")}
          </a>
        </div>

        {/* Footer meta */}
        <footer className="contact-reveal mt-20 border-t border-white/10 pt-8 md:mt-28">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/45">
            {t("contact.versionLabel")}
          </p>
          <p className="mt-2 text-sm text-white/80">
            {t("contact.versionValue")}
          </p>
        </footer>
      </div>
    </section>
  );
}
