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
import TextType from "./TextType";

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
  const pageUnlockedRef = useRef(false);
  const [stackAtEnd, setStackAtEnd] = useState(false);
  const [pageUnlocked, setPageUnlocked] = useState(false);

  const completeStack = useCallback(
    (deltaY?: number) => {
      if (stackAtEndRef.current) return;
      stackAtEndRef.current = true;
      setStackAtEnd(true);

      if (pageUnlockedRef.current) return;
      pageUnlockedRef.current = true;
      setPageUnlocked(true);
      setPageScrollLocked(false);
      onPageUnlock?.();

      requestAnimationFrame(() => {
        if (deltaY && deltaY > 0) {
          const lenis = getLenis();
          if (lenis) {
            lenis.scrollTo(lenis.scroll + deltaY, { immediate: false });
          }
          return;
        }

        const projetos = document.querySelector("#projetos");
        if (projetos) {
          const lenis = getLenis();
          if (lenis) {
            lenis.scrollTo(projetos, { offset: -80 });
          } else {
            projetos.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    },
    [onPageUnlock],
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
      if (pageUnlockedRef.current) return;

      const scroller = stackRef.current?.scroller;
      if (!scroller) return;

      const maxScroll =
        stackRef.current?.getMaxScroll() ??
        scroller.scrollHeight - scroller.clientHeight;

      event.preventDefault();
      scroller.scrollTop = Math.min(
        scroller.scrollTop + event.deltaY,
        maxScroll,
      );

      if (stackRef.current?.isAtEnd()) {
        completeStack(event.deltaY);
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchLastYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (pageUnlockedRef.current) return;

      const scroller = stackRef.current?.scroller;
      const touch = event.touches[0];
      if (!scroller || !touch || touchLastYRef.current === null) return;

      const deltaY = touchLastYRef.current - touch.clientY;
      touchLastYRef.current = touch.clientY;

      const maxScroll =
        stackRef.current?.getMaxScroll() ??
        scroller.scrollHeight - scroller.clientHeight;

      event.preventDefault();
      scroller.scrollTop = Math.min(
        scroller.scrollTop + deltaY,
        maxScroll,
      );

      if (stackRef.current?.isAtEnd()) {
        completeStack(deltaY);
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
  }, [pageUnlocked, completeStack]);

  return (
    <>
      <section
        className={`hero-section relative flex flex-col items-center overflow-hidden bg-black px-6 ${pageUnlocked
          ? "min-h-screen justify-center pt-20"
          : "fixed inset-0 z-30 h-svh justify-start pt-14 md:pt-32"
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

          <h1 className="hero-title max-w-4xl shrink-0 text-center text-[clamp(2.25rem,7vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-[#f5f5f7]">
            Transformamos ideias
            <br />
            <TextType
              as="span"
              text="em tecnologia."
              typingSpeed={75}
              initialDelay={600}
              loop={false}
              showCursor
              cursorCharacter="|"
              className="font-bitcount text-[#E8C547]"
              textColors={["#E8C547"]}
              cursorClassName="text-[#E8C547]"
            />
          </h1>

          <p className="hero-subtitle mt-4 max-w-xl shrink-0 text-center text-base text-[#86868b] md:mt-6 md:text-xl">
            Desenvolvemos sistemas, sites e automações com design refinado e
            engenharia de ponta.
          </p>

          <div className="hero-cta mt-6 flex shrink-0 flex-wrap items-center justify-center gap-4 md:mt-10">
            <button
              type="button"
              onClick={() => completeStack()}
              className="rounded-full bg-[#C9A227] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#B8922A]"
            >
              Ver projetos
            </button>
            <a
              href="#contato"
              className="text-sm font-medium text-[#E8C547] transition-opacity hover:opacity-80"
            >
              Iniciar um projeto →
            </a>
          </div>

          <div className="hero-visual mt-6 w-full shrink-0 pb-4 md:mt-8 md:pb-6">
            <div className="hero-stack-stage relative mx-auto w-full max-w-3xl overflow-hidden">
              <div className="hero-stack-viewport h-[clamp(160px,calc(100svh-24rem),440px)] w-full overflow-hidden">
                <ScrollStack
                  ref={stackRef}
                  className="hero-scroll-stack h-full"
                  frozen={stackAtEnd}
                  itemDistance={56}
                  itemStackDistance={16}
                  stackPosition="18%"
                  scaleEndPosition="8%"
                  baseScale={0.9}
                  itemScale={0.04}
                  blurAmount={1.5}
                  onStackEnd={completeStack}
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
