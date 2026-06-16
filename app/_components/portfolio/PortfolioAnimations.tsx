"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioAnimations() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const ctx = gsap.context(() => {
      // Hero entrance
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .from(".hero-eyebrow", { y: 30, opacity: 0, duration: 0.8 })
        .from(".hero-title", { y: 60, opacity: 0, duration: 1 }, "-=0.4")
        .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".hero-device", { y: 80, opacity: 0, scale: 0.95, duration: 1.2 }, "-=0.3");

      // Hero parallax on scroll
      gsap.to(".hero-visual", {
        y: -80,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-title", {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Navbar blur on scroll
      ScrollTrigger.create({
        trigger: ".hero-section",
        start: "top top",
        end: "+=100",
        onUpdate: (self) => {
          const nav = document.querySelector(".nav-bar");
          if (!nav) return;
          if (self.progress > 0.1) {
            nav.classList.add("nav-bar--scrolled");
          } else {
            nav.classList.remove("nav-bar--scrolled");
          }
        },
      });

      // Highlights pinned scrub
      const panels = gsap.utils.toArray<HTMLElement>(".highlight-panel");
      const tabs = gsap.utils.toArray<HTMLElement>(".highlight-tab");

      if (panels.length > 0) {
        gsap.set(panels[0], { opacity: 1, zIndex: 1, y: 0 });
        gsap.set(panels.slice(1), { opacity: 0, zIndex: 0, y: 30 });
        tabs[0]?.classList.add("highlight-tab--active");

        const highlightTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".highlights-section",
            start: "top top",
            end: `+=${panels.length * 600}`,
            pin: ".highlights-pin",
            scrub: 0.8,
            anticipatePin: 1,
          },
        });

        panels.forEach((panel, i) => {
          if (i === 0) return;
          highlightTl
            .to(
              panels[i - 1],
              { opacity: 0, y: -30, duration: 0.5, ease: "power2.inOut" },
              i,
            )
            .to(
              panel,
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.inOut" },
              i,
            )
            .call(
              () => {
                tabs.forEach((tab, ti) => {
                  tab.classList.toggle("highlight-tab--active", ti === i);
                });
              },
              undefined,
              i,
            );
        });
      }

      // Service headlines scrub
      gsap.utils.toArray<HTMLElement>(".service-headline").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.2, y: 60 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
            },
          },
        );
      });

      // Reveal text batch
      ScrollTrigger.batch(".reveal-text", {
        start: "top 90%",
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: true,
          });
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, {
            opacity: 0,
            y: 30,
            duration: 0.4,
            stagger: 0.05,
            overwrite: true,
          });
        },
      });

      gsap.set(".reveal-text", { opacity: 0, y: 30 });

      // Project cards
      ScrollTrigger.batch(".project-card", {
        start: "top 92%",
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.12,
              ease: "power3.out",
              overwrite: true,
            },
          );
        },
      });

      // Process steps
      ScrollTrigger.batch(".process-step", {
        start: "top 88%",
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
              overwrite: true,
            },
          );
        },
      });

      // Contact headline
      gsap.fromTo(
        ".contact-headline",
        { opacity: 0.15, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".contact-section",
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        ".contact-visual",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-visual",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return null;
}
