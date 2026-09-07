import type { Metadata, Viewport } from "next";
import {
  Playfair_Display, Inter, DM_Serif_Display, DM_Sans,
  Cormorant_Garamond, Montserrat, Libre_Baskerville, Source_Sans_3,
} from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import config from "../../portfolio.config";
import "./globals.css";

// ── Portfolio preset fonts ──────────────────────────────────────────
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--font-dm-serif", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-cormorant", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });
const libreBaskerville = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-libre", display: "swap" });
const sourceSans = Source_Sans_3({ subsets: ["latin"], variable: "--font-source-sans", display: "swap" });

const fontVars = [
  playfair.variable, inter.variable, dmSerif.variable, dmSans.variable,
  cormorant.variable, montserrat.variable, libreBaskerville.variable, sourceSans.variable,
  GeistSans.variable, GeistMono.variable,
].join(" ");

// ── Metadata ────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(config.seo.siteUrl),
  title: { default: config.personal.name, template: `%s | ${config.personal.name}` },
  description: config.personal.bio,
};

export const viewport: Viewport = {
  themeColor: "#050806",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVars}>
      <body className="min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
