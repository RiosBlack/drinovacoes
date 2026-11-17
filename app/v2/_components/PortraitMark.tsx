"use client";

import Image from "next/image";

type PortraitMarkProps = {
  alt: string;
  className?: string;
};

/**
 * Retrato do hero — preenche o container do pai.
 */
export default function PortraitMark({ alt, className = "" }: PortraitMarkProps) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <Image
        src="/v2/hero-portrait.png"
        alt={alt}
        fill
        priority
        quality={90}
        sizes="(min-width: 768px) 544px, 340px"
        className="-scale-x-100 object-cover object-[50%_12%]"
      />
    </div>
  );
}
