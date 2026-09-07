import { Content } from "./types";
import config from "../../portfolio.config";

/**
 * Default content generated from portfolio.config.ts.
 * This serves as the fallback when no content.json exists in storage.
 * Users customize their site by editing portfolio.config.ts (for structure)
 * and using the admin panel (for content like projects and testimonials).
 */
export const defaultContent: Content = {
  settings: {
    name: config.personal.name,
    role: config.personal.role,
    tagline: config.personal.tagline,
    location: config.personal.location,
    bio: config.personal.bio,
    heroVideoId: "",
    profilePhotoUrl: config.personal.profilePhotoUrl,
    aboutHeading: config.personal.aboutHeading,
    phone: config.contact.phone || "",
    whatsapp: config.contact.whatsapp || "",
    email: config.contact.email,
    bookingUrl: config.contact.bookingUrl || "",
    resumeUrl: config.contact.resumeUrl || "",
    socials: Object.fromEntries(
      Object.entries(config.socials).filter(([, v]) => v && v !== "#")
    ),
  },
  hero: {
    images: config.hero.backgroundMedia,
    intervalMs: config.hero.intervalMs,
  },
  projects: [
    { id: "xboard", title: "Xboard RP2040 Dev Board", videoUrl: "https://github.com/Ghost-af16/Xboard", videoId: "xboard", platform: "drive", category: "Hardware", tags: ["Featured", "Hardware"], priority: 1, featured: true, thumbnailUrl: "/projects/xboard.png", description: "I designed a custom RP2040 development board in KiCad and prepared it for PCB fabrication.", technologies: ["KiCad", "RP2040", "PCB Design"], built: "I created the schematic, PCB layout, bill of materials, and fabrication-ready production files.", challenge: "I worked through routing a compact board while keeping the component layout practical for fabrication and future projects.", linkType: "external" },
    { id: "split-keebu", title: "SPLIT-KEEBU", videoUrl: "https://github.com/Thunder-god-adi/SPLIT-KEEBU", videoId: "split-keebu", platform: "drive", category: "Hardware", tags: ["Featured", "Hardware"], priority: 2, featured: true, thumbnailUrl: "/projects/split-keebu.png", description: "I built a 42-key wireless split keyboard with custom PCBs, a FreeCAD case, and ZMK firmware.", technologies: ["KiCad", "FreeCAD", "ZMK", "NRF52840"], built: "I designed the left and right PCBs, wireless controller setup, hot-swap support, case, and plate assembly.", challenge: "I had to fit 42 keys, two controllers, batteries, displays, and wireless firmware into a compact split layout.", linkType: "external" },
    { id: "sprig", title: "Sprig Exploration", videoUrl: "https://github.com/Ghost-af16/sprig", videoId: "sprig", platform: "drive", category: "Software", tags: ["Software", "Games"], priority: 3, thumbnailUrl: "/viraj-workbench.png", description: "I used a personal fork to explore Hack Club's open-source Sprig game platform and its JavaScript ecosystem.", technologies: ["JavaScript", "Sprig", "Open Source"], built: "I explored Sprig's game files, editor structure, and tile-based JavaScript format locally.", challenge: "I learned how to navigate a large open-source codebase and find the parts used to build and run small games.", linkType: "external" },
    { id: "formula-one", title: "Formula 1 Website", videoUrl: "https://github.com/Ghost-af16/F1", videoId: "formula-one", platform: "drive", category: "Web Development", tags: ["Featured", "Software"], priority: 4, featured: true, thumbnailUrl: "/viraj-workbench.png", description: "I built a Formula 1 fan website with HTML and Tailwind CSS, covering teams, drivers, and achievements.", technologies: ["HTML", "Tailwind CSS", "Web Design"], built: "I created a responsive page with navigation and sections for teams, drivers, achievements, and common F1 questions.", challenge: "I organized a large amount of racing content into a simple page while learning responsive web layout.", linkType: "external" },
    { id: "fpv-build", title: "FPV Quad Build", videoUrl: "#gallery", videoId: "fpv-build", platform: "drive", category: "Hardware", tags: ["Featured", "Hardware"], priority: 5, featured: true, thumbnailUrl: "/viraj-fpv.png", description: "I built an FPV quadcopter and handled the electronics, assembly, setup, and testing.", technologies: ["FPV", "Electronics", "Assembly"], built: "I assembled the frame, motors, electronics, radio hardware, and battery components into a compact quad.", challenge: "I balanced component placement, wiring, weight, and durability inside a small airframe.", linkType: "external" },
  ],
  testimonials: [],
  filters: config.portfolioFilters,
};
