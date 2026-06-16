"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import DotField from "@/components/dot-field/DotField";
import ScrollStack, {
  ScrollStackItem,
  type ScrollStackHandle,
} from "./ScrollStack";
import {
  getLenis,
  setPageScrollLocked,
} from "@/app/hooks/useSmoothScroll";
import dash1 from "../../public/dash1.webp";
import dash2 from "../../public/dash2.webp";
import dash3 from "../../public/dash3.webp";

const DASHBOARDS = [
  { src: dash1, alt: "Dashboard do projeto 1" },
  { src: dash2, alt: "Dashboard do projeto 2" },
  { src: dash3, alt: "Dashboard do projeto 3" },
] as const;

type HeroProps = {
  onPageUnlock?: () => void;
};

export default function Hero({ onPageUnlock }: HeroProps) {
  const stackRef = useRef<ScrollStackHandle>(null);
  const touchLastYRef = useRef<number | null>(null);
  const stackAtEndRef = useRef(false);
  const [stackAtEnd, setStackAtEnd] = useState(false);
  const [pageUnlocked, setPageUnlocked] = useState(false);

  const markStackAtEnd = useCallback(() => {
    if (stackAtEndRef.current) return;
    stackAtEndRef.current = true;
    setStackAtEnd(true);
  }, []);

  const unlockPage = useCallback(
    (deltaY?: number) => {
      if (pageUnlocked) return;
      setPageUnlocked(true);
      setPageScrollLocked(false);
      onPageUnlock?.();

      if (deltaY && deltaY > 0) {
        requestAnimationFrame(() => {
          const lenis = getLenis();
          if (lenis) {
            lenis.scrollTo(lenis.scroll + deltaY, { immediate: false });
          }
        });
      }
    },
    [pageUnlocked, onPageUnlock],
  );

  useEffect(() => {
    if (pageUnlocked) return;

    let intervalId: ReturnType<typeof setInterval> | undefined;

    const tryLock = () => {
      if (!getLenis()) return false;
      setPageScrollLocked(true);
      return true;
    };

    if (!tryLock()) {
      intervalId = setInterval(() => {
        if (tryLock() && intervalId) {
          clearInterval(intervalId);
        }
      }, 50);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (!pageUnlocked) {
        setPageScrollLocked(false);
      }
    };
  }, [pageUnlocked]);

  useEffect(() => {
    if (pageUnlocked) return;

    const handleWheel = (event: WheelEvent) => {
      const scroller = stackRef.current?.scroller;
      if (!scroller) return;

      if (stackAtEndRef.current) {
        if (event.deltaY > 0) {
          unlockPage(event.deltaY);
        } else {
          event.preventDefault();
        }
        return;
      }

      const maxScroll = scroller.scrollHeight - scroller.clientHeight;

      event.preventDefault();
      scroller.scrollTop = Math.min(
        scroller.scrollTop + event.deltaY,
        maxScroll,
      );

      if (stackRef.current?.isAtEnd()) {
        markStackAtEnd();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchLastYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const scroller = stackRef.current?.scroller;
      const touch = event.touches[0];
      if (!scroller || !touch || touchLastYRef.current === null) return;

      const deltaY = touchLastYRef.current - touch.clientY;
      touchLastYRef.current = touch.clientY;

      if (stackAtEndRef.current) {
        if (deltaY > 0) {
          unlockPage(deltaY);
        } else {
          event.preventDefault();
        }
        return;
      }

      const maxScroll = scroller.scrollHeight - scroller.clientHeight;

      event.preventDefault();
      scroller.scrollTop = Math.min(
        scroller.scrollTop + deltaY,
        maxScroll,
      );

      if (stackRef.current?.isAtEnd()) {
        markStackAtEnd();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [pageUnlocked, unlockPage, markStackAtEnd]);

  return (
    <>
      <section
        className={`hero-section relative flex flex-col items-center overflow-hidden bg-black px-6 ${
          pageUnlocked
            ? "min-h-screen justify-center pt-20"
            : "fixed inset-0 z-30 h-svh justify-start pt-14 md:pt-16"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 z-0">
          <DotField
            dotRadius={1.5}
            dotSpacing={14}
            bulgeStrength={67}
            glowRadius={160}
            sparkle={false}
            waveAmplitude={0}
            gradientFrom="rgba(232, 197, 71, 0.28)"
            gradientTo="rgba(201, 162, 39, 0.18)"
            glowColor="#1a1508"
          />
        </div>

        <div className="hero-glow pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.08)_0%,_transparent_55%)]" />

        <div className="relative z-10 flex h-full min-h-0 w-full flex-1 flex-col items-center">
          <p className="hero-eyebrow mb-4 shrink-0 text-sm font-medium tracking-wide text-[#86868b]">
            DR Inovações
          </p>

          <h1 className="hero-title max-w-4xl shrink-0 text-center text-[clamp(2.25rem,7vw,5.5rem)] font-semibold leading-[1.05] tracking-tight text-[#f5f5f7]">
            Software que
            <br />
            <span className="text-[#E8C547]">transforma ideias.</span>
          </h1>

          <p className="hero-subtitle mt-4 max-w-xl shrink-0 text-center text-base text-[#86868b] md:mt-6 md:text-xl">
            Desenvolvemos sistemas, sites e automações com design refinado e
            engenharia de ponta.
          </p>

          <div className="hero-cta mt-6 flex shrink-0 flex-wrap items-center justify-center gap-4 md:mt-10">
            <a
              href="#projetos"
              className="rounded-full bg-[#C9A227] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#B8922A]"
            >
              Ver projetos
            </a>
            <a
              href="#contato"
              className="text-sm font-medium text-[#E8C547] transition-opacity hover:opacity-80"
            >
              Iniciar um projeto →
            </a>
          </div>

          <div className="hero-visual mt-auto w-full shrink-0 pb-6 md:pb-8">
            <div className="hero-stack-stage relative mx-auto w-full max-w-3xl overflow-hidden">
              <div className="hero-stack-viewport h-[clamp(160px,calc(100svh-24rem),440px)] w-full overflow-hidden">
                <ScrollStack
                  ref={stackRef}
                  className="hero-scroll-stack h-full"
                  frozen={stackAtEnd}
                  itemDistance={56}
                  itemStackDistance={16}
                  stackPosition="60%"
                  scaleEndPosition="8%"
                  baseScale={0.9}
                  itemScale={0.04}
                  blurAmount={1.5}
                  onStackEnd={markStackAtEnd}
                >
                  {DASHBOARDS.map((dashboard) => (
                    <ScrollStackItem key={dashboard.alt}>
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#1d1d1f] to-[#000] shadow-2xl">
                        <Image
                          src={dashboard.src}
                          alt={dashboard.alt}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, 768px"
                          priority={dashboard.src === dash1}
                        />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
                      </div>
                    </ScrollStackItem>
                  ))}
                </ScrollStack>
              </div>
            </div>
          </div>
        </div>
      </section>

      {!pageUnlocked && (
        <div className="h-screen shrink-0" aria-hidden="true" />
      )}
    </>
  );
}
