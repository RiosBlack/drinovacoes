"use client";

import { useLanguage } from "../_i18n/LanguageProvider";

type RotatingSealProps = {
  size?: number;
  className?: string;
};

/**
 * Selo circular com texto girando (estilo da referência).
 * Cada caractere é posicionado no anel (360°), assim a frase
 * ocupa o círculo inteiro sem precisar repetir o texto.
 */
export default function RotatingSeal({
  size = 120,
  className = "",
}: RotatingSealProps) {
  const { t } = useLanguage();
  const chars = Array.from(t("hero.seal").trim());
  const radius = size * 0.42;

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-visible ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div
        className="dr-spin-slow absolute inset-0 overflow-visible"
        style={{ fontSize: Math.max(11, size * 0.12) }}
      >
        {chars.map((char, index) => {
          const angle = (360 / chars.length) * index;
          return (
            <span
              key={`${char}-${index}`}
              className="absolute left-1/2 top-1/2 font-semibold uppercase leading-none text-[#f5f5f7]"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </div>

      {/* Núcleo neon — ~40% do selo, ainda dentro do anel de texto */}
      <span
        className="relative block rounded-full bg-[#19E57B] shadow-[0_0_28px_rgba(25,229,123,0.75)]"
        style={{ width: size * 0.4, height: size * 0.4 }}
      />
    </div>
  );
}
