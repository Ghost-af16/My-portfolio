# Viraj Vaibhav Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished terminal-green portfolio for Viraj Vaibhav using his real projects, photographs, skills, contact details, and natural copy.

**Architecture:** Preserve the template's configuration-driven Next.js architecture. Extend the existing config and content types only where developer projects, a local gallery, and a LinkedIn-backed resume action need explicit data; keep rendering in focused React components and use pure helper functions for behavior that needs unit tests.

**Tech Stack:** Next.js 16.2.2, React 19.2.4, TypeScript 5, Tailwind CSS 4, Lucide React, Vitest 4.1.4

**Spec:** `docs/superpowers/specs/2026-09-07-viraj-portfolio-design.md`

## Global Constraints

- Use a near-black background with restrained terminal-green accents.
- Use natural, concise copy; do not add inflated claims or AI-sounding marketing language.
- Treat `Ghost-af16` and `Thunder-god-adi` as Viraj's GitHub accounts.
- Do not claim authorship of upstream work in forked repositories.
- The Resume action must open `https://in.linkedin.com/in/viraj-vaibhav-9127b4351`.
- The primary contact method must be `mailto:virajmuz16@gmail.com`.
- Keep content usable with reduced motion enabled.
- Do not add a cloud storage dependency or fabricate testimonials, statistics, experience, or projects.

## File Map

- `portfolio.config.ts` — Viraj's identity, links, custom palette, services, sections, gallery, and SEO.
- `src/lib/config.ts` — config interfaces for resume and gallery data.
- `src/lib/types.ts` — runtime settings and project presentation fields.
- `src/lib/data.ts` — real project records and config-to-runtime mapping.
- `src/lib/projects.ts` — pure project-action helper shared by cards and tests.
- `src/components/ProjectCard.tsx` — external developer-project card with summary and technology tags.
- `src/components/Portfolio.tsx` — project filtering and modal behavior.
- `src/components/Gallery.tsx` — accessible three-image gallery.
- `src/components/Hero.tsx` — terminal-led hero and Resume action.
- `src/components/Navigation.tsx` — Gallery navigation entry and terminal-styled brand.
- `src/components/About.tsx` — profile presentation and natural student/developer copy.
- `src/components/Services.tsx` — skill/service grouping and developer-oriented heading.
- `src/components/ContactCTA.tsx` — direct email-focused contact section.
- `src/app/page.tsx` — places Gallery in the homepage flow.
- `src/app/globals.css` — restrained terminal visuals and reduced-motion fallback.
- `src/app/layout.tsx` — terminal-green browser theme color and metadata.
- `public/viraj-profile.jpg`, `public/viraj-workbench.jpg`, `public/viraj-fpv.jpg` — supplied images.
- `public/projects/xboard.png`, `public/projects/split-keebu.png` — repository-owned project imagery.
- `test/content-schema.test.ts` — personalized content and project schema checks.
- `test/project-actions.test.ts` — external-link behavior tests.
- `test/config-schema.test.ts` — gallery/resume configuration validation.

---

### Task 1: Add Viraj's Assets and Configuration

**Files:**
- Create: `public/viraj-profile.jpg`
- Create: `public/viraj-workbench.jpg`
- Create: `public/viraj-fpv.jpg`
- Create: `public/projects/xboard.png`
- Create: `public/projects/split-keebu.png`
- Modify: `portfolio.config.ts`
- Modify: `src/lib/config.ts`
- Modify: `src/lib/types.ts`
- Modify: `src/lib/data.ts`
- Test: `test/config-schema.test.ts`
- Test: `test/content-schema.test.ts`

**Interfaces:**
- Consumes: the three user-supplied PNG files and images contained in the Xboard/SPLIT-KEEBU repositories.
- Produces: `PortfolioConfig.contact.resumeUrl?: string`, `PortfolioConfig.sections.gallery: boolean`, `PortfolioConfig.gallery: GalleryItemConfig[]`, `SiteSettings.resumeUrl: string`, and personalized `defaultContent`.

- [ ] **Step 1: Write failing configuration and content tests**

Add assertions that lock down the requested identity and prevent placeholders:

