"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/#projetos", label: "Projetos" },
  { href: "/#contato", label: "Contato" },
];

export default function ProjectDetailNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`project-detail-nav fixed inset-x-0 top-0 z-50 ${
        scrolled ? "project-detail-nav--scrolled" : ""
      }`}
    >
      <nav className="mx-auto flex h-12 max-w-[980px] items-center justify-between px-6 md:h-11">
        <Link
          href="/"
          className="cursor-pointer opacity-80 transition-opacity hover:opacity-100"
        >
          <Image src="/logo.png" alt="DR Inovações" width={28} height={28} />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="cursor-pointer text-[12px] text-[#f5f5f7]/70 transition-colors duration-200 hover:text-[#f5f5f7]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/#contato"
          className="cursor-pointer rounded-full bg-[var(--project-cta)] px-3.5 py-1 text-[12px] font-medium text-white transition-colors duration-200 hover:bg-[#B8922A]"
        >
          Fale conosco
        </Link>
      </nav>
    </header>
  );
}
