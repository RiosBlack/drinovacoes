"use client";
import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import AnimatedContent from "../animationContent";
import FadeContent from "../animationFadeIn";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

export default function HeaderMenu() {
  const styleLink =
    "text-zinc-400 transition delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:rotate-3 hover:text-white font-semibold";

  useEffect(() => {
    const headerSection = document.querySelector(".headerSection");

    gsap.registerPlugin(ScrollTrigger);

    gsap.to(headerSection, {
      ease: "power4.inOut",
      duration: 2,
      width: "30%",
      scrollTrigger: {
        trigger: headerSection,
        start: "top top",
        end: "+=500",
        scrub: true,
      },
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="headerSection fixed top-0 z-50 w-screen">
      <AnimatedContent
        distance={150}
        direction="vertical"
        reverse={false}
        config={{ tension: 50, friction: 25 }}
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.1}
        delay={3500}
      >
        <div className="flex items-center justify-between rounded-lg border-b-2 border-purple-800 bg-opacity-95 bg-gradient-to-b from-black via-black to-purple-950 px-3 py-2 backdrop-blur-xl sm:px-4 sm:py-3 md:px-5 md:py-3 lg:px-5 lg:py-3 xl:px-5 xl:py-3 2xl:px-5 2xl:py-3">
          <div className="flex w-full items-center justify-between">
            <FadeContent
              blur={true}
              duration={500}
              easing="ease-out"
              initialOpacity={0}
              delay={3500}
            >
              <Image
                width={35}
                height={35}
                alt="logo"
                src={logo}
                className="sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-12 lg:w-12 xl:h-12 xl:w-12 2xl:h-12 2xl:w-12"
              />
            </FadeContent>
            <AnimatedContent
              distance={150}
              direction="vertical"
              reverse={false}
              config={{ tension: 80, friction: 20 }}
              initialOpacity={0}
              animateOpacity
              scale={1.1}
              threshold={0.2}
              delay={4500}
            >
              <div className="hidden justify-center space-x-2 sm:flex sm:space-x-3 md:space-x-4 lg:space-x-4 xl:space-x-4 2xl:space-x-4">
                <div className={styleLink}>
                  <Link href="/">Home</Link>
                </div>
                <div className={styleLink}>
                  <Link href="#Sobre">Sobre</Link>
                </div>
                <div className={styleLink}>
                  <Link href="#Projetos">Projetos</Link>
                </div>
                <div className={styleLink}>
                  <Link href="#Contato">Contato</Link>
                </div>
              </div>
              {/* Menu mobile - só aparece em telas pequenas */}
              <div className="flex sm:hidden">
                <div className="text-sm font-semibold text-zinc-400">
                  <Link href="/">Menu</Link>
                </div>
              </div>
            </AnimatedContent>
            <div className="w-6 sm:w-8 md:w-10 lg:w-10 xl:w-10 2xl:w-10"></div>
          </div>
        </div>
      </AnimatedContent>
    </div>
  );
}