```ts
it("contains Viraj's public identity and links", () => {
  expect(config.personal.name).toBe("Viraj Vaibhav");
  expect(config.personal.location).toBe("Dehradun, India");
  expect(config.contact.email).toBe("virajmuz16@gmail.com");
  expect(config.contact.resumeUrl).toBe(
    "https://in.linkedin.com/in/viraj-vaibhav-9127b4351"
  );
  expect(config.socials.github).toBe("https://github.com/Ghost-af16");
  expect(config.sections.testimonials).toBe(false);
  expect(config.sections.gallery).toBe(true);
  expect(config.gallery).toHaveLength(3);
});

it("contains five real portfolio entries", () => {
  expect(defaultContent.projects).toHaveLength(5);
  expect(defaultContent.projects.every((project) => project.videoUrl !== "https://youtu.be/dQw4w9WgXcQ")).toBe(true);
  expect(new Set(defaultContent.projects.map((project) => project.id)).size).toBe(5);
});
```

- [ ] **Step 2: Run the targeted tests and verify they fail**

Run: `npm test -- test/config-schema.test.ts test/content-schema.test.ts`

Expected: FAIL because `resumeUrl`, `gallery`, and Viraj's personalized content do not exist.

- [ ] **Step 3: Copy and optimize the supplied images**

Copy the attached files as follows, preserving image content:

```text
codex-clipboard-981a8aae-e60f-456f-bc67-c42ccb9b40b4.png -> public/viraj-profile.jpg
codex-clipboard-41f32345-1fb6-4a16-8615-b9af9717da58.png -> public/viraj-workbench.jpg
codex-clipboard-ebe0561b-f41c-4601-809c-f6046e7425b0.png -> public/viraj-fpv.jpg
```

Export one Xboard PCB view from its README attachment as `public/projects/xboard.png`. Copy `Images/Screenshot 2026-02-26 025321.png` from SPLIT-KEEBU as `public/projects/split-keebu.png`. Keep each output under 1.5 MB while preserving enough resolution for a 16:9 project card.

- [ ] **Step 4: Extend configuration interfaces**

Add this focused config type and fields:

```ts
export interface GalleryItemConfig {
  src: string;
  alt: string;
}

// PortfolioConfig.contact
resumeUrl?: string;

// PortfolioConfig.sections
gallery: boolean;

// PortfolioConfig
gallery: GalleryItemConfig[];
```

Add `resumeUrl: string` to `SiteSettings`, and map it in `defaultContent.settings` with `config.contact.resumeUrl || ""`.

- [ ] **Step 5: Replace template configuration with Viraj's content**

Use these exact identity values:

```ts
personal: {
  name: "Viraj Vaibhav",
  role: "Computer Science Student, Developer & Hardware Enthusiast",
  tagline: "I build things and learn how they work.",
  location: "Dehradun, India",
  bio: "I'm a B.Tech Computer Science and Engineering student specializing in Data Science at Shivalik University. I enjoy building software and hardware projects and learning how the technology around me works.\n\nMy interests range from programming and Linux to PCB design, 3D modelling, game development, and FPV builds.",
  profilePhotoUrl: "/viraj-profile.jpg",
  aboutHeading: "Curious about how things work—and how to build them.",
},
contact: {
  email: "virajmuz16@gmail.com",
  resumeUrl: "https://in.linkedin.com/in/viraj-vaibhav-9127b4351",
},
socials: {
  linkedin: "https://in.linkedin.com/in/viraj-vaibhav-9127b4351",
  github: "https://github.com/Ghost-af16",
},
theme: {
  palette: "custom",
  customColors: {
    bg: "#050806",
    bgLight: "#09110c",
    bgCard: "#0d1811",
    accent: "#66ff8a",
    accentHover: "#9affb2",
  },
  fonts: "minimal",
},
gallery: [
  { src: "/viraj-workbench.jpg", alt: "Viraj's electronics and development workbench" },
  { src: "/viraj-profile.jpg", alt: "Viraj at a mountain viewpoint" },
  { src: "/viraj-fpv.jpg", alt: "An FPV quadcopter built by Viraj" },
],
```

Enable hero, about, services, portfolio, gallery, and contact; disable testimonials. Use the five agreed service categories with one plain sentence each. Use filters `Featured`, `Hardware`, `Software`, `Games`, and `All`. Keep storage local and leave analytics empty.

- [ ] **Step 6: Populate five real project records**

Replace demo projects with:

