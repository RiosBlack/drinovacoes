"use client";

import { useLanguage } from "../_i18n/LanguageProvider";

type RotatingSealProps = {
  size?: number;
  className?: string;
};

/**
 * Selo circular com texto girando (estilo da referência).
 * O texto gira via CSS (dr-spin-slow), com ponto neon central.
 */
export default function RotatingSeal({
  size = 120,
  className = "",
}: RotatingSealProps) {
  const { t } = useLanguage();
  const seal = t("hero.seal");

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        className="dr-spin-slow absolute inset-0 h-full w-full"
      >
        <defs>
          <path
            id="dr-seal-path"
            d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        <text
          fill="#f5f5f7"
          fontSize="8.5"
          letterSpacing="1.5"
          fontWeight={600}
        >
          <textPath href="#dr-seal-path" startOffset="0">
            {seal.repeat(2)}
          </textPath>
        </text>
      </svg>

      {/* Núcleo neon */}
      <span className="relative block h-5 w-5 rounded-full bg-[#19E57B] shadow-[0_0_24px_rgba(25,229,123,0.75)]" />
    </div>
  );
}
