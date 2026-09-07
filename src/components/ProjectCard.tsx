"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, ExternalLink } from "lucide-react";
import { Project } from "@/lib/types";
import { getProjectAction } from "@/lib/projects";

export function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  const getThumbnail = () => {
    if (project.thumbnailUrl) return project.thumbnailUrl;
    if (project.platform === "youtube") {
      return imgError
        ? `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`
        : `https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`;
    }
    return null;
  };

  const thumbnailUrl = getThumbnail();
  const action = getProjectAction(project);
  const isExternal = project.platform === "instagram" && action.kind !== "detail";
  const showsDetails = action.kind === "detail";

  const handleClick = () => {
    if (isExternal) {
      window.open(action.href, "_blank", "noopener,noreferrer");
    } else {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const label = action.label;

  return (
    <div
      className="group relative min-h-[360px] bg-surface-light rounded-lg overflow-hidden cursor-pointer border border-border hover:border-accent/60 transition-all duration-300"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={label}
    >
      {thumbnailUrl ? (
        <Image
          src={thumbnailUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-55 group-hover:opacity-70"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-surface-card to-surface flex items-center justify-center">
          <span className="text-accent text-4xl font-serif" aria-hidden="true">
            {project.title.charAt(0)}
          </span>
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface-deep via-surface-deep/55 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6">
        <span className="inline-block px-2 py-1 mb-3 text-[11px] font-mono bg-accent text-on-accent rounded-sm uppercase tracking-wider">
          {project.category}
        </span>
        <h3 className="text-white text-xl font-semibold leading-tight group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        {project.description && <p className="mt-3 text-sm text-muted leading-relaxed">{project.description}</p>}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.filter((tag) => tag !== "Featured").map((tag) => (
            <span key={tag} className="text-[10px] font-mono uppercase tracking-wider text-accent"># {tag}</span>
          ))}
        </div>
      </div>

      {/* Play / Link Icon */}
      <div className="absolute top-5 right-5 w-11 h-11 bg-surface-deep/70 backdrop-blur-sm rounded-full flex items-center justify-center border border-accent/30" aria-hidden="true">
        {isExternal || showsDetails ? (
          <ExternalLink className="w-6 h-6 text-white" />
        ) : (
          <Play className="w-6 h-6 text-white fill-white ml-1" />
        )}
      </div>
    </div>
  );
}
