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
        <div className="flex items-center justify-between rounded-lg border-b-2 border-purple-800 bg-opacity-95 bg-gradient-to-b from-black via-black to-purple-950 px-5 py-3 backdrop-blur-xl">
          <div className="flex w-full items-center justify-between">
            <FadeContent
              blur={true}
              duration={500}
              easing="ease-out"
              initialOpacity={0}
              delay={3500}
            >
              <Image width={50} height={50} alt="logo" src={logo} />
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
              <div className="flex justify-center space-x-4">
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
            </AnimatedContent>
            <div></div>
          </div>
        </div>
      </AnimatedContent>
    </div>
  );
}
