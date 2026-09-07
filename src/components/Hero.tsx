import type { HeroConfig, SiteSettings } from "@/lib/types";
import { CompactTerminal } from "@/components/CompactTerminal";

export function Hero({ settings, hero }: { settings: SiteSettings; hero: HeroConfig }) {
  const background = hero.images[0] || "";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24" aria-label="Introduction">
      <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url('${background}')` }} role="img" aria-label="My development workbench" />
      <div className="absolute inset-0 terminal-grid bg-gradient-to-r from-surface-deep via-surface-deep/90 to-surface/55" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-4xl">
          <p className="terminal-label mb-8">viraj@portfolio:~$ whoami<span className="terminal-cursor" aria-hidden="true">_</span></p>
          <p className="text-muted font-mono text-sm md:text-base mb-4">{settings.location}</p>
          <h1 className="text-5xl md:text-8xl lg:text-9xl text-heading font-bold tracking-[-0.05em] leading-[0.9] mb-7">{settings.name}</h1>
          <p className="text-accent font-mono text-base md:text-xl mb-5">{settings.role}</p>
          <p className="text-body text-xl md:text-3xl max-w-2xl leading-relaxed mb-10">{settings.tagline}</p>

          <CompactTerminal />
        </div>
      </div>
    </section>
  );
}
