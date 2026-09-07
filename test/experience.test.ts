import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Experience } from "../src/components/Experience";

describe("Experience", () => {
  it("renders the experience timeline as an ordered list", () => {
    const html = renderToStaticMarkup(
      createElement(Experience, {
        items: [
          {
            organization: "Counterspell Muzaffarpur",
            role: "Project Presenter",
            period: "2024",
            description: "I presented our 3D project.",
          },
        ],
      }),
    );

    expect(html).toContain('id="experience"');
    expect(html).toContain("<ol");
    expect(html).toContain("My journey so far.");
    expect(html).toContain("Counterspell Muzaffarpur");
    expect(html).toContain("I presented our 3D project.");
  });

  it("renders an external link when an experience provides one", () => {
    const html = renderToStaticMarkup(
      createElement(Experience, {
        items: [
          {
            organization: "CollageOx",
            role: "Co-Founder",
            period: "Aug 2026 – Present",
            description: "I co-founded CollageOx.",
            url: "https://collageox.onrender.com/#feed",
          },
        ],
      }),
    );

    expect(html).toContain('href="https://collageox.onrender.com/#feed"');
    expect(html).toContain("Visit CollageOx");
  });
});
