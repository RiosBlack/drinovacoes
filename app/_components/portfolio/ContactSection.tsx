"use client";

import Image from "next/image";

export default function ContactSection() {
  const whatsappMessage = encodeURIComponent(
    "Olá! Gostaria de conversar sobre um projeto de software.",
  );
  const whatsappUrl = `https://wa.me/5575981414537?text=${whatsappMessage}`;

  return (
    <section
      id="contato"
      className="contact-section bg-[#f5f5f7] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[980px] text-center">
        <h2 className="contact-headline text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.08] tracking-tight text-[#1d1d1f]">
          Chegou a hora de construir
          <br />o extraordinário.
        </h2>
        <p className="reveal-text mx-auto mt-6 max-w-lg text-lg text-[#86868b]">
          Disponível para novos projetos. Vamos transformar sua ideia em
          tecnologia.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#C9A227] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#B8922A]"
          >
            Falar no WhatsApp
          </a>
          <a
            href="https://www.instagram.com/drinovacoes/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[#C9A227] transition-opacity hover:opacity-80"
          >
            Instagram →
          </a>
        </div>

        <div className="contact-visual relative mx-auto mt-16 flex max-w-sm flex-col items-center">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border border-[#d2d2d7]">
            <Image src="/foto2.2.png" alt="Douglas Rios" fill className="object-cover" />
          </div>
          <p className="mt-4 text-sm font-medium text-[#1d1d1f]">
            Douglas Rios
          </p>
          <p className="text-xs text-[#86868b]">Fundador, DR Inovações</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#30d158]" />
            <span className="text-xs text-[#86868b]">
              Disponível para projetos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