```ts
[
  {
    id: "xboard",
    title: "Xboard RP2040 Dev Board",
    videoUrl: "https://github.com/Ghost-af16/Xboard",
    videoId: "xboard",
    platform: "drive",
    category: "Hardware",
    tags: ["Featured", "Hardware"],
    priority: 1,
    featured: true,
    thumbnailUrl: "/projects/xboard.png",
    description: "A custom RP2040 development board designed in KiCad and prepared for PCB fabrication.",
    linkType: "external",
  },
  {
    id: "split-keebu",
    title: "SPLIT-KEEBU",
    videoUrl: "https://github.com/Thunder-god-adi/SPLIT-KEEBU",
    videoId: "split-keebu",
    platform: "drive",
    category: "Hardware",
    tags: ["Featured", "Hardware"],
    priority: 2,
    featured: true,
    thumbnailUrl: "/projects/split-keebu.png",
    description: "A 42-key wireless split keyboard with custom PCBs, a FreeCAD case, and ZMK firmware.",
    linkType: "external",
  },
  {
    id: "sprig",
    title: "Sprig Exploration",
    videoUrl: "https://github.com/Ghost-af16/sprig",
    videoId: "sprig",
    platform: "drive",
    category: "Software",
    tags: ["Software", "Games"],
    priority: 3,
    thumbnailUrl: "/viraj-workbench.jpg",
    description: "A personal fork used to explore Hack Club's open-source Sprig game platform and its JavaScript game ecosystem.",
    linkType: "external",
  },
  {
    id: "formula-one",
    title: "Formula 1 Website",
    videoUrl: "https://github.com/Ghost-af16/F1",
    videoId: "formula-one",
    platform: "drive",
    category: "Web Development",
    tags: ["Featured", "Software"],
    priority: 4,
    featured: true,
    thumbnailUrl: "/viraj-workbench.jpg",
    description: "A Formula 1 fan website built with HTML and Tailwind CSS, covering teams, drivers, and achievements.",
    linkType: "external",
  },
  {
    id: "fpv-build",
    title: "FPV Quad Build",
    videoUrl: "#gallery",
    videoId: "fpv-build",
    platform: "drive",
    category: "Hardware",
    tags: ["Featured", "Hardware"],
    priority: 5,
    featured: true,
    thumbnailUrl: "/viraj-fpv.jpg",
    description: "A hands-on FPV quadcopter build combining electronics, assembly, setup, and testing.",
    linkType: "external",
  },
]
```

Extend `Project` with `description?: string` and `linkType?: "embed" | "external"`.

- [ ] **Step 7: Run targeted tests and commit**

Run: `npm test -- test/config-schema.test.ts test/content-schema.test.ts`

Expected: PASS.

```bash
git add portfolio.config.ts src/lib/config.ts src/lib/types.ts src/lib/data.ts test/config-schema.test.ts test/content-schema.test.ts public
git commit -m "feat: add Viraj portfolio content"
```

---

### Task 2: Make Project Cards Work for GitHub Projects

**Files:**
- Create: `src/lib/projects.ts`
- Modify: `src/components/ProjectCard.tsx`
- Modify: `src/components/Portfolio.tsx`
- Test: `test/project-actions.test.ts`

**Interfaces:**
- Consumes: `Project.linkType`, `Project.videoUrl`, `Project.description`, and `Project.tags` from Task 1.
- Produces: `getProjectAction(project: Project): { kind: "external" | "embed"; href: string; label: string }`.

- [ ] **Step 1: Write failing action-helper tests**

```ts
import { describe, expect, it } from "vitest";
import { getProjectAction } from "../src/lib/projects";
import type { Project } from "../src/lib/types";

const baseProject: Project = {
  id: "xboard",
  title: "Xboard RP2040 Dev Board",
  videoUrl: "https://github.com/Ghost-af16/Xboard",
  videoId: "xboard",
  platform: "drive",
  category: "Hardware",
  tags: ["Hardware"],
  priority: 1,
};

describe("getProjectAction", () => {
  it("opens external projects at their source URL", () => {
    expect(getProjectAction({ ...baseProject, linkType: "external" })).toEqual({
      kind: "external",
      href: "https://github.com/Ghost-af16/Xboard",
      label: "View Xboard RP2040 Dev Board project",
    });
  });

  it("keeps embedded media in the portfolio modal", () => {
    expect(getProjectAction(baseProject)).toEqual({
      kind: "embed",
      href: "https://github.com/Ghost-af16/Xboard",
      label: "Play Xboard RP2040 Dev Board",
    });
  });
});
```

- [ ] **Step 2: Run the helper test and verify it fails**

Run: `npm test -- test/project-actions.test.ts`

Expected: FAIL because `src/lib/projects.ts` does not exist.

- [ ] **Step 3: Implement the pure action helper**

```ts
import type { Project } from "./types";

export function getProjectAction(project: Project) {
  if (project.linkType === "external") {
    return {
      kind: "external" as const,
      href: project.videoUrl,
      label: `View ${project.title} project`,
    };
  }
  return {
    kind: "embed" as const,
    href: project.videoUrl,
    label: `Play ${project.title}`,
  };
}
```

