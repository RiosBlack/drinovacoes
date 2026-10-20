import Link from "next/link";

type Props = {
  variant?: "light" | "dark";
};

export default function Footer({ variant = "light" }: Props) {
  const isDark = variant === "dark";

  return (
    <footer
      className={
        isDark
          ? "border-t border-white/10 bg-black px-6 py-8"
          : "border-t border-[#d2d2d7] bg-[#f5f5f7] px-6 py-8"
      }
    >
      <div className="mx-auto flex max-w-[980px] flex-col items-center justify-between gap-4 text-xs text-[#86868b] md:flex-row">
        <p>Copyright © {new Date().getFullYear()} DR Inovações.</p>
        <Link
          href="/politica-de-privacidade"
          className={
            isDark
              ? "transition-colors hover:text-[#f5f5f7]"
              : "transition-colors hover:text-[#1d1d1f]"
          }
        >
          Política de Privacidade
        </Link>
        <p>Desenvolvimento de software sob medida.</p>
      </div>
    </footer>
  );
}
