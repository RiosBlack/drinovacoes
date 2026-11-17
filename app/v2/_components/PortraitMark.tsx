import Image from "next/image";

type PortraitMarkProps = {
  alt: string;
  className?: string;
};

/** Mesmo recorte do logo: quadrado com o canto superior direito cortado. */
const PHOTO_CLIP = "polygon(0 0, 72% 0, 100% 28%, 100% 100%, 0 100%)";
const CORNER_CLIP = "polygon(72% 0, 100% 0, 100% 28%)";

/**
 * Marca do hero no formato do logo DR: retrato espelhado (olhar à esquerda)
 * e o canto cortado em verde-neon.
 */
export default function PortraitMark({ alt, className = "" }: PortraitMarkProps) {
  return (
    <div
      className={`relative h-[4.85rem] w-[4.85rem] shrink-0 md:h-[5.85rem] md:w-[5.85rem] ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[#19E57B] shadow-[0_0_22px_rgba(25,229,123,0.55)]"
        style={{ clipPath: CORNER_CLIP }}
      />

      <div
        className="absolute inset-0 overflow-hidden shadow-[0_10px_28px_rgba(0,0,0,0.45)]"
        style={{ clipPath: PHOTO_CLIP }}
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
