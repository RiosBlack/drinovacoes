"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;
let pageScrollLocked = false;

export function getLenis() {
  return lenisInstance;
}

export function isPageScrollLocked() {
  return pageScrollLocked;
}

export function setPageScrollLocked(locked: boolean) {
  pageScrollLocked = locked;

  if (!lenisInstance) return;

  if (locked) {
    lenisInstance.scrollTo(0, { immediate: true });
    lenisInstance.stop();
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.dataset.scrollLocked = "true";
  } else {
    delete document.body.dataset.scrollLocked;
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    lenisInstance.start();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }
}

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisInstance = lenis;
    lenis.on("scroll", () => {
      if (pageScrollLocked && lenis.scroll > 0) {
        lenis.scrollTo(0, { immediate: true });
      }
      ScrollTrigger.update();
    });

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
      pageScrollLocked = false;
      delete document.body.dataset.scrollLocked;
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}
