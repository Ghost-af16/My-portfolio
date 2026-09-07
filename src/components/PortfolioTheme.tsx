import { palettes, fontPairings } from "@/lib/config";
import type { PaletteName, FontPairingName, PortfolioConfig } from "@/lib/config";

/**
 * Full theme variable sets for dark and light palettes.
 * These control every text, border, and surface color in the portfolio components.
 */
function buildThemeVars(
  palette: PaletteName | "custom",
  customColors?: PortfolioConfig["theme"]["customColors"]
) {
  const colors = palette === "custom" && customColors ? customColors : palettes[palette as PaletteName] ?? palettes.cinema;
  const isLight = /^#[e-f]/i.test(colors.bg);

  if (isLight) {
    return {
      // Surfaces
      "--portfolio-bg": colors.bg,
      "--portfolio-bg-light": colors.bgLight,
      "--portfolio-bg-card": colors.bgCard,
      "--portfolio-bg-deep": colors.bgLight,
      // Text
      "--portfolio-heading": "#18181b",
      "--portfolio-body": "#27272a",
      "--portfolio-muted": "#52525b",
      "--portfolio-faint": "#a1a1aa",
      "--portfolio-on-accent": "#ffffff",
      // Accent
      "--portfolio-accent": colors.accent,
      "--portfolio-accent-hover": colors.accentHover,
      // Borders
      "--portfolio-border": "rgba(0,0,0,0.08)",
      "--portfolio-border-accent": "rgba(0,0,0,0.15)",
      // Overlays
      "--portfolio-overlay": "rgba(255,255,255,0.95)",
      "--portfolio-overlay-light": "rgba(255,255,255,0.6)",
    };
  }

  return {
    // Surfaces
    "--portfolio-bg": colors.bg,
    "--portfolio-bg-light": colors.bgLight,
    "--portfolio-bg-card": colors.bgCard,
    "--portfolio-bg-deep": "#000000",
    // Text
    "--portfolio-heading": "#ffffff",
    "--portfolio-body": "#e5e5e5",
    "--portfolio-muted": "#a1a1aa",
    "--portfolio-faint": "#71717a",
    "--portfolio-on-accent": "#000000",
    // Accent
    "--portfolio-accent": colors.accent,
    "--portfolio-accent-hover": colors.accentHover,
    // Borders
    "--portfolio-border": "rgba(255,255,255,0.05)",
    "--portfolio-border-accent": "rgba(255,255,255,0.1)",
    // Overlays
    "--portfolio-overlay": "rgba(0,0,0,0.9)",
    "--portfolio-overlay-light": "rgba(0,0,0,0.4)",
  };
}

export function PortfolioTheme({
  palette,
  fonts,
  customColors,
  children,
}: {
  palette: string;
  fonts: string;
  customColors?: PortfolioConfig["theme"]["customColors"];
  children: React.ReactNode;
}) {
  const fontPair = fontPairings[fonts as FontPairingName] ?? fontPairings.classic;
  const vars = buildThemeVars(palette as PaletteName | "custom", customColors);
  const style = {
    ...vars,
    "--portfolio-font-serif": fontPair.serif,
    "--portfolio-font-sans": fontPair.sans,
  } as React.CSSProperties;

  return <div style={style}>{children}</div>;
}
