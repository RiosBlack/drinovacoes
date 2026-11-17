"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useLanguage } from "../_i18n/LanguageProvider";
import RotatingSeal from "./RotatingSeal";

type PreloaderProps = {
  /** Cortina começa a subir — revela só o fundo (LetterGlitch). */
  onBackground: () => void;
  /** Cortina terminou — hora do conteúdo do hero animar. */
  onComplete?: () => void;
};

export default function Preloader({ onBackground, onComplete }: PreloaderProps) {
  const { t } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const onBackgroundRef = useRef(onBackground);
  const onCompleteRef = useRef(onComplete);
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  onBackgroundRef.current = onBackground;
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const counter = { value: 0 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          setHidden(true);
          onCompleteRef.current?.();
        },
      });

      // Entrada do logo + selo
      tl.from(".preloader-logo", {
        opacity: 0,
        scale: 0.85,
        duration: prefersReduced ? 0 : 0.8,
      }).from(
        ".preloader-meta",
        { opacity: 0, y: 12, duration: prefersReduced ? 0 : 0.5 },
        "<0.2",
      );

      // Contador 0 -> 100
      tl.to(
        counter,
        {
          value: 100,
          duration: prefersReduced ? 0.3 : 2.1,
          ease: "power1.inOut",
          onUpdate: () => {
            const v = Math.round(counter.value);
            setProgress(v);
            if (barRef.current) {
              barRef.current.style.transform = `scaleX(${v / 100})`;
            }
          },
        },
        prefersReduced ? ">" : "<0.1",
      );

      // Saída do logo do preloader
      tl.to(".preloader-content", {
        opacity: 0,
        y: -24,
        duration: prefersReduced ? 0 : 0.45,
        ease: "power2.in",
      });

      // Cortina sobe: só o fundo aparece atrás (conteúdo do hero ainda oculto)
      tl.to(
        root,
        {
          yPercent: -100,
          duration: prefersReduced ? 0 : 0.75,
          ease: "power3.inOut",
          onStart: () => {
            onBackgroundRef.current();
          },
        },
        prefersReduced ? ">" : "<0.05",
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0A0A0A]"
    >
      <div className="preloader-content flex flex-col items-center gap-8 px-6">
        <div className="preloader-logo relative">
          <div className="relative h-28 w-28 overflow-hidden rounded-xl md:h-36 md:w-36">
            <Image
              src="/logo-dr-mark.png"
              alt="DR Inovações"
              fill
              priority
              sizes="(max-width: 768px) 112px, 144px"
              className="object-cover"
            />
          </div>

          <div className="absolute -right-5 -top-5 md:-right-7 md:-top-7">
            <RotatingSeal size={80} />
          </div>
        </div>

        <div className="preloader-meta flex w-56 flex-col items-center gap-2">
          <div className="flex w-full items-center justify-between text-xs uppercase tracking-[0.25em] text-white/50">
            <span>{t("preloader.loading")}</span>
            <span className="font-mono tabular-nums text-[#19E57B]">
              {progress}%
            </span>
          </div>
          <div className="h-px w-full overflow-hidden bg-white/10">
            <span
              ref={barRef}
              className="block h-full w-full origin-left bg-[#19E57B]"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
