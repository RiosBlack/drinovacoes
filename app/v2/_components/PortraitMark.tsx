"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

type PortraitMarkProps = {
  alt: string;
  className?: string;
};

const TOP_CORNER = "polygon(72% 0, 100% 0, 100% 28%)";
const BOTTOM_CORNER = "polygon(72% 100%, 100% 100%, 100% 72%)";
const TOP_PHOTO = "polygon(0 0, 72% 0, 100% 28%, 100% 100%, 0 100%)";
const BOTTOM_PHOTO = "polygon(0 0, 100% 0, 100% 72%, 72% 100%, 0 100%)";

/**
 * Marca do hero no formato do logo DR.
 * No hover, o canto verde some de cima e reaparece embaixo, tremendo no lugar.
 */
export default function PortraitMark({ alt, className = "" }: PortraitMarkProps) {
  const greenRef = useRef<HTMLSpanElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef<gsap.core.Timeline | null>(null);

  const moveCorner = (toBottom: boolean) => {
    const green = greenRef.current;
    const photo = photoRef.current;
    if (!green || !photo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    motionRef.current?.kill();
    gsap.set(green, { rotation: 0, x: 0 });

    const tl = gsap.timeline();
    motionRef.current = tl;

    tl.to(green, {
      opacity: 0,
      y: toBottom ? -16 : 16,
      duration: 0.22,
      ease: "power2.in",
    })
      .set(green, {
        clipPath: toBottom ? BOTTOM_CORNER : TOP_CORNER,
        transformOrigin: toBottom ? "100% 100%" : "100% 0%",
        y: toBottom ? 16 : -16,
      })
      .set(photo, { clipPath: toBottom ? BOTTOM_PHOTO : TOP_PHOTO })
      .to(green, {
        opacity: 1,
        y: 0,
        duration: 0.28,
        ease: "power2.out",
      });

    if (toBottom) {
      tl.to(green, {
        keyframes: [
          { rotation: -8, x: -1.5, y: 1.5 },
          { rotation: 8, x: 1.5, y: -1.5 },
          { rotation: -5, x: -1, y: 1 },
          { rotation: 0, x: 0, y: 0 },
        ],
        duration: 0.48,
        ease: "none",
        repeat: -1,
      });
    }
  };

  return (
    <div
      className={`relative h-[4.85rem] w-[4.85rem] shrink-0 md:h-[5.85rem] md:w-[5.85rem] ${className}`}
      onMouseEnter={() => moveCorner(true)}
      onMouseLeave={() => moveCorner(false)}
    >
      <span
        ref={greenRef}
        aria-hidden="true"
        className="absolute inset-0 bg-[#19E57B] shadow-[0_0_22px_rgba(25,229,123,0.55)]"
        style={{ clipPath: TOP_CORNER, transformOrigin: "100% 0%" }}
      />

      <div
        ref={photoRef}
        className="absolute inset-0 overflow-hidden shadow-[0_10px_28px_rgba(0,0,0,0.45)]"
        style={{ clipPath: TOP_PHOTO }}
      >
        <Image
          src="/v2/hero-portrait.jpg"
          alt={alt}
          fill
          priority
          quality={90}
          sizes="180px"
          className="-scale-x-100 object-cover object-[62%_18%]"
        />
      </div>
    </div>
  );
}
