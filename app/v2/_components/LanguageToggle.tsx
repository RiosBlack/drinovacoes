"use client";

import { useLanguage } from "../_i18n/LanguageProvider";

export default function LanguageToggle({
  className = "",
}: {
  className?: string;
}) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`flex items-center gap-1 rounded-full border border-white/15 bg-black/40 p-1 text-xs font-medium backdrop-blur ${className}`}
      role="group"
      aria-label="Language selector"
    >
      {(["en", "pt"] as const).map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={`cursor-pointer rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors duration-200 ${
              active
                ? "bg-[#19E57B] text-black"
                : "text-white/60 hover:text-white"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
