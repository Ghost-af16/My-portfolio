# Experience Timeline Design

## Goal

Add a concise experience section that shows Viraj's real journey without making the student portfolio feel like a corporate résumé.

## Placement

Place the section after About and before Services. This creates a natural order: introduction, experience, skills, projects, gallery, and contact.

## Content

The first preview contains two entries:

1. Counterspell Muzaffarpur — Project Presenter — 2024. First-person copy explains that I presented our 3D project and worked with mentors during the event.
2. Shivalik University — B.Tech CSE, Cyber Security — Present. First-person copy explains what I currently study and build.

Experience data lives in `portfolio.config.ts` so future entries can be added without changing the component.

## Visual Design

Use a vertical terminal-green timeline with `~/experience`, the heading “My journey so far.”, glowing green timeline markers, dates, roles, organizations, and short first-person descriptions. Cards use the existing dark panels and gain a restrained green border on hover. Mobile uses the same timeline in a single column.

## Behavior and Accessibility

Entries remain readable without animation. Hover styling is decorative. The section uses semantic headings and an ordered list, with sufficient contrast and responsive spacing.

## Verification

Add schema tests for configured experience entries, run the complete test suite and linter, build the production site, then preview the section at `/#experience`.
