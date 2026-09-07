import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import config from "../../portfolio.config";

function getIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] || LucideIcons.Star;
}

export function Services() {
  if (!config.sections.services) return null;

  return (
    <section
      id="services"
      className="py-24 px-4 md:px-8 bg-surface-light border-y border-border"
      aria-labelledby="services-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent font-sans font-bold tracking-widest text-xs uppercase mb-3">
            What I Work With
          </p>
          <h2
            id="services-heading"
            className="text-3xl md:text-5xl font-semibold text-heading leading-tight"
          >
            Software, hardware, and ideas in between.
          </h2>
          <div className="h-1 w-20 bg-accent mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {config.services.map(({ title, description, icon }) => {
            const Icon = getIcon(icon);
            return (
              <article
                key={title}
                className="terminal-panel group relative p-8 hover:border-accent/60 transition-colors"
              >
                <Icon className="w-8 h-8 text-accent mb-5" aria-hidden="true" />
                <h3 className="font-mono text-xl text-heading mb-3">{title}</h3>
                <p className="text-muted text-base leading-relaxed font-light">{description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
