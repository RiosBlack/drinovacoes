import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ProjectDetailShell({ children }: Props) {
  return (
    <main className="min-h-screen bg-[var(--project-bg)] pt-14 md:pt-16">
      <div className="mx-auto max-w-[980px] px-6 pb-24 md:pb-32">{children}</div>
    </main>
  );
}