- [ ] **Step 4: Update the project card**

Use `getProjectAction(project)` in `ProjectCard`. External cards call `window.open(action.href, "_blank", "noopener,noreferrer")`; embedded cards call `onClick()`. Render `ExternalLink` for external projects, show `project.description` below the title, and show category/technology tags without hiding them behind hover. Keep Enter and Space activation, useful alt text, and existing image-error behavior.

- [ ] **Step 5: Prevent external projects from opening the embed modal**

Keep `selectedProject` only for embedded projects. `Portfolio` continues to pass `setSelectedProject(project)` as `onClick`, while the card's helper bypasses it for external entries. Retain filters and the no-results message.

- [ ] **Step 6: Run tests and commit**

Run: `npm test -- test/project-actions.test.ts test/content-schema.test.ts`

Expected: PASS.

```bash
git add src/lib/projects.ts src/components/ProjectCard.tsx src/components/Portfolio.tsx test/project-actions.test.ts
git commit -m "feat: support external project cards"
```

---

### Task 3: Add Gallery and LinkedIn Resume Actions

**Files:**
- Create: `src/components/Gallery.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Navigation.tsx`
- Test: `test/config-schema.test.ts`

**Interfaces:**
- Consumes: `config.gallery`, `config.sections.gallery`, and `settings.resumeUrl` from Task 1.
- Produces: accessible `Gallery({ items }: { items: GalleryItemConfig[] })` and a hero Resume link.

- [ ] **Step 1: Add a failing gallery integrity test**

```ts
it("uses local, uniquely described gallery images", () => {
  expect(config.gallery.every((item) => item.src.startsWith("/"))).toBe(true);
  expect(config.gallery.every((item) => item.alt.length >= 12)).toBe(true);
  expect(new Set(config.gallery.map((item) => item.alt)).size).toBe(config.gallery.length);
});
```

- [ ] **Step 2: Run the test and verify it fails before the config work is present**

Run: `npm test -- test/config-schema.test.ts`

Expected: FAIL until Task 1's gallery content is present; if Task 1 already makes it pass, retain it as a regression test and continue.

- [ ] **Step 3: Build the gallery component**

Create a semantic `section` with `id="gallery"`, heading `Away from the screen.`, and a responsive one/two/three-column image grid. Render each local image with `next/image`, its configured alt text, a 4:5 or 3:4 crop, visible focus-safe presentation, and no click-only interaction.

- [ ] **Step 4: Place gallery in the homepage flow**

Import `Gallery` in `src/app/page.tsx` and render it after `Portfolio`:

```tsx
{config.sections.gallery && <Gallery items={config.gallery} />}
```

Add `{ label: "Gallery", href: "#gallery" }` to desktop and mobile navigation only when the gallery section is enabled.

- [ ] **Step 5: Add the LinkedIn-backed Resume action**

In `Hero`, render a `Resume` anchor only when `settings.resumeUrl` is non-empty. Use `target="_blank"`, `rel="noopener noreferrer"`, a `FileText` icon, and the same visible keyboard-focus treatment as the contact action. Keep email as `Get in Touch` and do not label LinkedIn as a downloadable file.

- [ ] **Step 6: Run tests and commit**

Run: `npm test -- test/config-schema.test.ts test/content-schema.test.ts`

Expected: PASS.

```bash
git add src/components/Gallery.tsx src/app/page.tsx src/components/Hero.tsx src/components/Navigation.tsx test/config-schema.test.ts
git commit -m "feat: add personal gallery and resume link"
```

---

### Task 4: Apply the Polished Terminal-Green Presentation

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/About.tsx`
- Modify: `src/components/Services.tsx`
- Modify: `src/components/ContactCTA.tsx`
- Modify: `src/components/Navigation.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Test: `test/theme.test.ts`

**Interfaces:**
- Consumes: the custom palette and personalized content from Task 1.
- Produces: reusable CSS classes `.terminal-label`, `.terminal-panel`, `.terminal-cursor`, and reduced-motion overrides.

- [ ] **Step 1: Add a failing custom-palette regression test**

```ts
it("resolves Viraj's terminal-green custom palette", () => {
  const colors = resolveColors(config);
  expect(colors.bg).toBe("#050806");
  expect(colors.accent).toBe("#66ff8a");
  expect(colors.accentHover).toBe("#9affb2");
});
```

Import `config` into `test/theme.test.ts`.

- [ ] **Step 2: Run the test and confirm the expected red/green state**

Run: `npm test -- test/theme.test.ts`

