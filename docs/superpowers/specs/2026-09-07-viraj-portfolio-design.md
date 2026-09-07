# Viraj Vaibhav Portfolio Design

## Goal

Create a personal portfolio for Viraj Vaibhav, a B.Tech Computer Science and Engineering student specializing in Data Science at Shivalik University. The site should present his software, hardware, design, and game-development work in a direct, personal voice without generic or AI-sounding language.

## Visual Direction

Use a polished terminal-inspired design:

- Near-black background with restrained terminal-green accents
- Monospace type for labels, commands, and metadata; highly readable type for body copy
- Subtle typing or cursor details only where they do not delay access to content
- Large project imagery and generous spacing so the site does not resemble a novelty terminal page
- Strong mobile layout and accessible contrast

## Identity and Copy

- Name: Viraj Vaibhav
- Role: Computer Science Student, Developer & Hardware Enthusiast
- Location: Dehradun, India
- Tagline: “I build things and learn how they work.”
- Education: B.Tech CSE (Data Science), Shivalik University
- Contact: `virajmuz16@gmail.com`
- LinkedIn and resume destination: `https://in.linkedin.com/in/viraj-vaibhav-9127b4351`

The About copy will be concise and natural: Viraj is a technology enthusiast who enjoys building software and hardware projects and learning how systems work. Grammar will be corrected without adding inflated claims or marketing language.

## Page Structure

1. **Hero** — name, role, tagline, location, profile photo, project/contact actions, and a LinkedIn-backed resume action.
2. **Featured Projects** — Xboard, SPLIT-KEEBU, Sprig, Formula 1, and an FPV build. Each card will use repository evidence for its summary and technology tags.
3. **Skills and Services** — Software Development, Web Development, Hardware and PCB Design, 3D Design and Prototyping, and Game Development.
4. **Gallery** — the three supplied personal/workbench/FPV images, used selectively so they support rather than distract from the projects.
5. **About** — education, curiosity, and practical interests.
6. **Contact** — email action plus GitHub and LinkedIn links.

## Content and Assets

- Use the supplied mountain image as the profile photo.
- Use repository-owned screenshots for project cards wherever suitable.
- Use the supplied workstation and FPV photographs in the gallery and, where composition permits, as supporting project imagery.
- Store copied image assets under `public/` with descriptive filenames.
- Treat both `Ghost-af16` and `Thunder-god-adi` as Viraj's GitHub accounts.
- Avoid claiming authorship of upstream work in forked repositories. Describe only the work supported by the repository or Viraj's stated ownership.

## Implementation Approach

Keep the existing Next.js 16, TypeScript, Tailwind CSS 4, and configuration-driven architecture. `portfolio.config.ts` remains the source of truth for identity, theme, links, services, filters, and SEO. Project content will be represented through the template's supported content layer, with local storage for the first version.

Existing components will be reused where practical. Focused component changes may be made to support developer project cards, GitHub links, gallery images, and the terminal visual system. The admin panel remains available but is not required for the initial portfolio setup.

## Interaction and Data Flow

- Navigation scrolls to the major homepage sections.
- Project cards open their GitHub repositories in a new tab.
- The contact action uses a `mailto:` link.
- The resume action opens LinkedIn, as requested.
- All public content loads from local configuration/content and requires no external database.
- Motion respects reduced-motion preferences; core content remains visible without animation.

## Error Handling and Accessibility

- Images receive useful alt text and safe fallbacks.
- External links use appropriate security attributes.
- Empty optional sections stay hidden rather than showing placeholders.
- Keyboard navigation, focus states, contrast, and responsive layouts are verified.
- No fabricated testimonials, statistics, experience, or project claims are added.

## Verification

- Run the existing automated test suite and production build.
- Check project, email, GitHub, LinkedIn, and resume links.
- Confirm all images load locally.
- Review at 375px, 768px, and 1280px widths.
- Check that the main content remains usable with JavaScript animation reduced or disabled.
- Verify there are no console errors and no placeholder content remains.

## Out of Scope

- Deployment and domain configuration until the local site is approved
- Cloudflare R2 or other hosted content storage
- Fabricated testimonials or additional projects
- A downloadable résumé file; the resume action intentionally redirects to LinkedIn
