import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Hero } from "../src/components/Hero";
import { Navigation } from "../src/components/Navigation";
import { defaultContent } from "../src/lib/data";

describe("portfolio navigation actions", () => {
  it("offers both email and resume from the main navigation", () => {
    const html = renderToStaticMarkup(
      createElement(Navigation, { settings: defaultContent.settings }),
    );

    expect(html).toContain("Email Me");
    expect(html).toContain("Resume");
    expect(html).toContain(`href="${defaultContent.settings.resumeUrl}"`);
  });

  it("keeps duplicated action links out of the hero", () => {
    const html = renderToStaticMarkup(
      createElement(Hero, {
        settings: defaultContent.settings,
        hero: defaultContent.hero,
      }),
    );

    expect(html).not.toContain("View projects");
    expect(html).not.toContain(`mailto:${defaultContent.settings.email}`);
    expect(html).not.toContain(`href="${defaultContent.settings.resumeUrl}"`);
  });
});
