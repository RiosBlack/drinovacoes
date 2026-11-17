"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  getLenis,
  setPageScrollLocked,
  useSmoothScroll,
} from "../hooks/useSmoothScroll";
import { LanguageProvider } from "./_i18n/LanguageProvider";
import { BackgroundAudioProvider } from "./_components/BackgroundAudio";
import Preloader from "./_components/Preloader";
import HeroSection from "./_components/HeroSection";

function V2Experience() {
  const [revealed, setRevealed] = useState(false);

  useSmoothScroll();

  // Trava o scroll enquanto o preloader estiver ativo
  useEffect(() => {
    if (revealed) return;

    let intervalId: ReturnType<typeof setInterval> | undefined;
    const tryLock = () => {
      if (!getLenis()) return false;
      setPageScrollLocked(true);
      return true;
    };

    if (!tryLock()) {
      intervalId = setInterval(() => {
        if (tryLock() && intervalId) clearInterval(intervalId);
      }, 50);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [revealed]);

  // Libera o scroll e recalcula triggers ao revelar
  useEffect(() => {
    if (!revealed) return;
    setPageScrollLocked(false);
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, [revealed]);

  return (
    <BackgroundAudioProvider active={revealed}>
      <main className="min-h-screen bg-[#0A0A0A] text-[#f5f5f7]">
        <Preloader onComplete={() => setRevealed(true)} />
        <HeroSection active={revealed} />
      </main>
    </BackgroundAudioProvider>
  );
}

export default function V2Page() {
  return (
    <LanguageProvider>
      <V2Experience />
    </LanguageProvider>
  );
}
