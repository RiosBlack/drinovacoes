"use client";

import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/#destaques", label: "Destaques" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#projetos", label: "Projetos" },
  { href: "/#contato", label: "Contato" },
];

type Props = {
  solid?: boolean;
};

export default function Navbar({ solid = false }: Props) {
  return (
    <header
      className={`nav-bar fixed inset-x-0 top-0 z-50${solid ? " nav-bar--solid" : ""}`}
    >
      <nav className="mx-auto flex h-12 max-w-[980px] items-center justify-between px-6 md:h-11">
        <Link href="/" className="opacity-80 transition-opacity hover:opacity-100">
          <Image src="/logo.png" alt="DR Inovações" width={28} height={28} />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[12px] text-[#f5f5f7]/70 transition-colors hover:text-[#f5f5f7]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/#contato"
          className="rounded-full bg-[#C9A227] px-3.5 py-1 text-[12px] font-medium text-white transition-colors hover:bg-[#B8922A]"
        >
          Fale conosco
        </Link>
      </nav>
    </header>
  );
}
