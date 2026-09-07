# Experience Timeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a responsive terminal-style experience timeline between the About and Services sections.

**Architecture:** Store experience entries in the existing central portfolio configuration and render them through a focused server component. The home page controls section ordering and visibility using the existing `sections` pattern.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Vitest

**Spec:** `docs/superpowers/specs/2026-09-07-experience-timeline-design.md`

## Global Constraints

- Use only real, confirmed experience content.
- Use first-person descriptions.
- Match the existing terminal-green visual system.
- Place Experience after About and before Services.
- Keep the section semantic, responsive, and readable without animation.

---

### Task 1: Experience configuration

**Files:**
- Modify: `src/lib/config.ts`
- Modify: `portfolio.config.ts`
- Test: `test/config-schema.test.ts`

**Interfaces:**
- Produces: `ExperienceConfig` with `organization`, `role`, `period`, and `description` strings.
- Produces: `PortfolioConfig.experiences: ExperienceConfig[]` and `PortfolioConfig.sections.experience?: boolean`.

- [ ] **Step 1: Write the failing configuration test**

Add an assertion that Experience is enabled and contains the two approved entries with first-person descriptions:

```ts
expect(config.sections.experience).toBe(true);
expect(config.experiences).toHaveLength(2);
expect(config.experiences.every((item) => item.description.startsWith("I "))).toBe(true);
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm test -- test/config-schema.test.ts`
Expected: FAIL because `experience` and `experiences` are not defined.

- [ ] **Step 3: Add the typed configuration and approved content**

Define:

```ts
export interface ExperienceConfig {
  organization: string;
  role: string;
  period: string;
  description: string;
}
```

Configure Counterspell Muzaffarpur as “Project Presenter” in 2024 and Shivalik University as “B.Tech CSE — Cyber Security” for “Present”, using the first-person copy from the spec.

- [ ] **Step 4: Run the configuration test**

Run: `npm test -- test/config-schema.test.ts`
Expected: PASS.

### Task 2: Timeline component and page placement

**Files:**
- Create: `src/components/Experience.tsx`
- Modify: `src/app/page.tsx`
- Test: `test/experience.test.ts`

**Interfaces:**
- Consumes: `ExperienceConfig[]` from `portfolio.config.ts`.
- Produces: `Experience({ items }: { items: ExperienceConfig[] })`.

- [ ] **Step 1: Write the failing source-level component test**

Read `src/components/Experience.tsx` and assert that it contains the `experience` section id, ordered-list semantics, and terminal heading. The test must fail because the file does not exist.

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm test -- test/experience.test.ts`
Expected: FAIL because `src/components/Experience.tsx` does not exist.

- [ ] **Step 3: Build the timeline component**

Render `~/experience`, “My journey so far.”, and an ordered list. Each entry renders period, role, organization, and description beside a green timeline rail and marker. Use existing `terminal-panel`, theme color classes, responsive spacing, and a restrained hover border.

- [ ] **Step 4: Place it in the home page**

Import `Experience` in `src/app/page.tsx` and render:

```tsx
{config.sections.experience && <Experience items={config.experiences} />}
```

immediately after About and before Services.

- [ ] **Step 5: Run focused and complete verification**

Run: `npm test -- test/experience.test.ts test/config-schema.test.ts`
Expected: PASS.

Run: `npm test && npm run lint && npm run build`
Expected: all tests pass, lint exits cleanly, and the production build completes.

- [ ] **Step 6: Commit and preview**

```bash
git add portfolio.config.ts src/lib/config.ts src/components/Experience.tsx src/app/page.tsx test/config-schema.test.ts test/experience.test.ts
git commit -m "Add experience timeline"
```

Restart the local production server and open `http://localhost:3000/#experience`.
