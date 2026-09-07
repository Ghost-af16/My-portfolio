"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ExternalLink, X } from "lucide-react";
import type { Project } from "@/lib/types";

export function ProjectDetailModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (!project) return;
    previousFocusRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [project, handleKeyDown]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm p-3 md:p-8" role="dialog" aria-modal="true" aria-labelledby="project-detail-title">
      <button className="fixed inset-0 cursor-default" onClick={onClose} aria-label="Close project details" />
      <article className="terminal-panel relative z-10 max-w-6xl mx-auto my-4 md:my-10 overflow-hidden shadow-2xl">
        <header className="flex items-center justify-between gap-4 px-5 py-4 bg-surface-deep border-b border-accent/20">
          <p className="text-accent font-mono text-xs md:text-sm truncate">viraj@portfolio:~/projects/{project.id}</p>
          <button ref={closeRef} onClick={onClose} className="p-2 text-muted hover:text-accent transition-colors" aria-label="Close project details">
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="grid lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative min-h-[280px] md:min-h-[460px] bg-surface-deep p-5 md:p-8">
            {project.thumbnailUrl && (
              <Image src={project.thumbnailUrl} alt={`${project.title} project preview`} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-contain p-5 md:p-8" />
            )}
            <span className="absolute left-5 bottom-5 md:left-8 md:bottom-8 bg-accent text-on-accent px-3 py-2 font-mono text-[10px] font-bold tracking-wider uppercase">{project.category}</span>
          </div>

          <div className="p-6 md:p-10 bg-surface-light">
            <p className="terminal-label mb-4">$ open {project.id}</p>
            <h2 id="project-detail-title" className="text-3xl md:text-5xl text-heading font-semibold mb-5">{project.title}</h2>
            <p className="text-muted leading-relaxed mb-7">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies?.map((technology) => (
                <span key={technology} className="border border-accent/30 text-accent px-3 py-2 font-mono text-xs">{technology}</span>
              ))}
            </div>

            <div className="space-y-6 mb-9">
              <section className="border-l-2 border-accent pl-4">
                <h3 className="terminal-label mb-2">What I built</h3>
                <p className="text-body text-sm leading-relaxed">{project.built}</p>
              </section>
              <section className="border-l-2 border-accent/35 pl-4">
                <h3 className="terminal-label mb-2">The challenge</h3>
                <p className="text-body text-sm leading-relaxed">{project.challenge}</p>
              </section>
            </div>

            {project.videoUrl.startsWith("http") ? (
              <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent text-on-accent px-5 py-3 font-mono text-sm font-bold hover:bg-accent-hover transition-colors">
                View on GitHub <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            ) : (
              <a href={project.videoUrl} onClick={onClose} className="inline-flex items-center gap-2 bg-accent text-on-accent px-5 py-3 font-mono text-sm font-bold hover:bg-accent-hover transition-colors">
                View gallery
              </a>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
