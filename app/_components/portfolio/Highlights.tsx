"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import type { Project, ProjectCategory } from "@/app/types/portfolio";

const AUTO_INTERVAL_MS = 10_000;

type Props = {
  categories: ProjectCategory[];
  projects: Project[];
};

export default function Highlights({ categories, projects }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const selectCategory = useCallback((index: number) => {
    setActiveIndex(index);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (categories.length <= 1) return;

    const startTime = performance.now();
    let frame = 0;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const nextProgress = Math.min(100, (elapsed / AUTO_INTERVAL_MS) * 100);
      setProgress(nextProgress);

      if (elapsed >= AUTO_INTERVAL_MS) {
        setActiveIndex((current) => (current + 1) % categories.length);
        return;
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex, categories.length]);

  if (categories.length === 0) {
    return null;
  }

  const activeCategory = categories[activeIndex] ?? categories[0];
  const categoryProjects = projects.filter(
    (project) => project.category.slug === activeCategory.slug,
  );

  return (
    <section id="destaques" className="highlights-section bg-[#f5f5f7]">
      <div className="mx-auto max-w-[980px] px-6 py-24 md:py-32">
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight text-[#1d1d1f]">
          Projetos
        </h2>

        <div className="mt-12 flex flex-col gap-16 lg:flex-row lg:gap-20">
          <div className="highlights-nav flex shrink-0 flex-row gap-2 overflow-x-auto overflow-y-visible lg:w-48 lg:flex-col lg:gap-1 lg:overflow-visible">
            {categories.map((category, index) => (
              <div key={category.id} className="flex flex-col overflow-visible justify-center items-center">
                <button
                  type="button"
                  onClick={() => selectCategory(index)}
                  aria-pressed={activeIndex === index}
                  className={`highlight-tab whitespace-nowrap rounded-full px-4 py-2 text-left text-sm font-medium transition-colors lg:rounded-lg mb-1 w-full ${activeIndex === index
                    ? "highlight-tab--active"
                    : "text-[#86868b]"
                    }`}
                >
                  {category.title}
                </button>
                {activeIndex === index && (
                  <Progress
                    value={progress}
                    className="mx-4 mt-1.5 hidden lg:block"
                    aria-hidden
                  />
                )}
              </div>
            ))}
            <Progress
              value={progress}
              className="mt-2 lg:hidden"
              aria-hidden
            />
          </div>

          <div className="highlights-content min-h-[320px] flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeCategory.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="highlight-panel flex flex-col justify-start"
              >
                <div
                  className="mb-6 h-1 w-12 rounded-full"
                  style={{ backgroundColor: activeCategory.accentColor }}
                />
                <h3 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-tight tracking-tight text-[#1d1d1f]">
                  {activeCategory.headline}
                </h3>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-[#86868b]">
                  {activeCategory.description}
                </p>

                {categoryProjects.length > 0 ? (
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {categoryProjects.map((project) => (
                      <Link
                        key={project.id}
                        href={`/${project.slug}`}
                        className="group flex gap-4 rounded-2xl bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
                      >
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#e8e8ed]">
                          {project.coverImage && (
                            <Image
                              src={project.coverImage}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="80px"
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1 py-1">
                          <p className="truncate text-sm font-semibold text-[#1d1d1f]">
                            {project.title}
                          </p>
                          <p className="mt-1 line-clamp-2 text-xs text-[#86868b]">
                            {project.shortDescription}
                          </p>
                          {project.technologies.length > 0 && (
                            <p className="mt-2 truncate text-xs text-[#C9A227]">
                              {project.technologies.join(" · ")}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="mt-8 text-sm text-[#86868b]">
                    Nenhum projeto nesta categoria ainda.
                  </p>
                )}
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
