import type { Project } from "./types";

export function getProjectAction(project: Project) {
  if (project.linkType === "external") {
    return { kind: "detail" as const, href: project.videoUrl, label: `View details for ${project.title}` };
  }
  return { kind: "embed" as const, href: project.videoUrl, label: `Play ${project.title}` };
}
