"use client";

import { useCallback, useEffect, useState } from "react";
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
import ProjectsSection from "./_components/ProjectsSection";
import AboutSection from "./_components/AboutSection";

function V2Experience() {
  const [showBackground, setShowBackground] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

  useSmoothScroll();

  const handleBackground = useCallback(() => {
    setShowBackground(true);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setShowContent(true);
    setPreloaderDone(true);
  }, []);

  // Trava o scroll enquanto o preloader estiver ativo
  useEffect(() => {
    if (preloaderDone) return;

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
  }, [preloaderDone]);

  // Libera o scroll e recalcula triggers após a cortina subir
  useEffect(() => {
    if (!preloaderDone) return;
    setPageScrollLocked(false);
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, [preloaderDone]);

  return (
    <BackgroundAudioProvider active={showContent}>
      <main className="min-h-screen bg-[#0A0A0A] text-[#f5f5f7]">
        <Preloader
          onBackground={handleBackground}
          onComplete={handlePreloaderComplete}
        />
        <HeroSection showBackground={showBackground} showContent={showContent} />
        {preloaderDone ? <ProjectsSection /> : null}
        {preloaderDone ? <AboutSection /> : null}
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
