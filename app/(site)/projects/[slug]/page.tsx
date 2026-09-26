import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { getProject, getSettings } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { PROJECT_SLUGS_QUERY } from "@/sanity/lib/queries";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const overviewComponents: PortableTextComponents = {
  list: {
    bullet: ({ children }) => <ul className="mt-1 space-y-2">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3">
        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
        <span>{children}</span>
      </li>
    ),
  },
};

export async function generateStaticParams() {
  return client.fetch<{ slug: string }[]>(PROJECT_SLUGS_QUERY);
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [project, settings] = await Promise.all([
    getProject(slug),
    getSettings(),
  ]);
  if (!project) return {};

  return {
    title: settings?.name ? `${project.title} | ${settings.name}` : project.title,
    description: project.description ?? undefined,
    openGraph: project.thumbnail
      ? { images: [urlFor(project.thumbnail).width(1200).height(630).url()] }
      : undefined,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  // Await params because in Next.js 15+ params is a Promise
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-amber-500/30">
      <div className="border-b border-neutral-800 bg-neutral-950/50 backdrop-blur-md sticky top-0 z-50">
        <Container className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="group flex items-center text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Projects
          </Link>
          <div className="flex gap-4">
            {project.repoUrl ? (
              <Button
                size="sm"
                variant="outline"
                className="hidden text-foreground sm:flex"
                asChild
              >
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" /> Repo
                </a>
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="hidden text-foreground sm:flex"
                disabled
              >
                <Github className="mr-2 h-4 w-4" /> Repo
              </Button>
            )}
            {project.link && (
              <Button size="sm" variant="primary" asChild>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Project Link
                </a>
              </Button>
            )}
          </div>
        </Container>
      </div>

      <Container className="py-20">
        <div className="mb-16 space-y-6">
          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-neutral-700 text-neutral-400"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-white">
            {project.title}
          </h1>
          <p className="max-w-2xl text-xl text-neutral-400">
            {project.description}
          </p>

          <div className="grid grid-cols-2 gap-8 pt-8 sm:grid-cols-4 border-t border-neutral-800 mt-12">
            <div>
              <div className="text-sm font-medium text-neutral-500">Role</div>
              <div className="mt-1 text-neutral-200">{project.role}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-neutral-500">Year</div>
              <div className="mt-1 text-neutral-200">{project.year}</div>
            </div>
            <div className="col-span-2">
              <div className="text-sm font-medium text-neutral-500">Impact</div>
              <ul className="mt-1 list-disc list-inside text-neutral-200 space-y-1">
                {project.metrics?.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Project Content / Image */}
        {project.videoUrl && (
          <video
            controls
            className="aspect-video w-full rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl relative"
            loop
            autoPlay
            muted
            playsInline
            poster={
              project.thumbnail
                ? urlFor(project.thumbnail).width(1600).url()
                : undefined
            }
          >
            <source
              src={project.videoUrl}
              type={project.videoMimeType ?? "video/mp4"}
            />
            Your browser does not support the video tag.
          </video>
        )}

        {project.overview && (
          <div className="mt-24 grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-semibold text-white sticky top-32">
                Role Overview
              </h3>
            </div>
            <div className="lg:col-span-2 prose prose-invert prose-lg text-neutral-400 ">
              <PortableText
                value={project.overview}
                components={overviewComponents}
              />
            </div>
          </div>
        )}

        <div className="mt-32 border-t border-neutral-900 pt-16 flex justify-between items-center">
          <Link
            href="/"
            className="text-neutral-500 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </Container>
    </article>
  );
}
