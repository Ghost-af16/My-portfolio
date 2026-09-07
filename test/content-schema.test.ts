import { describe, it, expect } from "vitest";
import { defaultContent } from "../src/lib/data";
import config from "../portfolio.config";
import type { Content } from "../src/lib/types";

describe("content schema validation", () => {
  const content: Content = defaultContent;

  // ── Top-level structure ─────────────────────────────────────────────

  it("has all required top-level keys", () => {
    expect(content.settings).toBeDefined();
    expect(content.hero).toBeDefined();
    expect(content.projects).toBeDefined();
    expect(content.testimonials).toBeDefined();
    expect(content.filters).toBeDefined();
  });

  // ── Settings ────────────────────────────────────────────────────────

  describe("settings", () => {
    it("has required string fields", () => {
      const { settings } = content;
      expect(typeof settings.name).toBe("string");
      expect(typeof settings.role).toBe("string");
      expect(typeof settings.tagline).toBe("string");
      expect(typeof settings.location).toBe("string");
      expect(typeof settings.bio).toBe("string");
      expect(typeof settings.email).toBe("string");
    });

    it("name matches config", () => {
      expect(content.settings.name).toBe(config.personal.name);
    });

    it("email matches config", () => {
      expect(content.settings.email).toBe(config.contact.email);
    });

    it("socials is an object", () => {
      expect(typeof content.settings.socials).toBe("object");
    });
  });

  // ── Hero ────────────────────────────────────────────────────────────

  describe("hero", () => {
    it("has images array", () => {
      expect(Array.isArray(content.hero.images)).toBe(true);
    });

    it("has intervalMs as a number", () => {
      expect(typeof content.hero.intervalMs).toBe("number");
      expect(content.hero.intervalMs).toBeGreaterThan(0);
    });
  });

  // ── Projects ────────────────────────────────────────────────────────

  describe("projects", () => {
    it("is an array", () => {
      expect(Array.isArray(content.projects)).toBe(true);
    });

    it("contains five real portfolio entries", () => {
      expect(defaultContent.projects).toHaveLength(5);
      expect(
        defaultContent.projects.every(
          (project) => project.videoUrl !== "https://youtu.be/dQw4w9WgXcQ"
        )
      ).toBe(true);
      expect(new Set(defaultContent.projects.map((project) => project.id)).size).toBe(5);
    });

    it("gives external projects case-study details", () => {
      const externalProjects = defaultContent.projects.filter(
        (project) => project.linkType === "external"
      );
      expect(externalProjects).toHaveLength(5);
      for (const project of externalProjects) {
        expect(project.description).toBeTruthy();
        expect(project.technologies?.length).toBeGreaterThan(0);
        expect(project.built).toBeTruthy();
        expect(project.challenge).toBeTruthy();
      }
    });

    it("describes my projects in the first person", () => {
      for (const project of defaultContent.projects) {
        expect(project.description).toMatch(/^I /);
        expect(project.built).toMatch(/^I /);
        expect(project.challenge).toMatch(/^I /);
      }
    });

    it("each project has required fields", () => {
      for (const project of content.projects) {
        expect(project.id).toBeTruthy();
        expect(project.title).toBeTruthy();
        expect(project.videoUrl).toBeTruthy();
        expect(project.videoId).toBeTruthy();
        expect(typeof project.platform).toBe("string");
        expect(typeof project.category).toBe("string");
        expect(Array.isArray(project.tags)).toBe(true);
        expect(typeof project.priority).toBe("number");
      }
    });

    it("each project has a valid platform", () => {
      const validPlatforms = ["youtube", "vimeo", "instagram", "behance", "dribbble", "drive"];
      for (const project of content.projects) {
        expect(validPlatforms).toContain(project.platform);
      }
    });

    it("project IDs are unique", () => {
      const ids = content.projects.map((p) => p.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  // ── Testimonials ────────────────────────────────────────────────────

  describe("testimonials", () => {
    it("is an array", () => {
      expect(Array.isArray(content.testimonials)).toBe(true);
    });

    it("each testimonial has required fields", () => {
      for (const testimonial of content.testimonials) {
        expect(testimonial.id).toBeTruthy();
        expect(testimonial.name).toBeTruthy();
        expect(testimonial.quote).toBeTruthy();
        expect(typeof testimonial.order).toBe("number");
      }
    });

    it("testimonial IDs are unique", () => {
      const ids = content.testimonials.map((t) => t.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  // ── Filters ─────────────────────────────────────────────────────────

  describe("filters", () => {
    it("is an array of strings", () => {
      expect(Array.isArray(content.filters)).toBe(true);
      for (const filter of content.filters) {
        expect(typeof filter).toBe("string");
      }
    });

    it("matches config portfolioFilters", () => {
      expect(content.filters).toEqual(config.portfolioFilters);
    });
  });
});