Expected: PASS only after Task 1's custom palette exists; otherwise FAIL with the template palette values.

- [ ] **Step 3: Style the hero as a restrained terminal**

Replace cinematic wording and serif-heavy presentation with a compact prompt line such as `viraj@portfolio:~$ whoami`, the existing name/role/tagline, and one blinking cursor. Preserve immediate content visibility: do not implement character-by-character typing. Use the workbench image as the darkened hero background and retain accessible text hierarchy.

- [ ] **Step 4: Rewrite template headings in Viraj's voice**

Use these exact section headings:

```text
About: A student who likes making things.
Services eyebrow: What I Work With
Services heading: Software, hardware, and ideas in between.
Portfolio: Things I've Built
Gallery: Away from the screen.
Contact: Want to build something?
Contact body: I'm always open to discussing projects, ideas, and opportunities. The easiest way to reach me is by email.
```

Change the navigation CTA to `Email Me`. Keep About and service descriptions plain and specific.

- [ ] **Step 5: Add terminal presentation utilities and motion fallback**

In `globals.css`, add the terminal grid/background, thin green borders, monospace labels, and cursor animation. Add:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Ensure `:focus-visible` has a clear accent outline. Change the global selection color to terminal green and avoid neon glow/text-shadow effects.

- [ ] **Step 6: Align metadata and footer**

Set `viewport.themeColor` to `#050806` and `colorScheme` to `dark`. Keep GitHub and LinkedIn footer icons, current year, Dehradun location, and the template credit. Remove privacy/terms links from the homepage footer only if their generic content remains unrelated to Viraj; do not delete their routes.

- [ ] **Step 7: Run tests and commit**

Run: `npm test -- test/theme.test.ts test/config-schema.test.ts test/content-schema.test.ts`

Expected: PASS.

```bash
git add src/components/Hero.tsx src/components/About.tsx src/components/Services.tsx src/components/ContactCTA.tsx src/components/Navigation.tsx src/components/Footer.tsx src/app/globals.css src/app/layout.tsx test/theme.test.ts
git commit -m "feat: apply terminal green portfolio design"
```

---

### Task 5: Verify the Complete Portfolio

**Files:**
- Modify if required by failures: files already listed in Tasks 1–4

**Interfaces:**
- Consumes: the completed portfolio.
- Produces: a test-passing, buildable, visually reviewed local site with working links and assets.

- [ ] **Step 1: Run all automated checks**

Run:

```bash
npm test
npm run lint
npm run build
git diff --check
```

Expected: all tests pass, ESLint reports no errors, Next.js completes a production build, and Git reports no whitespace errors.

- [ ] **Step 2: Start the production-equivalent local site**

Run: `npm run dev`

Open: `http://localhost:3000`

Expected: the homepage loads without an error overlay or console errors.

- [ ] **Step 3: Verify content and links**

Check:

```text
Name: Viraj Vaibhav
Role: Computer Science Student, Developer & Hardware Enthusiast
Email href: mailto:virajmuz16@gmail.com
Resume href: https://in.linkedin.com/in/viraj-vaibhav-9127b4351
GitHub project URLs: Xboard, SPLIT-KEEBU, sprig, F1
No Alex Rivera, example.com, dQw4w9WgXcQ, fake testimonials, or booking links
```

- [ ] **Step 4: Perform responsive and accessibility QA**

Inspect at 375×812, 768×1024, and 1280×800. Confirm navigation, hero actions, project filters, all five project cards, three gallery images, and contact section are readable without horizontal scrolling. Navigate by keyboard, check focus visibility, toggle reduced motion, and confirm the mobile menu closes after selecting a link.

- [ ] **Step 5: Review image quality**

Confirm all five local image files load, the profile crop keeps Viraj visible, project thumbnails do not stretch, and the portrait gallery images retain their intended framing.

- [ ] **Step 6: Commit any verification fixes**

If QA required changes, stage only those files and commit:

```bash
git add portfolio.config.ts src/lib/config.ts src/lib/types.ts src/lib/data.ts src/lib/projects.ts src/components/ProjectCard.tsx src/components/Portfolio.tsx src/components/Gallery.tsx src/components/Hero.tsx src/components/Navigation.tsx src/components/About.tsx src/components/Services.tsx src/components/ContactCTA.tsx src/components/Footer.tsx src/app/page.tsx src/app/globals.css src/app/layout.tsx test/config-schema.test.ts test/content-schema.test.ts test/project-actions.test.ts test/theme.test.ts public
git commit -m "fix: polish responsive portfolio details"
```

If no changes were required, do not create an empty commit.
