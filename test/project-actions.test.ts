import { describe, expect, it } from "vitest";
import { getProjectAction } from "../src/lib/projects";
import type { Project } from "../src/lib/types";

const project: Project = {
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
  it("opens external projects in a detail panel", () => {
    expect(getProjectAction({ ...project, linkType: "external" })).toEqual({
      kind: "detail",
      href: project.videoUrl,
      label: "View details for Xboard RP2040 Dev Board",
    });
  });

  it("keeps embedded media in the portfolio modal", () => {
    expect(getProjectAction(project)).toEqual({
      kind: "embed",
      href: project.videoUrl,
      label: "Play Xboard RP2040 Dev Board",
    });
  });
});
