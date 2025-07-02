"use client";

import Image from "next/image";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedImagesProps {
  foto1: string;
  foto2: string;
  foto3: string;
}

export default function AnimatedImages({
  foto1,
  foto2,
  foto3,
}: AnimatedImagesProps) {
  useEffect(() => {
    // Configura as animações de scroll
    const images = gsap.utils.toArray(".animated-image") as HTMLElement[];

    images.forEach((image, index) => {
      gsap.fromTo(
        image,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: image,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.2, // Delay escalonado
        },
      );
    });

    // Configura animações de hover
    const handleMouseEnter = (e: Event) => {
      gsap.to(e.currentTarget, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = (e: Event) => {
      gsap.to(e.currentTarget, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Adiciona event listeners para hover
    images.forEach((image) => {
      image.addEventListener("mouseenter", handleMouseEnter);
      image.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup
    return () => {
      images.forEach((image) => {
        image.removeEventListener("mouseenter", handleMouseEnter);
        image.removeEventListener("mouseleave", handleMouseLeave);
      });
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="mt-6 grid w-[80%] content-center justify-items-center">
      <div className="animated-image relative mt-5 h-[500px] w-96 cursor-pointer overflow-hidden rounded-lg shadow-lg">
        <Image
          src={foto1 || ""}
          alt="Foto 1"
          fill
          className="object-contain transition-transform duration-300"
        />
      </div>
      <div className="animated-image relative mt-20 h-96 w-[520px] cursor-pointer overflow-hidden rounded-lg shadow-lg">
        <Image
          src={foto2 || ""}
          alt="Foto 2"
          fill
          className="object-contain transition-transform duration-300"
        />
      </div>
      <div className="animated-image relative mt-20 h-[450px] w-[450px] cursor-pointer overflow-hidden rounded-lg shadow-lg">
        <Image
          src={foto3 || ""}
          alt="Foto 3"
          fill
          className="object-contain transition-transform duration-300"
        />
      </div>
    </div>
  );
}
