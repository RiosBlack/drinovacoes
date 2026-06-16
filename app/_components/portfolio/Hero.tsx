"use client";

import DotField from "@/components/dot-field/DotField";

export default function Hero() {
  return (
    <section className="hero-section relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 pt-20">
      <div className="pointer-events-none absolute inset-0 z-0">
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          bulgeStrength={67}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(232, 197, 71, 0.28)"
          gradientTo="rgba(201, 162, 39, 0.18)"
          glowColor="#1a1508"
        />
      </div>

      <div className="hero-glow pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.08)_0%,_transparent_55%)]" />

      <div className="relative z-10 flex w-full flex-col items-center">
        <p className="hero-eyebrow mb-4 text-sm font-medium tracking-wide text-[#86868b]">
          DR Inovações
        </p>

        <h1 className="hero-title max-w-4xl text-center text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[1.05] tracking-tight text-[#f5f5f7]">
          Software que
          <br />
          <span className="text-[#E8C547]">transforma ideias.</span>
        </h1>

        <p className="hero-subtitle mt-6 max-w-xl text-center text-lg text-[#86868b] md:text-xl">
          Desenvolvemos sistemas, sites e automações com design refinado e
          engenharia de ponta.
        </p>

        <div className="hero-cta mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projetos"
            className="rounded-full bg-[#C9A227] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#B8922A]"
          >
            Ver projetos
          </a>
          <a
            href="#contato"
            className="text-sm font-medium text-[#E8C547] transition-opacity hover:opacity-80"
          >
            Iniciar um projeto →
          </a>
        </div>

        <div className="hero-visual mt-16 w-full max-w-3xl">
          <div className="hero-device relative mx-auto aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#1d1d1f] to-[#000] shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-3 p-8 opacity-60">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#E8C547]/30 to-[#C9A227]/20"
                  />
                ))}
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
