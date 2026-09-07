import type { ExperienceConfig } from "@/lib/config";
import { ExternalLink } from "lucide-react";

export function Experience({ items }: { items: ExperienceConfig[] }) {
  return (
    <section id="experience" className="border-y border-border bg-surface px-6 py-24" aria-labelledby="experience-heading">
      <div className="mx-auto max-w-6xl">
        <p className="terminal-label mb-4">~/experience</p>
        <h2 id="experience-heading" className="mb-14 text-3xl font-semibold text-heading md:text-5xl">
          My journey so far.
        </h2>

        <ol className="relative space-y-7 md:before:absolute md:before:bottom-8 md:before:left-[9.95rem] md:before:top-8 md:before:w-px md:before:bg-border">
          {items.map((item) => (
            <li key={`${item.organization}-${item.period}`} className="group grid items-start md:grid-cols-[8rem_4rem_1fr]">
              <p className="hidden pt-7 text-right font-mono text-sm font-semibold text-accent md:block">{item.period}</p>

              <div className="relative z-10 hidden justify-center pt-8 md:flex" aria-hidden="true">
                <span className="size-3 rounded-full border-2 border-accent bg-surface shadow-[0_0_16px_var(--color-accent)] transition-transform group-hover:scale-125" />
              </div>

              <article className="terminal-panel border-l-2 border-l-accent/60 p-6 transition duration-300 group-hover:-translate-y-1 group-hover:border-accent/70 md:p-8">
                <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-accent md:hidden">{item.period}</p>
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-body-muted">{item.organization}</p>
                <h3 className="mb-4 text-xl font-semibold text-heading md:text-2xl">{item.role}</h3>
                <p className="max-w-3xl leading-relaxed text-muted">{item.description}</p>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 font-mono text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
                  >
                    Visit {item.organization}
                    <ExternalLink size={15} aria-hidden="true" />
                  </a>
                )}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
