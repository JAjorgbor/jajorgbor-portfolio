import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { ProjectCard } from "@/sanity/lib/types";

// §7.4 / §7.5: the picture always sits inside black bars and enters through a slit.
export function LetterboxPoster({
  project,
  priority = false,
  className = "",
}: {
  project: ProjectCard;
  priority?: boolean;
  className?: string;
}) {
  if (!project.thumbnail) return null;
  return (
    <div data-reveal="media" className={`letterbox ${className}`}>
      <Image
        src={urlFor(project.thumbnail).width(1600).height(900).url()}
        alt={project.thumbnail.alt ?? project.title}
        width={1600}
        height={900}
        sizes="(min-width: 1280px) 50vw, 100vw"
        priority={priority}
        placeholder={project.thumbnail.lqip ? "blur" : "empty"}
        blurDataURL={project.thumbnail.lqip ?? undefined}
      />
    </div>
  );
}

export function LetterboxVideo({
  project,
  className = "",
}: {
  project: ProjectCard;
  className?: string;
}) {
  if (!project.videoUrl) return <LetterboxPoster project={project} priority className={className} />;
  const poster = project.thumbnail
    ? urlFor(project.thumbnail).width(1600).height(900).url()
    : undefined;
  return (
    <div data-reveal="media" data-delay="0.6" className={`letterbox ${className}`}>
      <video controls preload="none" playsInline muted loop poster={poster}>
        <source src={project.videoUrl} type={project.videoMimeType ?? "video/mp4"} />
      </video>
    </div>
  );
}
