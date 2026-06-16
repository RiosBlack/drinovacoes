export default function Footer() {
  return (
    <footer className="border-t border-[#d2d2d7] bg-[#f5f5f7] px-6 py-8">
      <div className="mx-auto flex max-w-[980px] flex-col items-center justify-between gap-4 text-xs text-[#86868b] md:flex-row">
        <p>Copyright © {new Date().getFullYear()} DR Inovações.</p>
        <p>Desenvolvimento de software sob medida.</p>
      </div>
    </footer>
  );
}
